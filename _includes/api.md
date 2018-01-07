## API Documentation

This page introduces APIs of refinable function. The documentation is divided into multiple parts to follows features of refinable functions from construction of refinable functions to extension, mutation, exportation, inheritance, and invocation. Note that the *Self* sign used in method call defines subfunctions or sub refinable functions. 

Note: Currently some of APIs are not fully implemented and possibly unstable for test and use. This banner will be removed when a stable release is made.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Contents

- [The Refinable Class](#refinable-class)
- [The Refinable Object](#refinable-object)
  - [Function Extension](#function-extension)
    + [Refinable.add(...args)](#add)
    + [Refinable.prepend(...args)](#prepend)
    + [Refinable.*Self*.before(...args)](#before)
    + [Refinable.*Self*.after(...args)](#after)
  - [Function Mutation](#function-mutation)
    + [Refinable.*Self*.update(...args)](#update)
    + [Refinable.*Self*.map(...args)](#map)
    + [Refinable.*Self*.around(...args)](#around)
    + [Refinable.*Self*.delete()](#delete)
    + [Refinable.*Self*.bind(...args)](#bind)
    + [Refinable.assign(...args)](#assign)
    + [Refinable.defineMethod(...args)](#define-method)
  - [Function Exportation](#function-exportation)
    + [Refinable.asEntry()](#as-entry)
    + [Refinable.*Self*.asBefore()](#as-before)
    + [Refinable.*Self*.asAfter()](#as-after)
    + [Refinable.*Self*.asAround()](#as-around)
  - [Function Inheritance](#function-inheritance)
    + [Refinable.new(...args)](#new)
  - [Function Invocation](#function-invocation)
    + [Refinable.exec(...args)](#exec)
    + [Refinable.catch(...args)](#catch)
<!--remove self from invokes by the means for not require to use subbehavior name in front of these methods-->


## <a class="anchor-text" href="#refinable-class">Refinable Class</a>
{: #refinable-class}

The constructor function takes no argument.

Returns a new behavior instance that will be the subject of further manipulation.

 * `@return {Object} behavior` An new behavior object contain empty or given sub-behvior

```js
var Refinable = require('refinable');

var DBQuery = new Refinable();
```

## <a class="anchor-text" href="#refinable-object">Refinable Object</a>
{: #refinable-object}

This section introduces standard refinement API of refinable functions object for an extension, mutation, Exportation, inheritance, and invocation of refinable functions.

### <a class="anchor-text" href="#function-extension">Function Extension</a>
{: #function-extension}


Function extension part demonstrates function extension by implementing RESTful API for a business object called `ArticleBO`. The final flow of this object is following. 

All method of function extension has eventually equivalent functionality which is extension however they used differently by the meaning of the order of refinement. For example, the `add` method used by extending function from scratch and `before` and `after` method utilizes relative extension from arbitrary points of the function. `prepend` is useful to add top-level operation like validation.

```
inputFormatting - authCheck - cacheCheck - readQuery - httpResp
```

### <a class="anchor-text" href="#add">Refinable.add(...args)</a>
{: #add}

Adds new sub-behavior.

The argument can be either 

 * `@param {Object} [initBehaviors]`
 * `@param {Object[]} [initBehaviors.data]` - Array of sub-behaviors
 * `@param {String} initBehaviors.data[].name` - Name of sub-behavior.
 * `@param {Function|Object} initBehaviors.data[].behavior` - Function or behavior.

Returns a new behavior instance that will be the subject of further manipulation.

 * `@return {Object} behavior` An new behavior object contain empty or given sub-behvior

```js
//the add method serially adds sub functions to implement API
//RESULT: cacheCheck - readQuery
ArticleBO.write = new Refinable().add(cacheCheck).add(readQuery);
```

### <a class="anchor-text" href="#prepend">Refinable.prepend(...args)</a>
{: #prepend}

Prepend new refinable functions

* `@param {Function|Object}` - New function or behavior object  
* `@param {String}` - name of behavior (if function name does not given)  
* `@return {Refinable}` for chaining

```js
//the prepend method put given sub functions from beginning part of refinable functions
//RESULT: inputFormatting - cacheCheck - readQuery
ArticleBO.write.prepend(inputFormatting);
```

### <a class="anchor-text" href="#before">Refinable.*Self*.before(...args)</a>
{: #before}


Add new behavior before specified subfunctions

* `@param {Function|Object}` - New function or behavior object  
* `@param {String}` - name of behavior (if function name does not exist)  
* `@return {Refinable}` for chaining

```js
//before method is works like before advice
//RESULT: inputFormatting - authCheck - cacheCheck - readQuery
ArticleBO.write.cacheCheck.before(authCheck);
```

### <a class="anchor-text" href="#after">Refinable.*Self*.after(...args)</a>
{: #after}

Add new behavior after specified behavior

`@param {Function|Object}` New function or behavior object.  
`@param {String}` name of behavior (if function name does not exist)  
`@return {Refinable}` for chaining

```js
//before method is works like after advice
//RESULT: inputFormatting - authCheck - cacheCheck - readQuery - httpResp
WriteDBQuery.write.readQuery.after(httpResp);
```

## <a class="anchor-text" href="#function-inheritance">Function Inheritance</a>
{: #function-inheritance}

Function inheritance enables extends and mutates refinable function into different directions by making a distinguished copy of refinable functions. Inheritance is made by calling `new` method of refinable functions.

### <a class="anchor-text" href="#new">Refinable.new(...args)</a>
{: #new}

Create inherited behavior. The inherited behavior is deep clone of parent behavior and does not reference or link any property

* `return {Refinable}` deeply cloned instance of behavior

```js
var ReadDBQuery = DBQuery.new();
var WriteDBQuery = DBQuery.new();
```

## <a class="anchor-text" href="#function-mutation">Function Mutation</a>
{: #function-mutation}

Function mutation is opposite concept of function extension, it mutates subfunctions members of refinable function to modify its behavior. 
In object-oriented programming community, mutation means any form of changes as a contrast to immutability. In refinable functions, mutations mean the same replacement, deletion, wrapped and bound its subfunction.

In this part, we demonstrate the extension of function by an inherited instance of `ArticleBO` for to make `ArticlePhotoBO` which has following flow.

```
fileSizeChecker(exifFormatting) - authCheck.bind('photo-authority') - readQuery - httpResp
```



### <a class="anchor-text" href="#update">Refinable.*Self*.update(...args)</a>
{: #update}


Update specified behavior with given behavior

`@param {Function|Object}` New function or behavior object.  
`@return {Refinable}` for chaining

```js
//update method replaces specifies sub functions
ArticlePhotoBO.write = ArticleBO.write.new().inputFormatting.update(exifFormatting)
```

### <a class="anchor-text" href="#map">Refinable.*Self*.map(...args)</a>
{: #map}


Wrap specified behavior with given function-returning function

* `@param {Function}` A function for manipulating behavior, this function wraps function which contains original behavior  
* `@return {Refinable}` for chaining

```js
ArticlePhotoBO.write.exifFormatting.map(() => { return (exifFormatting) => { fileSizeChecker(exifFormatting) } })
```


### <a class="anchor-text" href="#around">Refinable.*Self*.around(...args)</a>
{: #around}

Alias of [Refinable.*Self*.map(...args)](#refinableselfmapargs).


### <a class="anchor-text" href="#delete">Refinable.*Self*.delete()</a>
{: #delete}

Delete specified behavior, this function takes no argument

* `@return {Refinable}` for chaining

Below example deletes `auth` sub-behavior from `ReadDBQuery`

```js
//the delete method removes specifified sub function in this case cacheChekcer for images upload API
ArticlePhotoBO.write.cacheChecker.delete();
```

### <a class="anchor-text" href="#bind">Refinable.*Self*.bind(...args)</a>
{: #bind}

Delete specified behavior, this function takes no argument

* `@param {...*}` argument to be bound
* `@return {Refinable}` for chaining

Below example deletes `auth` sub-behavior from `ReadDBQuery`

```js
//bound authority for photo for auth checking of using API
ArticlePhotoBO.write.authCheck.bind('photo-authority');
```

### <a class="anchor-text" href="#assign">Refinable.assign(...args)</a>
{: #assign}

Apply traits to behavior Traits means set of object-independent, composable behavior
Traits override existing sub-behavior with given sub-behavior by name

* `@param {Object}` traits object  
* `@return {Refinable}` for chaining

The below examples shows `publicApiTraits` embodies traits of behavior that, remove all `auth` module, which of course affects all sub-behavior originated from `WriteDBQuery`.

```js
var publicApiTraits = { auth: null };

ArticlePhotoBO.write.assign(publicApiTraits);
```

### <a class="anchor-text" href="#define-method">Refinable.defineMethod(...args)</a>
{: #define-method}

Define new method for performing refinement of sub-behavior contained array directly

* `@param {String}` method name  
* `@param {Function}` method function  
* `@return {Refinable}` for chaining


``` js
//similar to Refinable.assign, in this example create custom method
//for deleting all authentication-related module
//classified as 'auth' for first three characters f sub function name
Formula.defineMethod('deleteAuth', function () {
  var self = this;
  this.behaviorStore.behaviors.forEach(function (behavior) {
    if (behavior.name.slice(0, 3) === 'auth') {
      self.delete.apply({name: behavior.name, behaviorStore: self.behaviorStore});
      // or by using private API
      //self.behaviorStore.deleteBehavior(behavior.name);
    }
  });
});
```

## <a class="anchor-text" href="#function-exportation">Function Exportation</a>
{: #function-exportation}

Function exportation is used as delegating final refinement of function to the user; this is especially useful for providing reusing refinable functions for commonalities containers like cross-cutting concerns and allows the user to freely refine rest of behavior.

Exporting functions is directly related to information hiding principle of object-oriented programming by allowing refinable function-based object and modules as a distributable package. T

### <a class="anchor-text" href="#as-entry">Refinable.asEntry()</a>
{: #as-entry}

Export refinable functions as around advice

* `@return {Refinable}` for chaining

```js
//defines read API archetypes by deleting query
//by calling exportation method, refinable functions internally calls new()
var WriteAPI = ArticleBO.new().readQuery.delete().cacheCheck.asEntry();
//module.exports = WriteAPI

//in library consumer side
WriteAPI.compose(writeQuery)
```

### <a class="anchor-text" href="#as-around">Refinable.*Self*.asAround()</a>
{: #as-around}

Alias of [Refinable.*Self*.asEntry](#refinableselfasentry).

### <a class="anchor-text" href="#as-before">Refinable.*Self*.asBefore()</a>
{: #as-before}

Export refinable functions as before advice

* `@return {Refinable}` for chaining

```js
//equovalently functioning code for asEntry
var WriteAPI = ArticleBO.new().readQuery.delete().httpResp.asBefore();
WriteAPI.compose(writeQuery)
```

### <a class="anchor-text" href="#as-after">Refinable.*Self*.asAfter()</a>
{: #as-after}

Export refinable functions as after advice

* `@return {Refinable}` for chaining

```js
var WriteAPI = ArticleBO.new().readQuery.delete().cacheCheck.asAfter();
WriteAPI.compose(writeQuery)
```



## Function Invocation

### <a class="anchor-text" href="#exec">Refinable.exec(...args)</a>
{: #exec}

Execute refinable function by serially invokes internal subfunctions.

* `@param {...*}` argumenets for execution  
* `@return {Refinable}` for chaining

```js
var ReadDBQuery.exec({userID: 14});
```

### <a class="anchor-text" href="#catch">Refinable.catch(...args)</a>
{: #catch}

Catch errors while invoking promise

* `@param {Function}` Function to perform error handling  
* `@return {Refinable}` for chaining

```js
var ReadDBQuery.exec({userID: 14}).catch(() => { return http.res(500) });
```


