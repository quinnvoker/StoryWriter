// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


/**
 * Get all stories from the database
 * @param {String} completed undefined = everything, true = completed only, false = incompleted only.
 * @param {String} user_id the owner_id of stories, if check mystories, call with user_id from req.session.
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
  queryString += `
  ORDER BY stories.id;`;
  console.log(queryParams);
  console.log(queryString);
  return db.query(queryString, queryParams)
    .then(resolve => resolve.rows);
};
exports.getAllStories = getAllStories;
