<script>
	
	import util from './util.js'
	
	import { tweened } from 'svelte/motion';
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
	export let origin = {}
	export let state = false // observation

	const tween = ( init ) => tweened( init, { duration: duration , easing })

	const position = i => ((height / 4) * i) + (height/4)

	let anim = tween( 1 )

	function animate( state_ ) {
		anim.set( state_ ? 0 : 1 ) 
	}

	$: animate( state )


	$: rect = {
		width: width - (stroke * 2),
		height: (height * 0.8) - (stroke * 2),
		x: stroke,
		y: stroke
	}
	$: mask = {
		width: rect.width + (stroke),
		height: rect.height + (stroke ),
		x: rect.x - (stroke * 0.5),
		y: rect.y - (stroke * 0.5)
	}

	$: paths = [
		`M0 0 L${width/2} ${height * 0.5} L${width} 0`,
		`M0 ${height} L${width * 0.35} ${height * 0.5}`,
		`M${width} ${height} L${width * 0.65} ${height * 0.5}`

	]

	$: transform = {
		transform: `
			scale( 1 1 )
		`
	}
	// $: circle = {
	// 	cx: width/2,
	// 	cy: height/2,
	// 	r: (Math.min(width, height) / 2) - stroke
	// }
</script>


<defs>
	<mask id="mail-mask">
		<rect width="100%" height="100%" fill="black"/>
		<rect {...mask} fill="white" />
	</mask>
</defs>
<g mask="url(#mail-mask)" >
	<rect {...rect} {...strokes} />
	{#each paths as path}
		<path d={path} {...strokes} />
	{/each}
</g>