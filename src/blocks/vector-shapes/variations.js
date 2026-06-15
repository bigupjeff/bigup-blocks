import { __ } from '@wordpress/i18n'
import { Logo } from './svg'

const Variations = [
	{
		name: 'wave',
		title: __( 'Wave', 'utility-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'wave'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'wave'
		}
	},
	{
		name: 'squiggle',
		title: __( 'Squiggle', 'utility-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'squiggle'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'squiggle'
		}
	}
]

export { Variations }
