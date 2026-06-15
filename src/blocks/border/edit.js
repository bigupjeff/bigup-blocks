import { __ } from '@wordpress/i18n'
import { useBlockProps, useSettings, InspectorControls, InnerBlocks } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, SelectControl, ColorPalette, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import './border-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	const { attributes, setAttributes } = props

	const blockName = props.name

	const {
		variation,
		borderClassName,
		borderColour,
		borderWidth
	} = attributes

	const blockVariations = Object.values( wp.blocks.getBlockType( blockName ).variations )

	const blockProps = useBlockProps( {
		className: borderClassName,
		style: {
			"border-color": borderColour,
			"border-width": borderWidth,
			"--borderWidth": borderWidth
		}
	} )

	// Variation select control values.
	const variationOptions = []
	blockVariations.forEach( variation => variationOptions.push( { value: variation.name, label: variation.title } ) )

	// Changing block variation sets default variation attributes.
	const onChangeVariation = ( newVariation ) => {
		blockVariations.forEach( variation => {
			if ( newVariation === variation.name ) {
				setAttributes( {
					variation: newVariation,
					...variation.attributes
				} )
			}
		} )
	}

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<SelectControl
						label={ __( 'Select border', 'utility-blocks' ) }
						labelPosition="top"
						title={ __( 'Select border', 'utility-blocks' ) }
						value={ variation }
						options={ variationOptions }
						onChange={ ( value ) => onChangeVariation( value ) }
						__nextHasNoMarginBottom={ true }
					/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody>
						<PanelRow><h2>{ __( 'Border Settings', 'utility-blocks' ) }</h2></PanelRow>
						<PanelRow>{ __( 'Colour', 'utility-blocks' ) }</PanelRow>
						<ColorPalette
							value={ borderColour }
							colors={ [ ...useSettings( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { borderColour: value } ) }
						/>
						<PanelRow>{ __( 'Width', 'utility-blocks' ) }</PanelRow>
						<UnitControl
							value={ borderWidth }
							onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
							__next40pxDefaultSize
						/>
						<PanelRow>{ __( 'Colour', 'utility-blocks' ) }</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks />
			</div>
		</>
	)
}
