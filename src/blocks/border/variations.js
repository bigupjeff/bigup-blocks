import { __ } from '@wordpress/i18n'
import { Logo } from './svg'

const Variations = [
	{
		name: 'wavy',
		title: __( 'Wavy', 'utility-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'wavy',
			'borderClassName': 'borderWavy'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'wavy'
		}
	},
	{
		name: 'stamp',
		title: __( 'Stamp', 'utility-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'stamp',
			'borderClassName': 'borderStamp'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'stamp'
		}
	},
	{
		name: 'splat',
		title: __( 'Splat', 'utility-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'splat',
			'borderClassName': 'borderSplat'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'splat'
		}
	}
]

export { Variations }
