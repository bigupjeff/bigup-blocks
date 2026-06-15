import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Tumbleweed
} from './svg'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const template = [
	[ 'utility-blocks/flippable-card' ],
	[ 'utility-blocks/flippable-card' ],
	[ 'utility-blocks/flippable-card' ]
]

export default function Edit() {

	const blockProps = useBlockProps( {
        className: 'flippableCards',
    } )

	return (
		<div { ...blockProps }>
			<div className='rollByAnimation_container'>
				<div className='flippableCards_container'>
					<InnerBlocks
						template={ template }
					/>
				</div>
				<Tumbleweed />
			</div>
		</div>
	)
}
