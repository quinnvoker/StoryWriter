/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (queryFunctions) => {

  // Browse based on user_id
  router.get('/', (req, res) => {
    const options = {
      user_id : req.session.user_id
    };
    queryFunctions.getContributionsByUserId(options)
      .then(contributions => {
        res.json({ contributions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Read
  router.get("/:id", (req, res) => {
    const contributionId = [req.params.id];
    queryFunctions.getContributionById(contributionId)
      .then(contribution => {
        res.json({ contribution});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // EDIT - No route as edit not allowed for stories consisitence

  // ADD
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const { story_id, content } = req.body;
    const newContribution = [story_id, user_id, content];
    queryFunctions.createContribution(newContribution)
      .then(contribution => {
        res.json({ contribution });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE - toggle deleted field to true
  router.post("/:id", (req, res) => {
    const contribution_id = req.params.id;
    const user_id = req.session.user_id;
    db.query(`UPDATE contributions SET deleted = TRUE WHERE id = $1 AND user_id = $2 AND accepted_at IS NULL RETURNING *;`, [contribution_id, user_id])
      .then(data => {
        if (data.rows.length > 0) {
          const contribution = data.rows[0];
          res.json({ contribution });
        } else {
          throw new Error('Contribution not found!');
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
