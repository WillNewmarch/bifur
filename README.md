<p align="center">
  <img alt="Bifur" src="http://tolkiengateway.net/w/images/thumb/4/41/Andy_Smith_-_Bifur.jpg/250px-Andy_Smith_-_Bifur.jpg" width="250">
</p>

<h2 align="center">Bifur</h2>

<p align="center">
  Multi-threading for the masses!
</p>

<p align="center">
    <a href="https://github.com/WillNewmarch/bifur/blob/master/LICENSE"><img alt="Github License" src="https://img.shields.io/github/license/WillNewmarch/bifur.svg"></a>
    <a href="https://GitHub.com/WillNewmarch/bifur/releases/"><img alt="GitHub release" src="https://img.shields.io/github/release/WillNewmarch/bifur.svg"></a>
</p>

Bifur is a JavaScript library providing accessible and understandable multi-threading functionality that doesn’t ccomplicate your codebase.

Bifur is intended for browser use only. It also assumes that the `Window` interface and Web API `Blob` are available in your browser environment.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install bifur.

```bash
npm install bifur
```

## Usage

Firstly, import bifur into your environment

```javascript
import "bifur";
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

## Heavier Examples

The following functionality, if run in browser, will lock up the UI for several seconds while computing. Paste it into the browser console to see for yourself.

```javascript
let fibonacci = (num) => { if (num <= 1) return 1; return fibonacci(num - 1) + fibonacci(num - 2); }
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)