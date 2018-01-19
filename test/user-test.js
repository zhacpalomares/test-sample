const Assert = require('chai').assert;
const Expect = require('chai').expect;
const Sinon = require('Sinon');
const SinonTest = require('sinon-test')(Sinon);
const Promise = require('bluebird');
const User = require('../models/user');

describe('User', function() {

  it('Should get all users', function(){
    return User.getAllUsers(function(error, response){
      Assert.isTrue(response.length > 0)
    })
  });

  it('Should able to login', SinonTest(function(){

    this.stub(User, 'find').callsFake(function() {
      return Promise.resolve({
        username: 'admin',
        password: 'admin'
      });
    });

    return User.logginUser('admin', 'admin', function(error, response){
      Assert.isDefined(response);
      Assert.equal(response.username, 'admin');
      Assert.equal(response.password, 'admin');
    });
  }));

  it('Should get user not found', SinonTest(function(){

    this.stub(User, 'find').callsFake(function() {
      return Promise.resolve({
        username: 'sdadad',
        password: 'asdasd'
      });
    });

    return User.logginUser('admin', 'admin', function(response){
        Assert.equal(response, 'Error: User not found');
    });
  }));

  it('Method should throw an error', SinonTest(function(){

    this.stub(User, 'find').callsFake(function() {
      return Promise.reject('Internal Server error');
    });

    return User.logginUser('ad', 'ad', function(response){
      Assert.equal(response, 'Error: Internal Server error')
    });
  }));

  it('Should get saved user with ID and called log method', SinonTest(function(){

    var spy = this.spy(User, 'log');

    return User.saveUser({
      username: 'zac',
      password: 'pass'
    }, function(err, response){
      Assert(spy.calledOnce);
      Expect(response).to.have.property('id');
    });
  }));


});
