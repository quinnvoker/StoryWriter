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
 * @param {user_id: integer} user_id
 * For myStories, call with user_id from req.session to pull user's stories
 * @return {Promise<{}>} A promise to the user.
 */

const getAllStories = function(options) {
  let queryString = `
  SELECT
    stories.id AS story_id,
    stories.cover_image_url AS story_cover_url,
    stories.title AS story_title,
    users.name AS story_author_name
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

  if (options.user_id) {
    queryParams.push(options.user_id);
    queryString += ` AND users.id = $${queryParams.length}`;
  }

  if (options.completed !== undefined) {
    queryParams.push(options.completed);
    queryString += ` AND stories.completed = $${queryParams.length}`;
  }

  queryString += ` ORDER BY stories.created_at;`;

  return db.query(queryString, queryParams)
    .then(resolve => resolve.rows)
    .catch(error=> console.error(error));
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
    contributions.id AS contribution_id,
    story_id,
    contributions.created_at AS contribution_created_at_time,
    content AS contribution_content,
    accepted_at IS NOT NULL AS contribution_is_accepted,
    COUNT(votes) AS contribution_vote_count
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
    .then(resolve => resolve.rows)
    .catch(error=> console.error(error));
};
exports.getContributionsByUserId = getContributionsByUserId;


/** Get accepted contributions from the database by story_id
 * @param {story_id: integer} story_id
 * @return {Promise<{}>} A promise to the user.
 */

// My stories view
const getAcceptedContributionByStoryId = function(options) {
  const queryString = `
  SELECT
    contributions.id AS contribution_id,
    users.name AS contribution_author_name,
    accepted_at AS contribution_accepted_at_time,
    content AS contribution_content
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
    .then(resolve => resolve.rows)
    .catch(error=> console.error(error));
};
exports.getAcceptedContributionByStoryId = getAcceptedContributionByStoryId;

/** Create new contribution
 * @param {story_id: interger} newContribution
 * @param {user_id: interger} newContribution
 * @param {content: text} newContribution
 * @return {Promise<{}>} A promise to the user.
 */

const createContribution = function(newContribution) {
  const queryString = `
  INSERT INTO
    contributions
    (story_id, user_id, content)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
  `;
  const { story_id, user_id, content } = newContribution;
  const queryParams = [story_id, user_id, content];
  return db.query(queryString, queryParams)
    .then(resolve => resolve.rows[0]);
};
exports.createContribution = createContribution;


/** Get pending contributions from the database by story_id
 * @param {story_id: integer} story_id
 * @return {Promise<{}>} A promise to the user.
 */

const getPendingContributionByStoryId = function(options) {
  let queryParams = [options.story_id];
  let queryString = `
  SELECT
    contributions.id AS contribution_id,
    users.name AS contribution_author_name,
    created_at AS contribution_created_at_time,
    content AS contribution_content,
    COUNT(votes) AS contribution_vote_count
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
        ORDER BY COUNT(votes)
        `;
      }
      return db.query(queryString, queryParams);
    })
    .then(resolve => resolve.rows)
    .catch(error=> console.error(error));

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
    .then(resolve => resolve.rows)
    .catch(error=> console.error(error));
};
exports.getFavouritesByUserId = getFavouritesByUserId;

/** Get full contribution details by contribution_id
 * @param {contribution_id: integer} contribution_id
 * @return {Promise<{}>} A promise to the user.
 */

const getContributionById = function(options) {
  const queryString = `
    SELECT
      story_id AS story_id,
      content AS contribution_content,
      users.name AS contribution_author_name,
      created_at AS contribution_created_at,
      COUNT(votes) AS contribution_vote_count
      FROM
        contributions
        JOIN users ON users.id = user_id
        LEFT JOIN votes ON contributions.id = contribution_id
      WHERE
        contributions.id = $1
      GROUP BY
        story_id,
        content,
        users.name,
        created_at;
  `;
  return db.query(queryString, [options.contribution_id])
    .then(resolve => resolve.rows[0])
    .catch(error=> console.error(error));
};
exports.getContributionById = getContributionById;
