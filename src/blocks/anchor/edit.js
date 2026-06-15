/**
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody, PanelRow } from '@wordpress/components';

/**
 * Import local editor Styles.
 */
import './editor.scss';

/**
 * Edit function.
 *
 * This function describes the structure of the block in the context of the editor.
 *
 * @return {WPElement} Element to render.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Callback to update block attributes.
 * @param {boolean} isSelected - Is the block selected.
 * @param {string} clientId - Block client ID.
 * @param {string} attributes.anchorClasses - Anchor classnames.
 */
export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {

	const { url, openInNewTab, id } = attributes;
	const blockProps             = useBlockProps()

	/**
	 * Set block attributes with 'selected' state.
	 */
	const blockPropsSelected = useBlockProps( {
		className: 'selected',
	} );

	/**
	 * Flag to check if innerBlocks is populated.
	 */
	const hasInnerBlocks = () => {
		const thisBlock = wp.data
			.select('core/block-editor')
			.getBlock(clientId);
		if (thisBlock) {
			return !!thisBlock.innerBlocks.length;
		} else {
			return false;
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Anchor Settings', 'utility-blocks' ) }
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
							label='Open in new tab?'
							help={openInNewTab ? 'Yes' : 'No'}
							checked={openInNewTab}
							onChange={ ( newOpenInNewTab ) => setAttributes( { openInNewTab: newOpenInNewTab } ) }
						/>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={ __( 'URL' ) }
								help={ 'URL link to the target resource' }
								value={ url }
								onChange={ ( newUrl ) => setAttributes( { url: newUrl } ) }
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={ __( 'ID attribute' ) }
								help={ 'Element ID for specific styling or as a target location in the page' }
								value={ id }
								onChange={ ( newId ) => setAttributes( { id: newId } ) }
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{ isSelected && (
				<div { ...blockPropsSelected }>
					<a
						target={ openInNewTab ? '_blank' : '_self' }
						id={ id }
					>
						<InnerBlocks />
					</a>
				</div>
			) }

			{ !isSelected && (
				<div { ...blockProps }>
					<a
						target={ openInNewTab ? '_blank' : '_self' }
						id={ id }
					>
						{ !hasInnerBlocks() && (
							<span className="emptyWarning">
								{ __("Empty anchor block!", 'utility-blocks' ) }
							</span>
						) }
						<InnerBlocks />
					</a>
				</div>
			)}
		</>
	);
}
