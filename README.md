# Absolute paths for [webpack](http://webpack.github.io/)
`abspath-webpack-plugin` is a custom absolute path(s) provider for your webpack builds.

It helps you get rid of relative paths in your `require`s and `import`s.

# Installation
To install the latest stable version:

`npm install --save-dev abspath-webpack-plugin`

This assumes you are using [npm](https://www.npmjs.com/) as your package manager. The `abspath-webpack-plugin` requires [webpack](https://github.com/webpack/webpack)
as [`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies). Thus you are able to specify the required versions accurately.

# Usage
[Documentation: Using Plugins](https://webpack.github.io/docs/using-plugins.html)

##### Syntax / Config
```javascript
new AbsolutePathProviderPlugin(newRegEx, absolutePath);
```
`newRegEx` is the regular expression to be matched in the `require`d path and gets replaced with the `absolutePath` provided as the second argument.

You can also append path to the regex in your `require` statement. It automatically gets appended to the `absolutePath`.

##### Apply via webpack config
You need to use `abspath-webpack-plugin` with other plugins in your webpack configuration.
```javascript
var webpack = require('webpack');
var AbsolutePathProviderPlugin = require('abspath-webpack-plugin');

module.exports = {
  plugins: [
    new AbsolutePathProviderPlugin(
      /* regex */, /* absolute path to some dir */
    )
  ]
}
```

# Example
Let's see how can we use the plugin to simplify our `require` statements.

Here is your simple app structure, let's say.
```ruby
app/
+-- _webpack.config.js
+-- scripts/
    +-- accounts/
        +-- signup/
            +-- app.js
+-- components/
    +-- modal/
        +-- index.js
        +-- modal.js
    +-- message/
        +-- index.js
        +-- message.js
```

Now you need to use your modal and message components in `scripts/accounts/signup/app.js`. The usual way would be

###### app.js (earlier)
```javascript
var modal = require('./../../../components/modal');
var message = require('./../../../components/message');
```

That's not very efficient, right? Let's put `abspath-webpack-plugin` into play.

###### webpack.config.js
```javascript
var path = require('path');
var webpack = require('webpack');
var AbsolutePathProviderPlugin = require('abspath-webpack-plugin');

module.exports = {
  plugins: [
    new AbsolutePathProviderPlugin(
      /^@components/, path.resolve('./components')
    )
  ]
}
```

###### app.js (after webpack config)
```javascript
var modal = require('@components/modal');
var message = require('@components/message');
```

Or if you're using ES2015 syntax,

```javascript
import modal from '@components/modal'
import message from '@components/message'
```

# Contributing
We are open to, and grateful for, any contributions made by the community. You can contribute by:

* Reporting a bug.
* Suggesting a feature.
* Opening an issue to discuss improvements, theory or implementation.

If you are opening a PR, please attach the relevant issue with it. If it doesn't exist, please create one before you open a PR.

# License
MIT
