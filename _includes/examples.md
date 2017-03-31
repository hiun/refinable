Below examples shows how self can be usable for building typical web application, starting from domain analysis.

![hierarchical relationship](./static/img/rel.png)

### Behavior Construction
```javascript
var Behavior = require('self');

var DBQuery = new Behavior();

DBQuery.add(auth);
DBQuery.add(validate);
DBQuery.add(monit);
```

### Bahevior Inheritance
```javascript
/* Operation-specific Processing */
var ReadDBQuery = DBQuery.new();
var WriteDBQuery = DBQuery.new();

/* Object-specific Processing */
var ReadPosts = ReadDBQuery.new();
var WritePost = WriteDBQuery.new();

/* Feature-specific Processing */
var ReadPostsRecents = ReadPosts.new();
var ReadPostsPopular = ReadPosts.new();
var CreatePost = WritePost.new();
var UpdatePost = WritePost.new();
```


### Explicit Behavior Refinement
```javascript
var WriteDBQuery = DBQuery.new();

WriteDBQuery.add(writeBack);
WriteDBQuery.monitoring.update(cacheMonit);
WriteDBQuery.validate.before(beforeValidate);
WriteDBQuery.validate.after(afterValidate);
WriteDBQuery.validate.map(() => {
  return (validate) => {
    validateWrapper(validate);
  }
});

WriteDBQuery.beforeValidate.delete();

var CreatePost = new WriteDBQuery();

CreatePost.add(createUserSQLExec);
CreatePost.auth.update(twoFactorAuth);
```


### Implicit Behavior Refinement
Traits is object-independent, set of composable behavior. By `assign` method, behavior could refiend in high-level and implicit manner. 

```javascript
var publicApiTraits = {
    auth: null
};

WriteDBQuery.assign(publicApiTraits);
```

### Custom Behavior Refinement
By using `defineMethod`, user can create custom refinement method by accessing behavior array in the function. The following example is removing sub-behavior which start with `add` by doing simple pattern matching. In the definition, usage of standard API is possible by `apply` method with custom scope.

```javascript
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