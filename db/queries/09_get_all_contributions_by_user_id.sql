SELECT
  contributions.id,
  story_id,
  users.name AS author,
  content,
  created_at,
  COUNT(votes) AS votes
  FROM
    contributions
    JOIN users ON user_id = users.id
    LEFT JOIN votes ON contributions.id = contribution_id
  WHERE
    contributions.user_id = 2 AND deleted = FALSE
  GROUP BY
    contributions.id,
    story_id,
    users.name,
    content,
    created_at
  ORDER BY created_at
