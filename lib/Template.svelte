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
	const tween = ( init ) => tweened( init, { duration: duration , easing })

</script>


<defs>
	<mask id="template-mask">
	</mask>
</defs>

<g mask="url(#template-mask)" >
</g>