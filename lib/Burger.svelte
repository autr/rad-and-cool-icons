<script>
	
	import util from './util.js'
	import { dark } from './stores.js'
	import { tweened } from 'svelte/motion'
	import { onMount } from 'svelte'

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	export let width = 200
	export let height = 200
	export let stroke = 2
	export let duration = 1000
	export let hover = false
	export let strokes = {}
	export let easing = e => e
	export let browser = false
	export let center = { x: 100, y: 100 }
	export let space = 0.7
	export let origin 
	export let state = false // observation

	const tween = ( init ) => tweened( init, { duration: duration , easing })
	
	const position = i => parseInt( ((height / 4) * i) + (height/4) ) - 0.5

	$: mask = {
		cx: width/2,
		cy: height/2,
		r: (Math.min(width, height) / 2) * space
	}
	$: circle = {
		cx: width/2,
		cy: height/2,
		r: (Math.min(width, height) / 2) - stroke
	}

	$: transform = {
		transform: `scale( ${$anim} 1 )`
	}

	let anim = tween( 1 )

	function animate( state_ ) {
		anim.set( state_ ? 0 : 1 ) 
	}

	$: animate( state )
</script>


<defs>
	<mask id="burger-mask-mask">
		<rect width="100%" height="100%" fill="black"/>
		<circle {...mask} fill="white" />
	</mask>
</defs>
<circle {...circle}  {...strokes} />
<g mask="url(#burger-mask-mask)" {...transform} style={origin}>
	{#each (new Array(3)) as n, i}
		<path d="M0 {position(i)} L{width} {position(i)}" {...strokes} />
	{/each}
</g>