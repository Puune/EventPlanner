This is Event Planner, created by Panu Lindqvist.

Description of my REST api:

All transfers are sent with Application/json, most with a header { Authorization: bearer -->}
  
api/users:
-With this router, user can request to
  GET / -- all users (returns array without sensitive data)
  CREATE / -- to create a new account


api/login:
-With login router, user can login:
  POST / -- to send credentials and get jsonwebtoken as response


api/occasions:
-With occasion router, user can access:
  GET / -- to get all (events are called occasions) occasions, that hes has rights to access
  POST / -- to post a new occasion.
  PUT /:id -- to edit existing occasion //not implemented to front-end as of writing this//
  PUT / -- to participate / unparticipate occasions
  DELETE / -- the owner has access to delete their occasions


api/invitation:
-With invitation router, user c an:
  POST / -- invites to other users, to their occasion
  PUT / -- accept or decline invitations they have received