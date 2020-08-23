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
