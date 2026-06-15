<?php
namespace WebGuyJeff\Utility_Blocks;

/**
 * Plugin Name: Utility Blocks
 * Plugin URI: https://github.com/webguyjeff/utility-blocks
 * Description: A collection of useful Gutenberg blocks to extend WordPress editing capabilities.
 * Version: 0.0.2
 * Author: Web Guy Jeff
 * Author URI: https://webguyjeff.com
 * License: GPL3
 *
 * @package utility-blocks
 */

// Set global constants.
define( 'UTILITYBLOCKS_DEBUG', defined( 'WP_DEBUG' ) && WP_DEBUG === true );
define( 'UTILITYBLOCKS_PATH', trailingslashit( __DIR__ ) );
define( 'UTILITYBLOCKS_URL', trailingslashit( get_site_url( null, strstr( __DIR__, '/wp-content/' ) ) ) );

// Register namespaced autoloader.
$namespace = 'WebGuyJeff\\Utility_Blocks\\';
$root      = UTILITYBLOCKS_PATH . 'classes/';
require_once $root . 'autoload.php';

// Setup the plugin.
$Init = new Init();
$Init->setup();
