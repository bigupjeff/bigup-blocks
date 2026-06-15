import { useBlockProps } from '@wordpress/block-editor'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		svgSource,
		width,
		height
	} = attributes

	const blockProps = useBlockProps.save( {
		className: 'webguyjeff__inlineSVG',
		style: { width: width, height: height }
	} )

	return (
		<div
			{ ...blockProps }
			dangerouslySetInnerHTML={ { __html: svgSource } }
			data-line-width={ width }
			data-line-height={ height }
		/>
	)
}
