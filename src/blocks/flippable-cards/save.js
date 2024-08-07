import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Tumbleweed
} from './svg'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {

    const blockProps = useBlockProps.save( {
        className: 'flippableCards',
    } )

	return (
		<div { ...blockProps }>
			<div className='rollByAnimation_container'>
				<div className='flippableCards_container'>
					<InnerBlocks.Content />
				</div>
				<Tumbleweed />
			</div>
		</div>
	)
}
