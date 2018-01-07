**refinable.js** is JavaScript library for **object-oriented function refinement** to implement **cross-cutting and feature modularity by extension, mutation, and inheritance of function**.

* &#128221;&nbsp;&nbsp;**Function as Classes** refinable.js frammes function as class to enable flexible refinement of functions and method just like how we refine classes and objects

* &#128230;&nbsp;&nbsp;**Refinable Functions** refinable functions allows to implement cross-cutting and feature modularity using extension, mutation, and inheritance of function

* &#9989;&nbsp;&nbsp;**Safe, Manageable Refinements** Typed refinable functions uses type systems for detect potential composition error everytime when refinemenent modification occured.

* &#9889;&nbsp;&nbsp;**Natively Supported for Web** You can design and implement many modularity techniques without limits runtime environment or depends on special tooling and compilers. Perfect for Web and IoT development or constrained sensors devices.

## Links
* [Getting Started Examples](./examples)
* [API Documentation](./api)
* [Example Documentation](./docs)
* [Refinable Functions Theory](./theory)
* [Architectural Structure](./architecture)
* [Code Repository](https://github.com/hiun/self)

## Installing
```
npm install hiun/refinable
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

Refinable functions aspire motivation of many lasting modularity research like aspect-oriented programming and feature-oriented programming by attempting research’s theoretical benefits into pragmatic practices of rising script languages like JavaScript with dependency free implementation mechanism.
