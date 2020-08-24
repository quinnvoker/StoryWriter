// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


/** Get all stories from the database
 * @param {story_id: integer} story_id
 * read request for individual story
 * @param {completed: boolean} completed
 * undefined = everything, true = completed only, false = incompleted only.
 * @param {owner_id: integer} owner_id
 * the owner_id of stories, if check myStories, call with user_id from req.session.
 * @return {Promise<{}>} A promise to the user.
 */

const getAllStories = function(options) {
  let queryString = `
  SELECT
    stories.id AS story_id,
    stories.cover_image_url AS story_cover_url,
    stories.title AS story_title,
    users.name AS story_author_name,
    FROM
      stories
      JOIN users ON users.id = stories.owner_id
    WHERE
      stories.deleted = FALSE
      `;
  let queryParams = [];

  if (options.story_id) {
    queryParams.push(options.story_id);
    queryString += ` AND stories.id = $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += ` AND users.id = $${queryParams.length}`;
  }

  if (options.completed !== undefined) {
    queryParams.push(options.completed);
    queryString += ` AND stories.completed = $${queryParams.length}`;
  }

  queryString += ` ORDER BY created_at;`;

  return db.query(queryString, queryParams)
    .then(resolve => resolve.rows);
};
exports.getAllStories = getAllStories;


/** Get contributions from the database
 * @param {user_id: integer} user_id
 * the user_id of contributions, if check myContributions, call with user_id from req.session.
 * @return {Promise<{}>} A promise to the user.
 */

const getContributionsByUserId = function(options) {
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
exports.getContributionsByUserId = getContributionsByUserId;


/** Get accepted contributions from the database by story_id
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

/** Get pending contributions from the database by story_id
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



/** Get list of favorite stories from the database by user_id
 * @param {user_id: integer} user_id
 * @return {Promise<{}>} A promise to the user.
 */

const getFavouritesByUserId = function(options) {
  const queryString = `
  SELECT
    stories.id AS story_id,
    stories.title AS story_title,
    favourites.user_id AS user,
    MAX(contributions.accepted_at) AS last_update,
    completed
    FROM
      favourites
      JOIN stories ON stories.id = favourites.story_id
      LEFT JOIN contributions ON stories.id = contributions.story_id
    WHERE
      favourites.user_id = $1
    GROUP BY
      stories.id, title, completed, favourites.user_id
    ORDER BY
      story_id;
  `;
  return db.query(queryString, [options.user_id])
    .then(resolve => resolve.rows);
};
exports.getFavouritesByUserId = getFavouritesByUserId;
