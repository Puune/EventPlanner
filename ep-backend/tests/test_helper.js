const secTool = require('../utils/securityTool');

const createInitUsers = async () => {
  const user1 = {
    username: 'firstOne',
    name: 'Jeesus',
    passwordHash: await secTool.genPasswordhash('short')
  }

  const user2 = {
    username: 'secondOne',
    name: 'batman',
    passwordHash: await secTool.genPasswordhash('strong')
  }

  const users = [ user1, user2 ];
  return users;
}

module.exports = {
  createInitUsers
}