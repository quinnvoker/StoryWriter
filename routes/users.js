const express = require('express');
const router  = express.Router();

module.exports = (queryFunctions) => {
  router.get("/me", (req, res) => {
    const options = { user_id : req.session.user_id };
    queryFunctions.getUserInfo(options)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
