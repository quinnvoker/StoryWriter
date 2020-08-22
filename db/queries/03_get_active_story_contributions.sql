SELECT
  contributions.id,
  users.name AS author,
  contributions.content,
  contributions.created_at,
  COUNT(votes) AS votes
  FROM
    contributions
    LEFT JOIN stories ON stories.id = contributions.story_id
    LEFT JOIN users ON users.id = contributions.user_id
    LEFT JOIN votes ON contributions.id = votes.contribution_id
  WHERE
    stories.id = 6
  GROUP BY
    contributions.id,
    users.name,
    contributions.content,
    contributions.created_at
  HAVING
    contributions.created_at > (SELECT MAX(contributions.accepted_at) FROM contributions)
  ORDER BY
    contributions.created_at;
