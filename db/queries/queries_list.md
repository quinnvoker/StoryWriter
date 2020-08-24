# List of queries

## Stories
Function - getAllStories(options)
* Full listing of stories
  * all stories / 04 - {}
  * all completed stories / 05 - {completed: true}
  * all incompleted stories /06 - {completed: false}
* Stories by owner_id
  * all stories / 01 {owner_id: INT}
  * completed stories only /02 {owner_id: INT, completed: true}
  * incompleted stories only {owner_id: INT, completed: false}


## Contributions
* All accepted contributions by story_id 07
* All pending contributions by story_id 08
* All contributions by user_id (my contributions) 09

## Votes
* Votes count by contribution_id // integrated with 08 & 09

## Favorites
* All favorites by user_id // 10