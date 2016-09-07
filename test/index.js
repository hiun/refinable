var Logic = require('..');

function emptyChk (data) {
  return arguments;
  //traverse array for validation
  if (data) {
    return data;
  } else {
    throw 'emptyChk : data is empty';
  }
}

function userProfileQuery(userId) {
  var db = require('./db');
  console.log('-----userProfileQuery-----');
  console.log(arguments)
  console.log(db.find('user', userId));
  return db.find('user', userId);
}

function articleQuery() {
  var db = require('./db');
  return db.find('article', arguments);
}

//console.log(Logic)

var DBQuery = new Logic();
DBQuery.add('empty-check', emptyChk);
var UserProfileQuery = DBQuery.inherit();
UserProfileQuery.add('user-profile-query', userProfileQuery);
UserProfileQuery.userProfileQuery.update();
UserProfileQuery.init(1).exec(console.log);

UserProfileQuery.emptyCheck.map(function (emptyCheck) {
  return function () {
    doSomething();
    emptyCheck();
  }
})


