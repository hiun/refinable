*A work in progress.*

# self-js
JavaScript Implementation of Self-composable Programming


# API
| **Method Name** | **Description** |
| ------------- |:-------------:|
|**Logic#add(Function\|Logic)** | Append given function|logic to Logic|
|**Logic#Sublogic#before(Function\|Logic)** | Insert given function|logic before specified sublogic|
|**Logic#Sublogic#after(Function\|Logic)** | Insert given function|logic after specified sublogic|
|**Logic#Sublogic#update(Function\|Logic)** | Update specified sublogic into given logic|
|**Logic#Sublogic#delete(Function\|Logic)** | Delete specified sublogic|
|**Logic#Sublogic#map(Function\|Logic)** | Replace specified sublogic to the returned function which gets original sublogic as a argument|

# Example

## Initialisation & Inheritance
```javascript
var DBQuery = new Logic();

DBQuery.add(A); 
DBQuery.add(B);
DBQuery.add(C);

var ReadDBQuery = new DBQuery();
var WriteDBQuery = new DBQuery();
```

##Logic & Sublogic Manipulation
```javascript
var ReadRecentArticles = new ReadDBQuery();

ReadRecentArticles.Q1.before(A1);
ReadRecentArticles.Q2.after(A2);

ReadRecentArticles.Q2.update(Q4);
ReadRecentArticles.Q3.delete(A2);

ReadRecentArticles2.Q4.map( (Q4) => {     
    return () => {
        for (var i; i < 3; i++) {
            Q4();
        }
    }
});
```

# Status
This is partial implementation of Self-composable programmng, feature may incomplete and unstable.

# Todos
-  Processing array of function which returns Promise and callback
-  Specification and/or wrapper for argument passing style to achive universal composability
- Epxlicit manipulation support on native property
```javascript
UserProfileQuery.add('user-profile-query', userProfileQuery);
//versus explicit access
UserProfileQuery.userProfileQuery.update();
```