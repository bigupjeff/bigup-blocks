const path = require( 'path' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
// @wordpress/scripts config.
const wordpressConfig = require( '@wordpress/scripts/config/webpack.config' )

// See svgo.config.js to configure SVG manipulation.

module.exports = {
	...wordpressConfig,
	entry: {
		// @wordpress/scripts helper which generates entry points from any '**/block.json' in 'src'.
		...wordpressConfig.entry(),
		// 'example/output': './path/to/dir/entrypoint.js',
		'js/bigup-blocks-editor': path.join( __dirname, '/src/js/bigup-blocks-editor' ),
		'css/bigup-blocks-common-styles': path.join( __dirname, '/src/css/bigup-blocks-common-styles' ),
		'third-party/js/gsap.min': path.join( __dirname, '/node_modules/gsap/dist/gsap.min' ),
		'third-party/js/ScrollTrigger.min': path.join( __dirname, '/node_modules/gsap/dist/ScrollTrigger.min' ),
	},
	plugins: [
		...wordpressConfig.plugins,
		new BrowserSyncPlugin( {
			proxy: 'localhost:8001', // Live WordPress site. Using IP breaks it.
			ui: { port: 3001 }, // BrowserSync UI.
			port: 3000, // Dev port on localhost.
			logLevel: 'debug',
			reload: false, // false = webpack handles reloads (not sure if this works with files option).
			browser: "google-chrome-stable",
			files: [
				'src/**',
				'classes/**',
				'**/**.json'
			]
		} )
	]
}
