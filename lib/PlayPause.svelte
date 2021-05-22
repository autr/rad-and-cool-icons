<script>
	
	import util from './util.js'
	import { dark } from './stores.js'
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

	$: bit = ((stroke%2)/2)
	$: rect = {
		width: parseInt(width * thick),
		height,
		y: bit,
		x: bit
	}

</script>


<defs>
</defs>
{#if state}
	<g>
		<rect {...rect} {...strokes} />
		<rect {...rect} {...strokes} x={ width - parseInt(width * thick) + bit } />
	</g>
{:else}
	<g>
		<path d={`
			M0 0 
			L${width} ${height/2}
			L0 ${height} 
			z
		`} {...strokes} />
	</g>
{/if}