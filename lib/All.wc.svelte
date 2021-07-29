<svelte:options tag="rad-cool-icons" />

<script>
	import * as easingFunctions from 'svelte/easing'

	import LightDark from './LightDark.svelte'
	import Burger from './Burger.svelte'
	import Mail from './Mail.svelte'
	import Arrow from './Arrow.svelte'
	import PlayPause from './PlayPause.svelte'
	import Audio from './Audio.svelte'
	import Randomise from './Randomise.svelte'
	import Custom from './Custom.svelte' 
	

	let class_ = ""
	export { class_ as class } 
	let style_ = ""
	export { style_ as style }

	// core

	export let width = 200
	export let height = 200
	export let stroke = 2
	export let color = "#efefef"

	// extra stuff

	export let easing = "cubicOut"
	export let duration = 1000 
	export let hover = false
	export let misc = {}
	export let type = 'custom'
	export let state = true
	export let id = 'unique-' + parseInt(Math.random() * 1000)

	let components = {
		'light-dark': LightDark,
		'burger': Burger,
		'mail': Mail,
		'arrow': Arrow,
		'play-pause': PlayPause, 
		'audio': Audio,
		'randomise': Randomise,
		'custom': Custom
	}

	export let line = (x1, y1, x2, y2) => {
	    const args = {x1,y2,x2,y2}
	    return `<line ${Object.keys(args).map( a => `${a}="${args[a]}"`).join(' ')} />`
	}


	$: center = ({ x: width/2, y: height/2 })
	$: browser = typeof window !== "undefined" && typeof window.document !== "undefined"
	$: strokes = { 
		'stroke-width': stroke, 
		'fill': 'transparent', 
		'stroke': color,
		'vector-effect': 'non-scaling-stroke'
	}
	const origin = 'transform-box: fill-box;transform-origin: center center;'


	const DEBUG = false

	$: w = parseInt( width )
	$: h = parseInt( height )

</script>
<svg 
	xmlns="http://www.w3.org/2000/svg" 
	xmlns:xlink="http://www.w3.org/1999/xlink"
	on:click={ e => state = !state }
	width={ w + (stroke*2)}
	height={h + (stroke*2)}
	alt={type}
	title={type}
	class={class_ + ' rad-and-cool ' + type + ' '}
	style={style_}>
	<g transform="translate( {stroke}, {stroke} )">
		<svelte:component 
			this={components[type]} 
			{...$$props} 
			{...misc} 
			{strokes} 
			easing={easingFunctions[easing]} 
			{browser} 
			{center}
			{origin}
			width={w}
			height={h}
			style={ DEBUG ? 'border:1px solid red' : ''}
			bind:state={state}>
			<slot />
		</svelte:component>
	</g>
</svg>

{#if DEBUG}<div>{state}</div>{/if}