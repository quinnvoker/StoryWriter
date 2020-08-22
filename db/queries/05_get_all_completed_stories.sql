SELECT
  stories.id,
  stories.title,
  users.name AS author,
  stories.completed,
  stories.deleted
  FROM
    stories
    JOIN users ON users.id = stories.owner_id
  WHERE
    stories.deleted = FALSE AND stories.completed = TRUE
  ORDER BY
    stories.id;
