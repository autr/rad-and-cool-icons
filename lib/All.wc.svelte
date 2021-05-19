<svelte:options tag="rad-cool-icons" />

<script>
	import LightDark from './LightDark.svelte'
	import Burger from './Burger.svelte'
	import Mail from './Mail.svelte'
	import Arrow from './Arrow.svelte'
	import * as easingFunctions from 'svelte/easing';
	

	let class_ = ""
	export { class_ as class } 
	let style_ = ""
	export { style_ as style }

	export let width = 200
	export let height = 200
	export let stroke = 2
	export let easing = "cubicOut"
	export let color = "#efefef"
	export let duration = 1000 
	export let hover = false
	export let misc = {}
	export let type = 'light-dark'
	export let state = false


	let components = {
		'light-dark': LightDark,
		'burger': Burger,
		'mail': Mail,
		'arrow': Arrow
	}



	$: center = ({ x: width/2, y: height/2 })
	$: browser = typeof window !== "undefined" && typeof window.document !== "undefined"
	$: strokes = { 
		'stroke-width': stroke, 
		'fill': 'transparent', 
		'stroke': color,
		'vector-effect': 'non-scaling-stroke'
	}
	const origin = 'transform-box: fill-box;transform-origin: center'


	const DEBUG = false

</script>
<svelte:component 
	this={components[type]} 
	{...$$props} 
	{...misc} 
	{strokes} 
	easing={easingFunctions[easing]} 
	{browser} 
	{center}
	{origin}
	style={ DEBUG ? 'border:1px solid red' : ''}
	bind:state={state} />

{#if DEBUG}<div>{state}</div>{/if}