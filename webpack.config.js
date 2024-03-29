var ResolveTypeScriptPlugin = require("resolve-typescript-plugin");
var path = require('path');

module.exports = {
    devtool: "source-map",
    entry: {
		index: './src/Bifur.ts'
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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    resolve: {
        extensions: ["", ".ts", ".js"],
        plugins: [new ResolveTypeScriptPlugin()]
    }
}