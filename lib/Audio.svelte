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
	export let origin 
	export let state // for outside observation

	export let thick = 0.3333



	$: rect = {
		width: width * thick,
		height,
		y: 0,
		x: 0
	}

</script>

<defs>
</defs>
{#if state}
	<path d={`
		${util.describe_arc(width/2,height/2,Math.max(width,height)*0.5,20, 160)}
	`} {...strokes} />
	<path d={`
		${util.describe_arc(width/2,height/2,Math.max(width,height)*0.3,20, 160)}
	`} {...strokes} />
{:else}
	<g>
		<path d={`
			M0 0
			L${width} ${height}
		`} {...strokes} />
		<path d={`
			M0 ${height}
			L${width} 0
		`} {...strokes} />
	</g>
{/if}
<g>
	<path style={origin} transform="scale( 1 0.7 )" d={`
		M0 ${height/2}
		L${width/2} 0
		L${width/2} ${height}
		z
	`} {...strokes} />
</g>