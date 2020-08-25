/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (queryFunctions) => {
  // Browse
  router.get("/", (req, res) => {
    let options = {};
    queryFunctions.getAllStories(options)
      .then(stories => {
        console.log(stories);
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Browse based on owner_id
  router.get('/mystories', (req, res) => {
    const owner_id = req.session.user_id;
    db.query(`SELECT * FROM stories WHERE deleted = FALSE AND owner_id = $1;`, [owner_id])
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
    const story_id = req.params.id;
    db.query(`SELECT * FROM stories WHERE id = $1 AND deleted = FALSE;`, [story_id])
      .then(data => {
        const story = data.rows[0];
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
    const owner_id = req.session.user_id;
    const { title, cover_image_url } = req.body;
    const newStory = [owner_id, title, cover_image_url];
    db.query(`INSERT INTO stories (owner_id, title, cover_image_url) VALUES ($1, $2, $3) RETURNING *`, newStory)
      .then(data => {
        const story = data.rows[0];
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
    const owner_id = req.session.user_id;
    db.query(`UPDATE stories SET deleted = TRUE WHERE id = $1 AND owner_id = $2 RETURNING *;`, [storyId, owner_id])
      .then(data => {
        if (data.rows.length > 0) {
          const story = data.rows[0];
          res.json({ story });
        } else {
          throw new Error('Story not found!');
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
