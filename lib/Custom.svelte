<script>
    export let strokes = {}

    export let width = 200
    export let height = 200
    export let stroke = 2
    export let duration = 1000
    export let hover = false
    export let easing = e => e
    export let browser = false
    export let center = { x: 100, y: 100 }
    export let space = 0.7
    export let origin 
    export let state = false // observation

    let id = 'hellcustom_' + new Date().getTime().toString()

//     $: sheet = `
//     &lt;style&gt;
//         ${id}, ${id} * {
//             ${origin}

//         }

//         ${id} * {
//             ${Object.keys(strokes).map( k => {
//                 return `${k}: ${strokes[k]};`
//             }).join('\n')}
//         }
//     &lt;/style&gt;
// `
</script>

<g {id}>
    <slot />
</g>