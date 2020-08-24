# Homepage view

Lists all stories at bottom
Query optional:
 - complete? incomplete? all? (stretch)
Query needs to return:
 - Story id
 - Story cover url
 - Story title
 - Story author name
 - Sort by created_date

# My stories view

Lists all stories belonging to user id
Query needs input:
 - User id
Query needs to return:
 - Story id
 - Story cover url
 - Story title
 - Story author name
 - Sort by created_date

 # Story view

 Lists all accepted contributions
 Query needs input:
 - Story id
 Query needs to return:
 - Contribution id
 - Contribution author name
 - Contribution accepted_at time
 - Contribution content
 - Sort by accepted_at time

 Form to add new contribution
 Query needs input:
 - Contribution content
 - User id
 - Story id

 Lists all contributions being voted on
 Query needs input:
 - Story id
 Query needs to return
 - Contribution id
 - Contribution author name
 - Contribution created_at time
 - Contribution content
 - Contribution vote count
 - Sort by vote count

 Each voting contribution should be clickable to open full contribution

 # My contributions

 Show all contributions made by a specific user

 Query needs input:
 - User id
 Query needs to return:
 - Contribution id
 - Contribution created_at time
 - Contribution content
 - Contribution vote count
 - Story id?

 # Contribution view

 Show full contents of a contribution, and a like button

 Query needs input:
 - Contribution id
 Query needs to return
 - Contribution content
 - Contribution author name
 - Contribution created_at
 - Contribution vote count
 - Story id

 And display a 'like' button to cast vote on contribution
 Maybe a link to go back to story?
