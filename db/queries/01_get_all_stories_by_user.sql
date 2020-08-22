SELECT stories.*
  FROM
    stories
    JOIN users ON users.id = stories.owner_id
  WHERE
    users.id = 1 AND deleted = FALSE;
