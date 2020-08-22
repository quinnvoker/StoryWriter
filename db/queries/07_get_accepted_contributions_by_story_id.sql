SELECT contributions.id, story_id, user_id, content, accepted_at, deleted
  FROM contributions
  JOIN users ON user_id = users.id
  WHERE story_id = 6 AND accepted_at IS NOT NULL AND deleted = FALSE;
