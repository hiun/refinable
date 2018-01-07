## Getting Started

Let's make refinable data checker, a type of procedure that widely used in applications and library. Let's construct checker for phone number and name, instead of directly checking specific constrains, `refinable.js` gradually checking general concern to specific concern to dealing with further variability.

First of all, create data empty checker.

```js
var Refinable = require('refinable');
var assert = require('assert')

var Checker = new Refinable().add((data) => {
    assert.ok(data, 'data emptied!')
}, 'emptyChecker');
```

Then, inherit `Checker` to implements `NumberChecker` and `StringChecker`.

```js
var NumberChecker = Checker.new().add((data) => {
    if (typeof data !== 'number') {
        throw new TypeError('data shoud be number!')
    }
}, 'numberChecker');

var StringChecker = Checker.new().add((data) => {
    if (typeof data !== 'string') {
        throw new TypeError('data shoud be string!')
    }
}, 'stringChecker');
```

Finally implements phone number and name checker
```js
var PhoneNumberChecker = NumberChecker.new().add((data) => {
    if (PHONE_NUMBER_MAX_DIGIT > data.length) {
        return true;
    } else {
        throw new RangeError('length of phone number exceeds!')
    }
}, 'phoneNumberChecker');

var NameChecker = StringChecker.new().add((data) => {
    if (NAME_MAX_DIGIT > data.length) {
        return true;
    } else {
        throw new RangeError('length of name exceeds!')
    }
}, 'nameChecker');

//creditCardCheck
//addressCheck
```

But, what if the input data requires formatting? Such as removing dashes? Instead of implementing directly to `nameChecker` or `stringChecker`, let's create formatter that helps to scaffold input data.

```js
var numberSplitter = Checker.new().add((data) => {
    return { data: data.split('-') }
}, 'numberSplitter');

var PhoneNumberChecker2 = PhoneNumberChecker.new().numberChecker.map((data) => {
    var arr = data.split('-').map(parseInt);
    arr.forEach((value) => {
        return (oriNumberChecker) => {
            if (!oriNumberChecker(value)) {
                throw new TypeError('invalid phone number');
            }
        }
    });
    return arr.join();
});
```
