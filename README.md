# Todogether.com

Multiplayer-todo-lists.
http://todogether-cvs.herokuapp.com/

## Backend

Sequelize as Object-Relational-Mapper for node.js & PostgresQL.
GraphQL for data exchange with Frontend, but REST API for Auth.

Packages: `npm i aws-sdk axios bcryptjs cookie-session cors dotenv express graphql-http fs graphql jimp jsonwebtoken moment path pg sequelize uuid`

## Requirements

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
     - x time after being closed
   - Can have a deadline
   - Has an owner (must not equal owner of list)
   - Belongs to a category
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
     - Added to List
     - Assigned to Task
     - Task Owner: Task done by other
     - List Owner: Task added by other
     - Deadline is soonish
     - Deadline is over

## Ressources

Colors: #D9D6CB & #E59966
Logo: `https://icons8.com/icon/104283/handshake-heart`
PWA: install as an app `https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs`

## Deployment

To update Render's permission in github
https://github.com/apps/render/installations/new/permissions?target_id=12551446
