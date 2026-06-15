import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { ToggleControl, PanelBody, SelectControl } from '@wordpress/components'
import { useState } from '@wordpress/element'
import {
	Fist,
	GrabhandLeft,
	GrabhandRight,
	MeToon,
	Star
} from './svg'

const template = [
	[ 'core/group',
		{
			lock: { remove:true, move:true },
			className: 'copy',
			style: {
				spacing: {
					padding: {
						top: 'var:preset|spacing|50',
						bottom: 'var:preset|spacing|50',
						left: 'var:preset|spacing|50',
						right: 'var:preset|spacing|50'
					}
				},
				margin: { top: '0',bottom: '0'},
				border: { width: '1px', radius: '1em' }
			},
			topColour: 'wgj-fg-alt',
			layout: { type: 'constrained', contentSize: '30em', wideSize: '30em' }
		},
		[
			[ 'core/heading', { level: 1, content: __( 'Title', 'utility-blocks' ) } ],
			[ 'core/paragraph', { content: __( 'Some awesome content to alert the masses of this awesome thing!', 'utility-blocks' ) } ],
			[ 'core/buttons', { layout: { type: 'flex', justifyContent: 'center' } },
				[
					[ 'core/button', { text: __( 'Do button stuff', 'utility-blocks' )	} ]
				]
			]
		]
	]
]

/**
 * Render inspector controls for the block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
const HTMLParentControls = ( { tagName, onSelectTagName } ) => {
	return (
		<InspectorControls group='advanced'>
			<SelectControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'HTML element' ) }
				options={ [
					{ label: __( 'Default (<div>)' ), value: 'div' },
					{ label: '<header>', value: 'header' },
					{ label: '<main>', value: 'main' },
					{ label: '<section>', value: 'section' },
					{ label: '<article>', value: 'article' },
					{ label: '<aside>', value: 'aside' },
					{ label: '<footer>', value: 'footer' },
				] }
				value={ tagName }
				onChange={ onSelectTagName }
			/>
		</InspectorControls>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ animate, setAnimate ] = useState( true )
	const blockProps = useBlockProps( { className: 'punch' } )
	const { tagName: TagName = 'div' } = attributes;
	
	return (
		<>
			<HTMLParentControls
				tagName={ TagName }
				onSelectTagName={ ( value ) =>
					setAttributes( { tagName: value } )
				}
			/>

			<InspectorControls>
				<PanelBody title={ __( 'Hero Punch Settings' ) }>
					<ToggleControl
						label='Enable Animation'
						help={animate ? 'Yes' : 'No'}
						checked={animate}
						onChange={ ( newAnimate ) => setAnimate( newAnimate ) }
					/>
					{ animate === true && (
						<span>
							{ 'Here are more animation settings' }
						</span>
					) }
				</PanelBody>
			</InspectorControls>

			<TagName {...blockProps}>
				<div className='scrollTrigger_parent'>
					<div className='scrollTrigger_child'>
						<div className='sectionGrid_parent'>
							<div className='sectionGrid_child'>
								<div className='contentWrapper'>
									<div className='styledBox'>
										<div className='styledBox_pinToTop'>
											<GrabhandLeft />
											<GrabhandRight />
											<div className='star star-2'>
												<Star />
											</div>
										</div>
										<InnerBlocks
											template={ template }
										/>
									</div>
									<div className='contentWrapper_pinToRight'>
										<MeToon />
										<div className='star star-1'>
											<Star />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='fist_container'>
					<Fist />
				</div>
			</TagName>
		</>
	)
}
