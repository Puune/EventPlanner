This is Event Planner, created by Panu Lindqvist. See it live! 
https://safe-chamber-60092.herokuapp.com/ 

Description of my REST api:

All transfers are sent with Application/json, most with a header { Authorization: bearer -->}
  
api/users:
-With this router, user can request to
  GET / -- all users (returns array without sensitive data)
    {} or { token }

  CREATE / -- to create a new account
    { String:username, String:name, String:password }


api/login:
-With login router, user can login:
  POST / -- to send credentials and get jsonwebtoken as response
    { String:username, String:password }


api/occasions:
-With occasion router, user can access:
  GET / -- to get all (events are called occasions) occasions, that hes has rights to access
    {} or { token }

  POST / -- to post a new occasion.
    { String:title, String:subtitle, String:description, Boolean:isPrivate, MongoObjectId:owner, Date:date, String:location, token }

  PUT /:id -- to edit existing occasion //not implemented to front-end as of writing this//
    { String:title, String:subtitle, String:description, Boolean:isPrivate, MongoObjectId:owner, Date:date, String:location, token }

  PUT / -- to participate / unparticipate occasions
    { token, MongoObjectId:occasionId, Boolean:participate }

  DELETE / -- the owner has access to delete their occasions
    { token, MongoObjectId:occasionId }


api/invitation:
-With invitation router, user c an:
  POST / -- invites to other users, to their occasion
    { token, MongoObjectId:occasionId, inviteeId }

  PUT / -- accept or decline invitations they have received
    { token, MongoObjectId:occasionId, Boolean:accept}
