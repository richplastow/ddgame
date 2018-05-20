import { progress } from './progress.js'; progress('asset/js/spawn.js')
import { $$clouds, $$balloons, $scene } from './elements.js'

const spawn = { }

function spawnElements (tally, tag, arr, setRandomElementAttributes) {

    //// Firefox does not apply `transform-style: preserve-3d;` correctly, so
    //// the clouds and balloons etc cannot be nested inside multiple <div>s.
    const $domEl =
        // document.body.classList.contains('is-firefox') ? $scene : $container
        $scene

    for (let i=0; i<tally; i++) {
        const $el = document.createElement(tag) // eg 'oom-3-cloud'
        $el.setAttribute('x', Math.random() * 500 - 200 ) // -200 to 300
        $el.setAttribute('z', Math.random() * 300 ) // 0 to 300
        setRandomElementAttributes($el)
        $domEl.appendChild($el)
        arr.push($el)
    }

}

function setRandomCloudAttributes ($el) {
    const randomWeather = Math.random()
    if ( 0.02 > randomWeather )
        $el.setAttribute('weather', 'lightning') // very unlikely
    else if ( 0.1 > randomWeather )
        $el.setAttribute('weather', 'storm') // fairly unlikely
}

function setRandomBalloonAttributes ($el) {
    const
        colors = 'yellow,white,blue,red,purple,green,black'.split(',')
      , upper = colors[ ~~(Math.random() * colors.length) ]
      , lower = colors[ ~~(Math.random() * colors.length) ]
    $el.setAttribute('upper', upper)
    $el.setAttribute('lower', lower) // one in 20
    console.log(upper, lower);
}

spawn.clouds = function (tally=1) {
    spawnElements(tally, 'oom-3-cloud', $$clouds, setRandomCloudAttributes)
}

spawn.balloons = function (tally=1) {
    spawnElements(tally, 'oom-3-balloon', $$balloons, setRandomBalloonAttributes)
}


export { spawn }
