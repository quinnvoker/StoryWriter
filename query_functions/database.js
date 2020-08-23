// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


/** Get all stories from the database
 * @param {completed: boolean} completed
 * undefined = everything, true = completed only, false = incompleted only.
 * @param {owner_id: integer} owner_id
 * the owner_id of stories, if check myStories, call with user_id from req.session.
 * @return {Promise<{}>} A promise to the user.
 */

const getAllStories = function(options) {
  let queryString = `
  SELECT
    stories.id,
    stories.title,
    users.name AS author,
    stories.completed,
    stories.deleted
    FROM
      stories
      JOIN users ON users.id = stories.owner_id
    WHERE
      stories.deleted = FALSE
      `;
  let queryParams = [];

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += ` AND users.id = $${queryParams.length}`;
  }

  if (options.completed !== undefined) {
    queryParams.push(options.completed);
    queryString += ` AND stories.completed = $${queryParams.length}`;
  }

  queryString += ` ORDER BY stories.id;`;

  return db.query(queryString, queryParams)
    .then(resolve => resolve.rows);
};
exports.getAllStories = getAllStories;


/** Get all contributions from the database
 * @param {user_id: integer} user_id
 * the user_id of contributions, if check myContributions, call with user_id from req.session.
 * @return {Promise<{}>} A promise to the user.
 */

const getAllContributionsByUserId = function(options) {
  let queryString = `
  SELECT
  contributions.id,
  story_id,
  users.name AS author,
  content,
  created_at,
  accepted_at IS NOT NULL AS is_accepted,
  COUNT(votes) AS votes
  FROM
    contributions
    JOIN users ON user_id = users.id
    LEFT JOIN votes ON contributions.id = contribution_id
  WHERE
    contributions.user_id = $1 AND deleted = FALSE
  GROUP BY
    contributions.id,
    story_id,
    users.name,
    content,
    created_at
  ORDER BY created_at
  `;

  return db.query(queryString, [options.user_id])
    .then(resolve => resolve.rows);
};
exports.getAllContributionsByUserId = getAllContributionsByUserId;


/** Get all accepted contributions from the database by story_id
 * @param {story_id: integer} story_id
 * @return {Promise<{}>} A promise to the user.
 */

const getAcceptedContributionByStoryId = function(options) {
  const queryString = `
  SELECT
    contributions.id,
    story_id,
    user_id AS author,
    content,
    accepted_at
    FROM
      contributions
      JOIN users ON user_id = users.id
    WHERE
      story_id = $1
      AND accepted_at IS NOT NULL
      AND deleted = FALSE
    ORDER BY
      accepted_at;
  `;
  return db.query(queryString, [options.story_id])
    .then(resolve => resolve.rows);
};
exports.getAcceptedContributionByStoryId = getAcceptedContributionByStoryId;

/** Get all pending contributions from the database by story_id
 * @param {story_id: integer} story_id
 * @return {Promise<{}>} A promise to the user.
 */

const getPendingContributionByStoryId = function(options) {
  let queryParams = [options.story_id];
  let queryString = `
  SELECT
    contributions.id,
    story_id,
    contributions.user_id AS author,
    content,
    created_at,
    accepted_at,
    COUNT(votes) AS votes
    FROM
      contributions
      JOIN users ON user_id = users.id
      LEFT JOIN votes ON contributions.id = contribution_id
    WHERE
      story_id = $1
      AND deleted = FALSE
    GROUP BY
      contributions.id,
      story_id,
      users.name,
      content,
      created_at
  `;
  const lastUpdated = `
  SELECT
    MAX(accepted_at) AS max_accepted_at
    FROM
      contributions
    WHERE story_id = $1 AND deleted = false`;

  return db.query(lastUpdated, queryParams)
    .then(resolve => {
      // check if any accepted_at exists, cause cannot compare null with datestamp correctly
      if (resolve.rows[0].max_accepted_at !== null) {
        queryParams.push(resolve.rows[0].max_accepted_at);
        queryString += `
        HAVING
          contributions.created_at > $${queryParams.length}
        ORDER BY votes
        `;
      }
      return db.query(queryString, queryParams);
    })
    .then(resolve => resolve.rows);

};
exports.getPendingContributionByStoryId = getPendingContributionByStoryId;
