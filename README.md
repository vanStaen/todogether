# todogether.com
Multiplayer-todo-lists.

## Requirement

1. Todo-task
   - Has an Id
   - Belong to a list
   - Have a position in list
   - Can be favorited
   - Can be archived
   - Has comments
   - Can have subtasks
   - Can be assigned to a user
   - Can be recurring
     - Daily
     - Weekly
     - Monthly
     - Yearly
     - Custom
   - Can have a deadline
   - Belongs to a category
   - Has an owner (must not equal owner of list)
2. List
   - Has an Id
   - Has an owner
   - Can be shared with other user
   - Has an avatar
   - Opt: other list types 
     - Wishlist
     - Shoppinglist
     - Linklist
     - Playlist
3. User
   - Has an Id
   - Name
   - Email
   - Pwd
   - Avatar
   - Is linked to all the list he is owner of
   - Has a list of category (to sort tasks)
   - Email Settings 
     - Get daily/weekly/no recap
     - get notification per email
   - Display settings:
     - Show category tag
     - Show done tasks
     - Show deleted tasks
     - Show Recurring tasks
     - Show due date
4. Behavior of the page:
    - Task can be organized with drag and drop
    - Owner can add new user to list
    - User and owner can add new task
    - User and owner can comment
    - People can be tagged in the comment
    - User can be assigned to task
    - Notification are sent when something happens 
      - Comment
      - New task