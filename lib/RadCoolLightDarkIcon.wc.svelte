<svelte:options tag="rad-cool-light-dark-icon" />

<script>
	
	import { tweened } from 'svelte/motion';
	import * as easingFunctions from 'svelte/easing';
	
	const center = e => ({ x: width/2, y: height/2 })
	
	function vec2_from_angle(angle, dist) {
		const {x,y} = center()
		return {
			x: Math.cos(angle * Math.PI / 180.0) * dist + x,
			y: Math.sin(angle * Math.PI / 180.0) * dist + y
		}
	}
	
	function circle( radius, points ) {
		let d = 'M'
		for( let i = 0; i < points; i++) {
			const angle = ((360 / points) * i)
			console.log(angle, i) 
			const p = vec2_from_angle( angle, radius)
			if (i > 0) d += 'L'
			d += `${p.x} ${p.y} `
		}
		d += 'Z'
		return d
	}
	
	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	export let amount = 10
	export let width = 200
	export let height = 200
	export let stroke = 2
	export let rays = 0.2
	export let space = 0.1
	export let dark = false
	export let duration = 1000
	export let offset = { x: 0.6, y: 0.4, r: 0.85 }
	export let end = { x: 1, y: 0, r: 0.5 }
	export let easing = "cubicOut"
	export let color = "#efefef"
	
	import { onMount } from 'svelte'
	
	let motion_x = tweened( offset.x, { duration: duration , easing: easingFunctions[easing] })
	let motion_y = tweened( offset.y, { duration: duration , easing: easingFunctions[easing] })
	let motion_r = tweened( offset.r, { duration: duration, easing: easingFunctions[easing] })
	let motion_shrink = tweened( 1, { duration, easing: easingFunctions[easing] })
	let motion_rays = tweened( 0, { duration, easing: easingFunctions[easing] })
	
	function update(dark_) {
		if (dark) {
			motion_x.set( offset.x )
			motion_y.set( offset.y )
			motion_r.set( offset.r )
			motion_shrink.set( 1 )
			motion_rays.set( 0 )
		} else {
			motion_x.set( end.x  )
			motion_y.set( end.y )
			motion_r.set( end.r )
			motion_shrink.set( 1 - space - rays )
			motion_rays.set( 1 )
		}
	}
	let ray_ds = []
	$: update( dark )
	
	$: cresent = {
			cx: $motion_x * width,
			cy: $motion_y * height,
			r: (( Math.min(width, height) / 2 )  * $motion_r) - stroke
	}
	
	$: main = {
		cx: width/2,
		cy: height/2,
		r: ( ( Math.min(width, height) / 2 ) * $motion_shrink ) - stroke
	}
	
	$: gen( rays, amount, $motion_rays ) 
	
	$: strokes = { 'stroke-width': stroke, fill: 'transparent', stroke: color }
	
	function gen( rays_, amount_, motion_ ) {
		let neu = []
		for( let i = 0; i < amount_; i++ ) {
			const angle = (360/amount_) * i
			const r = Math.min(width,height) / 2
			const anim = 1 - (rays * motion_)
			const a = vec2_from_angle( angle, anim * r )
			const b = vec2_from_angle( angle, 1 * r )
			const d = `M${a.x} ${a.y} L${b.x} ${b.y}`
			neu.push( d )
		}
		ray_ds = neu
	}
	

	function onClick( e ) {
		dark = !dark
	}
</script>


<svg 
	id="coollightdarkicon"
	class:dark={dark}
	class:light={!dark}
	{width} 
	{height} 
	class={class_}
	style={style_}
	on:click={ onClick }>{dark ? 'dark' : 'light'}>
	<defs>
		<mask id="coollightdarkicon-mask-cresent">
			<rect width="100%" height="100%" fill="white"/>
			<circle {...cresent} fill="black" />
		</mask>
		<mask id="coollightdarkicon-mask-circle">
			<circle {...main} r={main.r + stroke} fill="white"/>
		</mask>
	</defs>
	<g id="coollightdarkicon-icon" >
		{#each new Array( amount ) as null_, idx }
			<path d={ray_ds[idx]} {...strokes} />
		{/each}
		<g mask="url(#coollightdarkicon-mask-circle)">
			<g mask="url(#coollightdarkicon-mask-cresent)" >
				<circle {...main} r={main.r + (stroke / 2)} {...strokes}  />
				<circle {...cresent} r={cresent.r + (stroke / 2)} {...strokes}  />
			</g>
		</g>
	</g>
</svg>
