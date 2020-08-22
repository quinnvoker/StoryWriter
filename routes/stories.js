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
    db.query(`SELECT * FROM stories WHERE deleted = FALSE;`)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Read
  router.get("/:id", (req, res) => {
    const storyId = req.params.id;
    db.query(`SELECT * FROM stories WHERE id = $1;`, [storyId])
      .then(data => {
        const story = data.rows;
        res.json({ story});
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
    const { owner_id, title, cover_image_url } = req.body;
    const newStory = [owner_id, title, cover_image_url];
    db.query(`INSERT INTO stories (owner_id, title, cover_image_url) VALUES ($1, $2, $3) RETURNING *`, newStory)
      .then(data => {
        const story = data.rows;
        res.json({ story });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE - toggle deleted field to true
  router.post("/:id", (req, res) => {
    const storyId = req.params.id;
    db.query(`UPDATE stories SET deleted = TRUE WHERE id = $1 ;`, [storyId])
      .then(data => {
        // const stories = data.rows;
        res.send('Story deleted!');
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
