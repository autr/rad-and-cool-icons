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
	export let state = false
	export let id



	// custom

	
	export let storage = true
	export let amount = 10
	export let rays = 0.2
	export let space = 0.1
	export let offset = { x: 0.6, y: 0.4, r: 0.85 }
	export let end = { x: 1, y: 0, r: 0.5 }
	export let spin = 1


	const sys = e => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || false

	const darkKey = browser ? window.location.host + '-darkmode' : undefined

	function initDark() {
		if (!storage) return false
		let out
		try {
			out = browser ? eval( window.localStorage.getItem( darkKey ) ) : undefined
		} catch( err) {}
		if ( browser && out != true && out != false ) out = sys()

		if ( browser ) {
			const link = document.querySelector('link#favicon')
			link.href = `/favicon-${ sys() ? 'dark' : 'light' }.ico`
		}

		console.log(`🌖🌞  loading dark mode: ${out}`)
		return out
	}

	let inited = false

	if (browser) {
		$dark = initDark() 
		state = $dark
	}

	onMount( async e => {
		inited = true
	})

	let updating = false

	function onDarkChange( dark_ ) {

		if (browser && storage) {
			if (inited) {
				if (sys() === $dark) {
					console.log(`🌖🌞  clearing localStorage to system default: ${$dark}`)
					window.localStorage.removeItem( darkKey )
				} else {
					console.log(`🌖🌞  overriding dark mode with localStorage: ${$dark}`)
					window.localStorage.setItem( darkKey, $dark )
				}
			}
			if (!updating) state = dark_

		}
	}
	function clearDark() {
		if (browser && storage) window.localStorage.removeItem( darkKey )
	}

	$: onDarkChange( $dark )

	function onStateChange( state_ ) {
		updating = true
		$dark = state_
		updating = true
	}

	$: onStateChange( state )


	
	let motion_x = tweened( offset.x, { duration: duration , easing })
	let motion_y = tweened( offset.y, { duration: duration , easing })
	let motion_r = tweened( offset.r, { duration: duration, easing })
	let motion_shrink = tweened( 1, { duration, easing })
	let motion_rays = tweened( 0, { duration, easing })
	
	function update(dark_) {
		if ($dark) {
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
	$: update( $dark )

	$: rotate = {
		style: `${origin}; transform: rotateZ(${$motion_rays * ((360/amount)*spin)}deg);`
	}
	
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
	
	
	function gen( rays_, amount_, motion_ ) {
		let neu = []
		for( let i = 0; i < amount_; i++ ) {
			const angle = (360/amount_) * i
			const r = Math.min(width,height) / 2
			const anim = 1 - (rays * motion_)
			const a = util.vec2_from_angle( angle, anim * r, center )
			const b = util.vec2_from_angle( angle, 1 * r, center )
			const d = `M${a.x} ${a.y} L${b.x} ${b.y}`
			neu.push( d )
		}
		ray_ds = neu
	}
	

	function onClick( e ) {
		$dark = !$dark
	}
</script>

<defs>
	<mask id="inner-mask-{id}">
		<rect width="100%" height="100%" fill="white"/>
		<circle {...cresent} fill="black" />
	</mask>
	<mask id="outer-mask-{id}">
		<circle {...main} r={main.r + stroke} fill="white"/>
	</mask>
</defs>
<g class="icon">
	<g {...rotate}>
		{#each new Array( amount ) as null_, idx }
			<path d={ray_ds[idx]} {...strokes} />
		{/each}
	</g>
	<g mask="url(#outer-mask-{id})">
		<g mask="url(#inner-mask-{id})" >
			<circle {...main} r={main.r + (stroke / 2)} {...strokes}  />
			<circle {...cresent} r={cresent.r + (stroke / 2)} {...strokes}  />
		</g>
	</g>
</g>
