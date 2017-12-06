const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// We require the webpack package and the resolve functionality from the path package at the top of the file.
//
// The path library is a dependency of Webpack. It allows us to resolve file paths, as seen in lines above that read resolve(). Resolving a path is the act of providing a dedicated tool (like the path library) the name of a directory or file, and relying upon it to find the exact path.
//
// This allows us to say things like resolve('file_name') instead of ./../much/longer/filepath/to/the/file_name.js. It's essentially a shortcut, so we don't have to meticulously list the exact file path to each directory or file we need. As you can imagine, this can also prevent errors.

module.exports = {
  entry: [
    "react-hot-loader/patch",
    // activates hot module replacement.
    "webpack-dev-server/client?http://localhost:8080",
  //  connects to the necessary endpoint (our project will be served at localhost:8080)

    "webpack/hot/only-dev-server",
    // instructs Webpack to bundle our code, then provide it to the development server if/when bundling is successful
    resolve(__dirname, 'src', 'index.jsx')
//     Within the module, we declare an entry specifying the file where the bundling process starts. Similar to the main.ts file we used in Angular, we specify that the entry point is index.jsx.
//
// An entry point is the file responsible for instructing the module bundler how to build the application. The browser loads this file first. Similar to a jQuery selector, our React app needs a place to reference in the DOM and manipulate as it renders our code.
  ],
  output: {
    filename: 'app.bundle.js',
    // determines the name of the file containing our concatenated code. We've named ours app.bundle.js. This exact name isn't required, but it's a standard naming convention other developers will easily understand.

    path: resolve(__dirname, 'build'),
  //  points it to a directory called build. The __dirname argument refers to the directory this webpack.config.js file is located in. When the file path is resolved, we provide it the location of this file's directory (with the __dirname shortcut), and the name of the directory we're trying to locate (build), and the path library resolves the exact file path for us.
    publicPath: '/'
    // This specifies where hot-reloaded modules should be loaded. This is actually the default publicPath configuration for a single page application like ours. That means HMR would technically work without this line. However, we explicitly include it to denote we're actively choosing the default path, /
  },
  resolve: {
    extensions: [".js", ".jsx"]
    // The resolve option instructs Webpack to look for files with specific extensions. By specifying the extensions here, we can later import files in our project without explicitly listing an extension. (ie,: require(myComponent) instead of: require(myComponent.jsx)). This is certainly not mandatory, but a helpful feature.
  },
  devtool: '#source-map',
  // tells Webpack how to communicate errors. The #source-map option tells Webpack to reference line numbers from our component files, not the big app.bundle.js build file. This means error messages point us to our own source code. This is not a necessary feature, just a convenient one.

  devServer: {
    hot: true,
    // enables HMR on the local server.
    contentBase: resolve(__dirname, 'build'),
    // points to the source code it will serve in the browser.
    publicPath: '/'
    // specifies where hot-reloaded modules should be loaded. This should always match the publicPath option in output
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        // takes a RegEx expression indicating which files the loader should transform
        loader: "babel-loader",
        // details which loader tool will be responsible for transforming these files.
        exclude: /node_modules/,
        // outlines which files, if any, should not be transformed. We don't need to transform our npm dependencies, so we list node_modules here.
        options: {
          presets: [
            ["es2015", {"modules": false}],
            "react"
            // tells Babel what kind of project we’re working with (React), and what version of JavaScript we want our code transpiled to (ES5).

            // modules: false to presets. Babel organizes code into format called commonJS by default. But this format doesn't support hot module replacement. This configuration turns off commonJS formatting
          ],
          plugins: [
            "react-hot-loader/babel"
          ]
          // Hey Webpack, use this babel-loadertool to transpile our JSX into ES5 in this React project. You can find the JSX in files with a .jsx extension. But ignore .jsx files in the nodemodules directory.
        }
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enables HMR globally
    new webpack.NamedModulesPlugin(),
    // prints HMR status updates to the console. These are both additional, helpful plugins from the react-hot-loader/babel plugin we've just added to our module rules
    new HtmlWebpackPlugin({
      template: 'template.ejs'
      // tells the plugin which file it should use as a template for creating the index.html file in our build directory
      appMountId: 'react-app-root',
      // provides the name of our HTML's root DOM node.
      title: 'queue tab',
      // sets the text our index's <title> tags.
      filename: resolve(__dirname, 'build', 'index.html'),
      // s the location we'd like to place our programmatically-generated index.html
    }),
  ]

};
