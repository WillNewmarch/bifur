<p align="center">
  <img alt="Bifur" src="http://tolkiengateway.net/w/images/thumb/4/41/Andy_Smith_-_Bifur.jpg/250px-Andy_Smith_-_Bifur.jpg" width="250">
</p>

<h2 align="center">Bifur</h2>

<p align="center">
  Multi-threading for the masses!
</p>

<p align="center">
    <a href="https://github.com/WillNewmarch/bifur/blob/master/LICENSE"><img alt="Github License" src="https://img.shields.io/github/license/WillNewmarch/bifur"></a>
    <a href="https://GitHub.com/WillNewmarch/bifur/releases/"><img alt="GitHub release" src="https://img.shields.io/github/release/WillNewmarch/bifur"></a>
</p>

Accessible and understandable multi-threading that doesn’t complicate your codebase.

Not only is Bifur a kick-arse dwarf from The Hobbit. His name literally means _to divide into two branches or parts_. 

Bifur allows you to run code alongside other code so as not to block the main thread (i.e. cause the browser to lock up) when performing heavy operations!

There are two big hurdles when running code in parallel with web workers:
- Web Workers are fiddly and complicated to set up initially.
- Knowing when a particular request has returned from a Web Worker can be tricky.

Bifur does the hard work for you and allows you to pass in a function and an array of arguments, and returns you a promise that will resolve when your function is complete!

# Table of Contents

* [Compatibility](#compatibility)
* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
    * [Methods](#methods)
* [Additional Information](#additional-information)
    * [Heavier Examples](#heavier-examples)
    * [Why not just use Promises?](#why-not-just-use-Promises?)
    * [Future Features](#future-features)
    * [Future Improvements](#future-improvements)
* [Contributing](#contributing)
* [License](#license)

# Compatibility

Bifur is intended for browser use only and is compatible with all major browsers.

Check for specific browser compatibility here:
[https://caniuse.com/webworkers](https://caniuse.com/webworkers)

# Installation

Use the package manager [npm](https://www.npmjs.com/) to install bifur.

```bash
npm install bifur
```

# Usage

Firstly, import bifur into your environment

```javascript
import Bifur from "bifur";
```

From here on you can call `Bifur.run` which accepts two arguments, a `Function` and an `Array` respectively.

```javascript
Bifur.run(
    (a,b) => {
        return a + b;
    },
    [2,3]
);
```

The function should be self-contained as it will be run in a completely separate thread to your current code.

The array of arguments should align with the parameters that your function expects.

The `run` method will then return a `Promise` that resolves when the function has finished its calculations.

```javascript
Bifur.run(
    (a,b) => {
        return a + b;
    },
    [2,3]
).then(result => {
    console.log(result); // 5
})
```

OR

```javascript
const result = await Bifur.run(
    (a,b) => {
        return a + b;
    },
    [2,3]
);
// result = 5
```

# Documentation

Bifur can be used statically for ease and simplicity.

Bifur currently provides just one method, `run`.
## Methods

### `run`

```javascript
Bifur.run(func, array)
```

Runs the provided function asynchronously to the main thread, passing it the arguments supplied via the array provided.

### Arguments

[method] (Function): The method to be involved asynchronously to the main thread.

[arguments] (Array): The arguments to pass to the array. Note: this array will be spread to allow the function to have multiple parameters.

### Returns
(any): Returns the returned value of the function provided.

### Example:
```javascript
const result = await Bifur.run(
    (a,b) => {
        return a + b;
    },
    [2,3]
);
// result = 5
```

# Additional Information
## Heavier Examples

The following functionality, if run in browser, will lock up the UI for several seconds while computing. Paste it into the browser console to see for yourself.

```javascript
let fibonacci = (num) => { 
    if (num <= 1) return 1; 
    return fibonacci(num - 1) + fibonacci(num - 2); 
}
console.time('fibonacci');
fibonacci(42);
console.timeEnd('fibonacci');
```

When running this with Bifur, the UI will continue running as usual while this calculation is made on a separate thread! Implemented like so...

```javascript
const result = await Bifur.run(
    (num) => {
        let fibonacci = (num) => {
            if (num <= 1) return 1;
            return fibonacci(num - 1) + fibonacci(num - 2);
        }
        return fibonacci(num);
    },
    [42]
);
 
```
_Note that pasting this into your browser will not work unless you import Bifur!_

## Why not just use Promises?

To quote an excellent answer from our beloved StackOverflow:

```
Deferred/Promises and Web Workers address different needs:

- Deferred/promise are constructs to assign a reference to a result not yet available, and to organize code that runs once the result becomes available or a failure is returned.

- Web Workers perform actual work asynchronously (using operating system threads not processes - so they are relatively light weight).
```
Source: [https://stackoverflow.com/questions/20929508/web-workers-vs-promises#answers-header](https://stackoverflow.com/questions/20929508/web-workers-vs-promises#answers-header)

## Future Features
- Some sort of 'Register' function to persist a Worker, allowing for multiple uses of the same function without regenerating the worker, and allowing for the Worker to hold state if required.

## Future Improvements
- Test files could be TypeScript.
- Worker could be mocked in more detail.
- Tests could be run in a headless browser environment like Selenium.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License
[MIT](https://choosealicense.com/licenses/mit/)
