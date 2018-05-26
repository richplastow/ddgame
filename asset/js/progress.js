//// Updates a progress bar as modules load, and triggers a 'loaded' event when
//// the progress bar reaches 100%. Also, throws an exception if more modules
//// than expected load.

const paths = {}, expected = 13
let remaining = expected
let $inner
createEl()
progress('asset/js/progress.js')


//// Creates a progress-bar.
function createEl () {
    const
        $style = document.createElement('style')
      , $outer = document.createElement('div')
    $inner = document.createElement('div')
    $style.innerHTML =
`.oom-progress {
    position: fixed;
    top: 0; left: 0; right: 0; height: 10px;
    background: var(--progress-outer, #000);
    z-index: 99999;
    transition: opacity 1s 1s, visibility 2s 0s;
    cursor: pointer;
}
.oom-progress >div {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 10px;
    background: var(--progress-inner, #fff);
    transform-origin: 0;
    transform: scaleX(0);
    transition: transform 1s;
}
body.oom-progress-100 .oom-progress {
    opacity: 0;
    visibility: hidden;
}
`
    $outer.classList.add('oom-progress')
    $outer.appendChild($inner)
    document.body.appendChild($style)
    document.body.appendChild($outer)
}


//// The exported function. Also acts as a namespace for `progress.percent`.
export default function progress (path) {

    //// Record the path of the module which loaded.
    paths[path] = paths[path] || 0
    paths[path]++
    if (1 < paths[path])
        console.error(`${path} loaded ${paths[path]} times`)

    //// Reduce the tally and update the `progress.percent` property.
    remaining--
    progress.percent = 100 - ~~(remaining / expected * 100)

    //// Update the progress-bar.
    setTimeout( () => {
        $inner.style.transform = `scaleX(${progress.percent/100})`
    }, 100)

    //// Deal with 100% progress.
    if (0 === remaining) {
        setTimeout( () => {
            window.dispatchEvent( new Event('oom-progress-100') )
            document.body.classList.add('oom-progress-100')
            console.log('oom-progress-100');
        }, 1000) // give the browser a chance to render complex CSS
    } else if (0 > remaining)
        console.error(`${-remaining} too many assets have loaded!`)

}
