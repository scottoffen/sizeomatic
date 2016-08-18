# sizeomatic #

sizeomatic is a module that provides methods for approximating the amount of memory being used by a JavaScript object. The results should not be assumed to be precisely accurate, but rather estimates based on useful approximations. It also exports two methods for converting between bytes and larger units of digital storage - which are accurate.

[![NPM](https://nodei.co/npm/sizeomatic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sizeomatic/)

```
$ npm install sizeomatic
```

### Type/Size Approximation ###

| Type    | Approximation         |
|---------|-----------------------|
| boolean | 4 bytes               |
| number  | 8 bytes               |
| string  | 2 bytes per character |

### Size Abbreviations ###

| Abbr | Size     |
|------|----------|
| K/k  | Kilobyte |
| M/m  | Megabyte |
| G/g  | Gigabyte |

### Usage ###

```javascript
var sizeomatic = require ('sizeomatic');

var bytes = sizeomatic.howManyBytes('125K');
/* result : 128000 */

var notbytes = sizeomatic.pretty(bytes + 1500);
/* result : 126.465K */

var obj =
{
	b : true,
	n : 12345,
	s : "Hello!",
	a : [ "something", "wicked", "this", "way", "comes" ],
	o : { "everything" : "is awesome!" }
};

var size = sizeomatic.getSize(obj);
/* result: 130 (bytes) */

var rsize = sizeomatic.getSize(JSON.stringify(obj));
/* result: 228 (bytes) */
```

## Methods ##

The following methods are exposed.

### howManyBytes ###

Takes a string representation of an amount of digital storage and returns an integer representation of the number of bytes. The case of the units does not matter, and if you accidentally add a `b` at the end, it will handle that, too.

```javascript
console.log(sizeomatic.howManyBytes('125'));
/* 125 */

console.log(sizeomatic.howManyBytes('125B'));
/* 125 */

console.log(sizeomatic.howManyBytes('125Kb'));
/* 128000 */

console.log(sizeomatic.howManyBytes('125kb'));
/* 128000 */

console.log(sizeomatic.howManyBytes('125m'));
/* 131072000 */

console.log(sizeomatic.howManyBytes('125G'));
/* 134217728000 */
```

### getSize ###

Takes a JavaScript object and returns the approximates size in bytes of memory the object is consuming as an integer.

```javascript
var obj =
{
	b : true,
	n : 12345,
	s : "Hello!",
	a : [ "something", "wicked", "this", "way", "comes" ],
	o : { "everything" : "is awesome!" }
};

var size = sizeomatic.getSize(obj);
/* result: 130 (bytes) */

var rsize = sizeomatic.getSize(JSON.stringify(obj));
/* result: 228 (bytes) */
```

> Note that a serialized representation will of an object will return a larger value than the original object because it is being treated as a string.

### pretty ###

Takes an integer representation of a number of bytes and formats it to an appropriate size (precise up to three decimal places) suffixed with the appropriate size abbreviation.

```javascript
console.log(sizeomatic.pretty(125));
/* 125B */

console.log(sizeomatic.pretty(128950));
/* 125.928K */

console.log(sizeomatic.pretty(131672000));
/* 125.572M */

console.log(sizeomatic.pretty(139217728000));
/* 129.657G */
```

## Acknowledgments ##

I used [`sizeof`](https://github.com/lyroyce/sizeof/blob/master/lib/sizeof.js) as the basis for this module, tweaked it, and added what I wanted.

## Tests ##

If you happen to run the unit tests for `sizeomatic` and check the code coverage using [`istanbul`](https://github.com/gotwarlost/istanbul), you will encounter this [known "issue" with missing "else" changing branch percentages](https://github.com/gotwarlost/istanbul/issues/35) that I still think is a defect. Rest assured that all branching conditions have sufficient unit tests.
