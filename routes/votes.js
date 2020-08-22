/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const user_id = req.session.user_id;
    const contribution_id = req.params.id;
    db.query(`INSERT INTO votes (user_id, contribution_id) VALUES ($1, $2) RETURNING *`, [user_id, contribution_id])
      .then(data => {
        const vote = data.rows[0];
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
