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
    stories.completed = FALSE AND stories.deleted = FALSE
  ORDER BY
    stories.id;
