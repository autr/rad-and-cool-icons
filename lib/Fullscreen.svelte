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
    export let spacing = 0.25

</script>


<defs>
</defs>


{#each (new Array(4)) as nulled, idx }
    <g style={`${origin};transform: rotateZ(${idx * 90}deg)`}>
        <path d={`
            M0 ${height * spacing}
            L0 0
            L${width * spacing} 0
        `} {...strokes} />
        <circle cx={width} cy={height} r={1} style="opacity:0" />
    </g>
{/each}