/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Browse
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM contributions WHERE deleted = FALSE;`)
      .then(data => {
        const contributions = data.rows;
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
    const contributionId = req.params.id;
    db.query(`SELECT * FROM contributions WHERE id = $1 AND deleted = FALSE;`, [contributionId])
      .then(data => {
        const contribution = data.rows;
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
    const { story_id, user_id, content } = req.body;
    const newContribution = [story_id, user_id, content];
    db.query(`INSERT INTO contributions (story_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`, newContribution)
      .then(data => {
        const contribution = data.rows;
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
    const contributionId = req.params.id;
    db.query(`UPDATE contributions SET deleted = TRUE WHERE id = $1 ;`, [contributionId])
      .then(data => {
        // const stories = data.rows;
        res.send('Contribution deleted!');
        // res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
