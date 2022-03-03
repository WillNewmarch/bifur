var path = require('path');

module.exports = {
    devtool: "source-map",
    entry: {
		index: './dist/Bifur.js'
	},
    optimization: {
        minimize: false
    },
    output: {
        filename: 'index.js',
        library: 'Bifur',
        libraryExport: "default",
        libraryTarget: 'umd',
        path: path.resolve( __dirname, 'bundle'),
        
    },
    mode: 'production',
    resolve: {
        extensions: ["", ".js"]
    },
    // watch: true
}