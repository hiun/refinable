[![Build Status](https://travis-ci.org/hiun/self.svg?branch=master)](https://travis-ci.org/hiun/self)

Self towards new abstraction of foundations of computer programming by enabling construction of refinable function. Self introduces,

* &#128221;&nbsp;&nbsp;**Function as an Object** Self adds flexibility of OOP to function including inheritance and traits

* &#128230;&nbsp;&nbsp;**Abstract Function** Self provides an refianble high-level function that gradually localise concerns

* &#9989;&nbsp;&nbsp;**Safe, Manageable Metaprogramming** all manipulation of function occurs in the realm of self

* &#9889;&nbsp;&nbsp;**Natively Supported** no special tooling, transpilers or language extension required


## Installing
```
npm install self
```

Note : Currently the library is experienmental and possibly unstable.

Prerequisite : [Node.js](http://nodejs.org) 7.6 or higher (OR 6.5 or higher with `--harmony` flag for `async await`)

## Simplist Example

### API Server

```js
var Behavior = require('self');
var DBQuery = new Behavior.add(inputScaffolding).add(authCheck);
var ReadDBQuery = DBQuery.new().add(cacheCheck);
var WriteDBQuery = DBQuery.new().add(writeBackCheck);

var LoadArticle = ReadDBQuery.new().add(loadQuery);
var CreateArticle = WriteDBQuery.new().add(creationQuery);

LoadArticle.exec(input).then(resp200).catch(resp500);

//using traits
var publicApiTraits = {authCheck: null};
var publicLoadArticle = LoadArticle.new().assign(publicApiTraits);
```

Self aspire motivation of [Aspect-oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming), a managed metaprogramming for seperation of concerns. Self advances use of [function advising](https://en.wikipedia.org/wiki/Advice_(programming)) by bringing object-oriented refinement, such as method, inheritance or traits.

The possible applications of Self can be applied to software that has **frequently using largely variable features** also known as software product lines. Prospective candidates including api servers, robotics and inteligent system.