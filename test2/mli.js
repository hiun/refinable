function Person (name) {
  this.name = name;
  if (this.state) {
    return new Person(t);
  }
  this.state = true;
}

Person.prototype.state = false;

Person.prototype.hello = function () {
  console.log('hello i\'m ' + this.name);
}

Person.prototype.inherit = function (t) {
  return new Person(t);
}

var Hiun = new Person('hiun');
Hiun.hello();


var WorkerHiun = new Hiun('worker hiun');
WorkerHiun.hello();

//after inheritance
//redefine Person