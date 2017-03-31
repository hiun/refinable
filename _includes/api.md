## API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Example](#example)
- [Behavior(...args)](#behaviorargs)
- [The Behavior Object](#the-behavior-object)
  - [stamp.methods(...args)](#stampmethodsargs)
  - [Behavior.before(...args)](#behaviorbeforeargs)
  - [Behavior.after(...args)](#behaviorbeforeargs)
  - [Behavior.update(...args)](#behaviorupdateargs)
  - [Behavior.map(...args)](#behaviormapargs)
  - [Behavior.delete(...args)](#behaviordeleteargs)
  - [Behavior.exec(...args)](#behaviorexecargs)
  - [Behavior.new(...args)](#behaviornewargs)
  - [Behavior.assign(...args)](#behaviorassignargs)
  - [Behavior.defineMethod(...args)](#behaviordefinemethodargs)

## Example

```javascript
/* CONSTRUCTION PART */

// define self
var Behavior = require('self');

// initialising behavior
var DBQuery = new Behavior();

// adds some sub-behaviors
DBQuery.add(auth); // authentication checker
DBQuery.add(validate); // data validation
DBQuery.add(monit); // monitoring


/* REFINEMENT PART */

// inherit DBQuery to operation-specific, WriteDBQuery
var WriteDBQuery = DBQuery.new();

// add some sub-behaviors (refinements)
WriteDBQuery.add(writeBack);

// update specified sub-behavior to new sub-behavior
WriteDBQuery.monitoring.update(cacheMonit);

// add sub-behavior in specified location
WriteDBQuery.validate.before(beforeValidate);
WriteDBQuery.validate.after(afterValidate);

// manipulating sub-behavior
WriteDBQuery.validate.map(() => {
  return (validate) => {
    validateWrapper(validate);
  }
});
//delete sub-behavior
WriteDBQuery.beforeValidate.delete();


/* ADDITIONAL REFINEMENT */

// inherit WriteDBQuery to object-specific query
var CreatePost = WriteDBQuery.new();
var CreateMessage = WriteDBQuery.new();

CreatePost.add(createUserSQLExec);
CreateMessage(createMsgSQLExec);

//additional modification
CreatePost.auth.update(twoFactorAuth);
CreateMessage.auth.before(geographicalBlock);
```


## Behavior()

The constructor function takes no argument.

Returns a new behavior instance that will be the subject of further manipulation.

 * `@return {Object} behavior` An new behavior object contain empty or given sub-behvior

```js
var Behavior = require('self');

var DBQuery = new Behavior();
```

## The Behavior Object

### Behavior.add(...args)

Adds new sub-behavior.

The argument can be either 

 * `@param {Object} [initBehaviors]`
 * `@param {Object[]} [initBehaviors.data]` - Array of sub-behaviors
 * `@param {String} initBehaviors.data[].name` - Name of sub-behavior.
 * `@param {Function|Object} initBehaviors.data[].behavior` - Function or behavior.

Returns a new behavior instance that will be the subject of further manipulation.

 * `@return {Object} behavior` An new behavior object contain empty or given sub-behvior

```js
var LoadArticle = new Behavior().add(inputScaffolding).add(authCheck).add(cacheCheck).add(loadQuery);
```

### Behavior.before(...args)

Add new behavior before specified behavior

* `@param {Function|Object}` - New function or behavior object  
* `@param {String}` - name of behavior (if function name does not exist)  
* `@return {Behavior}` for chaining

```js
WriteDBQuery.validate.before(checkEmpty);
```

### Behavior.after(...args)

Add new behavior after specified behavior

`@param {Function|Object}` New function or behavior object.  
`@param {String}` name of behavior (if function name does not exist)  
`@return {Behavior}` for chaining

```js
WriteDBQuery.validate.after(checkEmpty);
```

### Behavior.update(...args)

Update specified behavior with given behavior

`@param {Function|Object}` New function or behavior object.  
`@return {Behavior}` for chaining

```js
WriteDBQuery.monitoring.update(cacheMonit);
```

### Behavior.map(...args)

 Wrap specified behavior with given function-returning function

* `@param {Function}` A function for manipulating behavior, this function wraps function which contains original behavior  
* `@return {Behavior}` for chaining

```js
WriteDBQuery.validate.map(() => {
    return (validate) => {
      validateWrapper(validate);
}
});
```

### Behavior.delete()

Delete specified behavior, this function takes no argument

* `@return {Behavior}` for chaining

Below example deletes `auth` sub-behavior from `ReadDBQuery`

```js
ReadDBQuery.auth.delete();
```

### Behavior.exec(...args)

 Execute behavior by serially invoke sub-behavior in array

* `@param {...*}` argumenets for execution  
* `@return {Behavior}` for chaining

```js
var ReadDBQuery.exec({userID: 14});
```

### Behavior.catch(...args)

Catch errors while invoking promise

* `@param {Function}` Function to perform error handling  
* `@return {Behavior}` for chaining

```js
var ReadDBQuery.exec({userID: 14}).catch(() => { return http.res(500) });
```

### Behavior.new(...args)

Create inherited behavior. The inherited behavior is deep clone of parant behavior and does not reference or link any property

* `return {Behavior}` deeply cloned instance of behavior

```js
var ReadDBQuery = DBQuery.new();
var WriteDBQuery = DBQuery.new();
```

### Behavior.assign(...args)

Apply traits to behavior Traits means set of object-independent, composable behavior
Traits override existing sub-behavior with given sub-behavior by name

* `@param {Object}` traits object  
* `@return {Behavior}` for chaining

The below examples shows `publicApiTraits` embodies traits of behavior that, remove all `auth` module, which of course effects all sub-behavior originated from `WriteDBQuery`.

```js
var publicApiTraits = {
    auth: null
};

WriteDBQuery.assign(publicApiTraits);
```

### Behavior.defineMethod(...args)

Define new method for perform refinement of sub-behavior contained array directly

* `@param {String}` method name  
* `@param {Function}` method function  
* `@return {Behavior}` for chaining


``` js
Formula.defineMethod('deleteAddition', function () {
  var self = this;
  this.behaviorStore.behaviors.forEach(function (behavior) {
    if (behavior.name.slice(0, 3) === 'add') {
      self.delete.apply({name: behavior.name, behaviorStore: self.behaviorStore});
      // or by using private API
      //self.behaviorStore.deleteBehavior(behavior.name);
    }
  });
});
```