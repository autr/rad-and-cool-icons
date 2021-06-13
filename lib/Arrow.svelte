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
	export let origin 
	export let state // for outside observation
	const tween = ( init ) => tweened( init, { duration: duration , easing })

	let rotate = 0

	const size = 0.95
	$: circle = {
		cx: (width * size) - stroke,
		cy: height/2, 
		r: Math.max(width,height) * (1 - size), 
		...strokes
	}
</script>

<defs>
	<mask id="arrow-mask">
		<rect width="100%" height="100%" fill="white"/>
		<circle {...circle} fill="black" />
	</mask>
</defs>

<g style={`${origin}; transform: rotateZ(${parseInt(rotate * 90)}deg); translate3d(0, 0, 0);`}>
	<circle {...circle}  />
	<g mask="url(#arrow-mask)">
		<path d={`
			M${width/2} ${stroke}
			L${stroke} ${height/2}
			L${width/2} ${height-stroke}
		`} {...strokes} />
		<path d={`
			M${stroke} ${height/2}
			L${width-stroke} ${height/2}
		`} {...strokes} />
	</g>
</g>