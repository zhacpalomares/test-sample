const Promise = require('bluebird');

var User = {

  getAllUsers: function(callback) {
    User.findAll().then(function(users){

      if (users && users.length > 0) {
        return callback(null, users);
      } else {
        return callback(new Error('No users available'));
      }
    })
  },

  logginUser: function(username, password, callback) {
    User.find().then(function(user) {
      if (user.username == username && user.password == password) {
        return callback(null, user);
      } else {
        return callback(new Error('User not found'))
      }
    }).catch(function(err){
      return callback(new Error(err));
    })
  },

  saveUser: function(user, callback){
    User.save(user).then(function(user) {
      return callback(null, user);
    })
  },

  find: function(options) {
    return new Promise(function (resolve) {
        resolve({
          username: 'admin',
          password: 'admin'
        });
    });
  },

  findAll: function(options) {
    return new Promise(function (resolve) {
        resolve([
          {
            id: 1,
            username: 'user1',
            password: 'pass1'
          },
          {
            id: 2,
            username: 'user2',
            password: 'pass2'
          },
          {
            id: 3,
            username: 'user3',
            password: 'pass2'
          }
        ]);
    });
  },

  save: function(user) {
    return new Promise(function (resolve) {
        user.id = '1';
        User.log();
        resolve(user);
    });
  },

  log: function() {
    // nothing to do here
  }

}


module.exports = User;
