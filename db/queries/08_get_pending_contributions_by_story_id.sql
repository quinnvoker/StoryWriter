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
    JOIN votes ON contributions.id = contribution_id
  WHERE
    story_id = 6 AND deleted = FALSE
  GROUP BY
    contributions.id,
    story_id,
    users.name,
    content,
    created_at
  HAVING
    contributions.created_at > (SELECT MAX(accepted_at) FROM contributions)
  ORDER BY votes
