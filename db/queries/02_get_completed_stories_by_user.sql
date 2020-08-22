SELECT stories.*
  FROM
    stories
    JOIN users ON users.id = stories.owner_id
  WHERE
    users.id = 1 AND completed = TRUE AND deleted = FALSE;
