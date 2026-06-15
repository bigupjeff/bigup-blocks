<?php
namespace WebGuyJeff\Utility_Blocks;

/**
 * Admin Settings Handler.
 *
 * @package utility-blocks
 */


/**
 * Utility Blocks - Admin Settings.
 *
 * Hook into the WP admin area and add menu settings pages.
 */
class Settings {


	/**
	 * Class Variables.
	 *
	 * $admin_label - Menu label for the plugin.
	 * $page_slug   - page URI where the sub-menu will be.
	 * $group_name  - Option group ID which is set when registering settings for this page.
	 * $icon        - SVG Web Guy Jeff icon for the admin menu as a base64 string.
	 */
	public $admin_label = 'Utility Blocks';
	public $page_slug   = 'utility-blocks';
	public $group_name  = 'utility-blocks';
	private $parent_slug;

	/**
	 * Holds the WP_Post object for the add_meta_boxes callback.
	 */
	public $post_obj = '';


	/**
	 * Init the class by hooking into the admin interface.
	 *
	 * do_settings() is hooked in  to 'init' instead of 'admin_init' to support GraphQL.
	 */
	public function __construct() {
		$this->parent_slug = Settings_Parent::$page_slug;
	}


	/**
	 * Add admin menu entry to sidebar
	 */
	public function register_admin_menu() {

		add_submenu_page(
			$this->parent_slug,                      // parent_slug
			$this->admin_label . ' Settings',        // page_title
			$this->admin_label,                      // menu_title
			'manage_options',                        // capability
			$this->page_slug,                        // menu_slug
			array( &$this, 'create_settings_page' ), // function
			null,                                    // position
		);

	}


	/**
	 * Echo a link to this plugin's settings page.
	 */
	public function echo_plugin_settings_link() {
		?>
		<a href="/wp-admin/admin.php?page=<?php echo $this->page_slug; ?>">
			<?php echo $this->admin_label; ?> settings
		</a>
		<?php
	}


	/**
	 * Create Blocks Settings Page
	 */
	public function create_settings_page() {

		/* Get the active tab from the $_GET URL param. */
		$default_tab = null;
		$tab         = isset( $_GET['tab'] ) ? $_GET['tab'] : $default_tab;
		$slug        = $this->page_slug;
		?>

		<div class="wrap">
			<h1>
				<span class="dashicons-webguyjeff-logo" style="font-size: 2em; margin-right: 0.2em;"></span>
				<?php echo esc_html( get_admin_page_title() ); ?>
			</h1>

			<p>
				These settings control Utility Blocks features.
			</p>

			<?php settings_errors(); // Display the form save notices here. ?>

			<nav class="nav-tab-wrapper">
				<a
					href="?page=<?php echo $slug; ?>"
					class="nav-tab 
					<?php
					if ( $tab === null ) :
						?>
						nav-tab-active<?php endif; ?>"
				>
					Default Tab
				</a>
				<a
					href="?page=<?php echo $slug; ?>&tab=tab-2"
					class="nav-tab 
					<?php
					if ( $tab === 'tab-2' ) :
						?>
						nav-tab-active<?php endif; ?>"
				>
					Tab 2
				</a>
			</nav>

			<div class="tab-content">
			<?php
			switch ( $tab ) :
				case 'tab-2':
					Settings_Tab_Two::output_tab();
					break;
				default:
					Settings_Tab_One::output_tab();
					break;
			endswitch;
			?>
			</div>

		</div>

		<?php
	}
}
