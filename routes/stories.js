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
    let options = {
      user_id : req.session.user_id,
    };
    queryFunctions.getAllStories(options)
      .then(stories => {
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
    let options = {
      story_id: req.params.id,
    };
    queryFunctions.getAcceptedContributionByStoryId(options)
      .then(story => {
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
    let options = {
      user_id: req.session.user_id,
      title: req.body.title,
      cover_image_url: req.body.cover_image_url
    };
    queryFunctions.createStory(options)
      .then(storyId => {
        res.json({ storyId });
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
