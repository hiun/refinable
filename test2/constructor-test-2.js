function Person (name) {
  this.fname = name;
}

function selfIntro () {
  console.log('hello i\'m ' + this.fname);
}


Person.prototype.selfIntro = selfIntro;

Person.prototype = 


var Hiun = new Person('hiun');
Hiun.selfIntro();


Hiun.prototype = {};
Hiun.prototype['constructor'] = function (name) {
  this.fname = name;
}

var WorkerHiun = new Hiun('worker hiun');
WorkerHiun.selfIntro();