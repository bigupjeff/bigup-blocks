<?php
/**
 * Web Guy Jeff - Class autoload by namesapce.
 *
 * Sub-directories are searched recursively.
 * Classes are denoted by the suffix .class.php.
 *
 * @param string $full_classname A fully-qualified class name e.g. 'Brand\\Project\\Class'.
 * @param string $namespace The namespace e.g. 'Brand\\Project\\'.
 * @param string $root Directory to recursively search.
 */

spl_autoload_register(
	function ( $full_classname ) use ( $namespace, $root ) {

		if ( strpos( $full_classname, $namespace ) !== 0 ) {
			return;
		}

		$requested = substr( $full_classname, strlen( $namespace ) );
		$requested = strtolower( str_replace( '_', '-', ltrim( $requested, '\\' ) ) ) . '.class.php';

		/*
		 * Build class maps once per request to avoid recursively walking the filesystem for every
		 * class load. The fqcn map is collision-safe across subdirectories that contain files with
		 * the same basename.
		 */
		static $fqcn_map = null;
		static $file_map = null;
		if ( null === $fqcn_map ) {
			$fqcn_map = array();
			$file_map = array();

			foreach ( new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $root ) ) as $file ) {
				if ( ! $file->isFile() || ! str_ends_with( $file->getFilename(), '.class.php' ) ) {
					continue;
				}

				$path = $file->getPathname();
				$name = $file->getFilename();

				// Backward-compatible fallback map for legacy flat naming.
				if ( ! isset( $file_map[ $name ] ) ) {
					$file_map[ $name ] = $path;
				}

				/*
				 * Canonical map key is derived from relative path.
				 * Example: classes/api/foo.class.php => Api\Foo => api/foo.class.php key.
				 */
				$relative = substr( $path, strlen( $root ) );
				$relative = str_replace( DIRECTORY_SEPARATOR, '/', $relative );
				$relative = preg_replace( '/\.class\.php$/', '', $relative );
				$relative = str_replace( array( '/', '-' ), array( '_', '_' ), $relative );
				$fqcn_map[ strtolower( str_replace( '_', '-', $relative ) ) . '.class.php' ] = $path;
			}
		}

		if ( isset( $fqcn_map[ $requested ] ) ) {
			include_once $fqcn_map[ $requested ];
			return;
		}

		if ( isset( $file_map[ $requested ] ) ) {
			include_once $file_map[ $requested ];
		}
	}
);
