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
        res.json(stories);
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
        res.json(stories);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Read story data without contribution
  router.get('/data/:id', (req, res) => {
    const options = {
      id: req.params.id,
    };
    queryFunctions.getStoryData(options)
      .then(stories => {
        stories.is_owner = Number(stories.owner_id) === Number(req.session.user_id);
        res.json(stories);
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
        res.json(story);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // EDIT - Update story as completed
  router.post("/completed/:id", (req, res) => {
    const options = {
      story_id: req.params.id,
      user_id: req.session.user_id
    };
    queryFunctions.updateStoryCompleted(options)
      .then(completed => res.json(completed))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });





  // ADD
  router.post("/", (req, res) => {
    console.log(req.body);
    let options = {
      user_id: req.session.user_id,
      title: req.body.title,
      cover_image_url: req.body.cover_image_url
    };
    queryFunctions.createStory(options)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE - toggle deleted field to true
  router.post("/:id", (req, res) => {
    const options = [
      req.params.id,
      req.session.user_id
    ];
    queryFunctions.deleteStory(options)
      .then(deletedStory => {
        if (deletedStory) {
          res.json(deletedStory);
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
