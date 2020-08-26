# Homepage view

Lists all stories at bottom
Query optional:
 - complete? incomplete? all? (stretch)
Query needs to return:
 - story_id
 - story_cover_url
 - story_title
 - story_author_name
  Sort by
 - created_date
 >> getAllStories()

# My stories view

Lists all stories belonging to user id
Query needs input:
 - user_id
Query needs to return:
 - story_id
 - story_cover_url
 - story_title
 - story_author_name
  Sort by
 - created_date
 >> getAllStories({user_id})
 # Story view

 Get story data
 Query needs input:
 - story_id
 Query needs to return:
 - id
 - owner_id
 - owner_name
 - title
 - cover_image_url
 - created_at
 - completed
 >> getStoryData()

 Lists all accepted contributions
 Query needs input:
 - story_id
 Query needs to return:
 - contribution_id
 - contribution_author_name
 - contribution_accepted_at_time
 - contribution_content
  Sort by
 - accepted_at time
 >> getAcceptedContributionByStoryId()

 Form to add new contribution
 Query needs input:
 - Contribution content
 - User id
 - Story id
>> createContribution()


 Lists all contributions being voted on
 Query needs input:
 - Story id
 Query needs to return
 - contribution_id
 - contribution_author_name
 - contribution_created_at_time
 - contribution_content
 - contribution_vote_count
  Sort by
 - vote count
>> getPendingContributionByStoryId()

 Each voting contribution should be clickable to open full contribution

 # My contributions

 Show all contributions made by a specific user

 Query needs input:
 - User id
 Query needs to return:
 - contribution_id
 - story_id
 - story_title
 - contribution_created_at_time
 - contribution_content
 - contribution_is_accepted
 - contribution_vote_count
  Sort by
 - created_at
>> getContributionsByUserId()


 # Contribution view

 Show full contents of a contribution, and a like button

 Query needs input:
 - Contribution id
 Query needs to return
 - story_title
 - contribution_content
 - contribution_author_name
 - contribution_created_at
 - contribution_vote_count
 >> getContributionById()

 And display a 'like' button to cast vote on contribution
 Maybe a link to go back to story?

Query needs input:
- user_id
- title
- cover_image_url
Query needs to return
- story_id
>> createStory()
