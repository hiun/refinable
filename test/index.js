var Behavior = require('..');

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
  //console.log('-----userProfileQuery-----');
  //console.log(arguments)
  //console.log(db.find('user', userId));
  return db.find('user', userId);
}

function articleQuery() {
  var db = require('./db');
  return db.find('article', arguments);
}


var DBQuery = new Behavior();
DBQuery.add(function abc(n) {
return n + 100;
});
DBQuery.add(function xyz (n) {
return n + 100;
});
DBQuery.add(function wer (n) {
return n + 100;
});

var UserProfileQuery = DBQuery.inherit();
UserProfileQuery.add(function userProfileQuery (n) {return n + 7;});
UserProfileQuery.userProfileQuery.update(function (a) {
  return 1;
});
UserProfileQuery.exec(1, 2, console.log);

console.log(UserProfileQuery.behaviorStore.behaviors);
/*
console.log('!!!!!!!!!!!!!!!!!!!!1')
console.log(UserProfileQuery.userProfileQuery);
UserProfileQuery.userProfileQuery.update(function (argument) {
  // body...
});
*/