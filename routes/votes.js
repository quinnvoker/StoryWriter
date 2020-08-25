/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (queryFunctions) => {
  router.post("/:id", (req, res) => {
    const queryParams = [req.session.user_id, req.params.id];
    queryFunctions.voteAContribution(queryParams)
      .then(vote => {
        res.json({ vote });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
