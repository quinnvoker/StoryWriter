SELECT
    contributions.id AS contribution_id,
    users.name AS contribution_author_name,
    contributions.created_at AS contribution_created_at_time,
    content AS contribution_content,
    stories.owner_id AS story_owner_id,
    COUNT(votes) AS contribution_vote_count
    FROM
      contributions
      JOIN users ON user_id = users.id
      LEFT JOIN votes ON contributions.id = contribution_id
      LEFT JOIN stories ON contributions.story_id = stories.id
    WHERE
      story_id = 6
      AND contributions.deleted = FALSE
    GROUP BY
      contributions.id,
      story_id,
      users.name,
      content,
      contributions.created_at,
      stories.owner_id
