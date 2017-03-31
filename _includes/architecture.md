### Architecture
![architecture](/static/img/arch.png)
Self has two major part `index.js` for provides user-visible API and `behavior-store.js` for internal operating mechanism. When `index.js` is loaded as a behavior constructor in program then user interact with standard API in prototype of `behavior instance`, the `sub1`, `sub2` in `behavior instance` does not store actual `behavior instance` but it stores only name and designated to provides an anchor for invoeke internal operating mechanism.

### Operating Mechanism
The goal of operatation in Self, as a both conceptual and implementation perspective, is fullfull variability of software feature applying easy and sophisticated refinement to element - a sub behavior in array. To do this, every `behavior instance` has its own `behavior-store instance` which stores actual behaviors array and its method to perform manipulation. As a result, the caller user program indirectly manipulates behavior.