import { __ } from '@wordpress/i18n'
import { useBlockProps, useSettings, InspectorControls } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, SelectControl, ColorPalette, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { Wave, Squiggle } from './svg'
import './vector-shapes-editor.scss'

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
		bottomColour,
		topColour,
		lineColor,
		lineVisible,
		lineWidth
	} = attributes

	const blockVariations = Object.values( wp.blocks.getBlockType( blockName ).variations )

	const blockProps = useBlockProps( {
		className: 'alignfull',
		style: {
			"--bottomColour": bottomColour,
			"--topColour": topColour,
			"--lineColor": lineColor,
			"--lineVisible": lineVisible,
			"--lineWidth": lineWidth
		}
	} )

	const blockDataProps = {
		"data-top-colour": bottomColour,
		"data-bottom-colour": topColour,
		"data-line-colour": lineColor,
		"data-line-visible": lineVisible,
		"data-line-width": lineWidth
	}

	// Variation select control values.
	const variationOptions = []
	blockVariations.forEach( variation => variationOptions.push( { value: variation.name, label: variation.title } ) )

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<SelectControl
						label={ __( 'Select vector', 'utility-blocks' ) }
						labelPosition="top"
						title={ __( 'Select vector', 'utility-blocks' ) }
						value={ variation }
						options={ variationOptions }
						onChange={ ( value ) => setAttributes( { variation: value } ) }
						__nextHasNoMarginBottom={ true }
					/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody
						title={ __( 'Colours', 'utility-blocks' ) }
						initialOpen={ true }
					>
						<PanelRow>{ __( 'Top', 'utility-blocks' ) }</PanelRow>
						<ColorPalette
							value={ topColour }
							colors={ [ ...useSettings( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { topColour: value } ) }
						/>
						<PanelRow>{ __( 'Bottom', 'utility-blocks' ) }</PanelRow>
						<ColorPalette
							value={ bottomColour }
							colors={ [ ...useSettings( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { bottomColour: value } ) }
						/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody
						title={ __( 'Line Settings', 'utility-blocks' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label='Show Line'
							help={ lineVisible ? __( 'Yes', 'utility-blocks' ) : __( 'No', 'utility-blocks' ) }
							checked={ lineVisible === 'visible' ? true : false }
							onChange={ ( value ) => setAttributes( { lineVisible: value ? 'visible' : 'hidden' } ) }
						/>
						<PanelRow>{ __( 'Width', 'utility-blocks' ) }</PanelRow>
						<UnitControl
							value={ lineWidth }
							onChange={ ( value ) => setAttributes( { lineWidth: value } ) }
							__next40pxDefaultSize
						/>
						<PanelRow>{ __( 'Colour', 'utility-blocks' ) }</PanelRow>
						<ColorPalette
							value={ lineColor }
							colors={ [ ...useSettings( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { lineColor: value } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div { ...blockProps }>
				{ variation === 'wave' && <Wave { ...blockDataProps }/> }
				{ variation === 'squiggle' && <Squiggle { ...blockDataProps }/> }
			</div>
		</>
	)
}
