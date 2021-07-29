export { default as default } from './All.wc.svelte' 


export let line = (x1, y1, x2, y2) => {
    const args = {x1,y1,x2,y2}
    return `<line ${Object.keys(args).map( a => `${a}="${args[a]}"`).join(' ')} />`
}