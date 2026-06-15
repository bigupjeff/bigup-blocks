<?php
namespace WebGuyJeff\Utility_Blocks;

/**
 * Utility Blocks - Initialisation.
 *
 * Setup styles and functionality for this plugin.
 *
 * @package   utility-blocks
 */

class Init {

	/**
	 * Setup the plugin by registering all hooks.
	 */
	public function setup() {
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts_and_styles' ), 10, 0 );
		add_action( 'enqueue_block_assets', array( $this, 'editor_scripts_and_styles' ), 10, 0 );
		add_action( 'enqueue_block_assets', array( $this, 'frontend_scripts_and_styles' ), 10, 0 );
		add_action( 'init', array( new Blocks(), 'register_all' ), 10, 0 );
	}


	/**
	 * Register and enqueue admin scripts and styles.
	 */
	public function admin_scripts_and_styles() {
		if ( ! wp_script_is( 'webguyjeff_icons', 'registered' ) ) {
			wp_register_style(
				'webguyjeff_icons',
				UTILITYBLOCKS_URL . 'dashicons/css/webguyjeff-icons.css',
				array(),
				filemtime( UTILITYBLOCKS_PATH . 'dashicons/css/webguyjeff-icons.css' ),
				'all'
			);
		}
		if ( ! wp_script_is( 'webguyjeff_icons', 'enqueued' ) ) {
			wp_enqueue_style( 'webguyjeff_icons' );
		}

		global $pagenow;
		$slug = plugin_basename( UTILITYBLOCKS_PATH );
		if ( isset( $_GET['page'] ) && $_GET['page'] === $slug ) {
			// We're now on the admin page of this plugin.
		}
	}

	/**
	 * Register and enqueue editor scripts and styles.
	 */
	public function editor_scripts_and_styles() {
		$editor_asset_path = UTILITYBLOCKS_PATH . 'build/js/utility-blocks-editor.asset.php';
		if ( ! file_exists( $editor_asset_path ) ) {
			throw new Error( 'You need to run `npm start` or `npm run build` for the plugin first.' );
		} else {
			$assets = require $editor_asset_path;
			wp_enqueue_script( 'utility-blocks-editor_js', UTILITYBLOCKS_URL . 'build/js/utility-blocks-editor.js', $assets['dependencies'], filemtime( UTILITYBLOCKS_PATH . 'build/js/utility-blocks-editor.js' ), true );
		}
		if ( has_block( 'utility-blocks/flippable-cards' ) || has_block( 'utility-blocks/hero-punch' ) ) {
			wp_enqueue_script( 'gsap', UTILITYBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', UTILITYBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
	}

	/**
	 * Register and enqueue frontend scripts and styles.
	 */
	public function frontend_scripts_and_styles() {
		if ( has_block( 'utility-blocks/hero-punch' ) ) {
			wp_enqueue_script( 'gsap', UTILITYBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', UTILITYBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
		if ( has_block( 'utility-blocks/flippable-cards' ) ) {
			wp_enqueue_script( 'gsap', UTILITYBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', UTILITYBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( UTILITYBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
	}
}
