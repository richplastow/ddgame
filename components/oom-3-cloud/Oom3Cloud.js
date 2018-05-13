import { apiOom3Cloud } from './apiOom3Cloud.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Cloud extends Oom3 {

    constructor () {
        super(apiOom3Cloud)

        //// Initialise event listeners.
        this.addEventListener('oom-weather-change', onWeatherChange)
        function onWeatherChange (evt) {
            const { weather } = this.oom.instance
            this.oom.$['.main'].classList.remove(
                'weather-fair','weather-storm','weather-lightning')
            this.oom.$['.main'].classList.add('weather-'+weather)
        }
    }

    //// Observe the attributes, to make attributeChangedCallback() work.
    static get observedAttributes() { return Object.keys(apiOom3Cloud.attributes) }
}

////
const
    $baseLink = document.querySelector(
        'link[rel="import"][href$="oom.html"]')
  , $subLink = $baseLink.import.querySelector(
        `link[rel="import"][href$="${apiOom3Cloud.name}.html"]`)
  , $template = $subLink.import.querySelector('#'+apiOom3Cloud.name) // eg '#oom-3-foo'
  , $style = $template.content.querySelector('style')

Oom3Cloud.oom = {
    $: {
        baseLink: $baseLink
      , subLink: $subLink
      , template: $template
      , style: $style
    }
}

//// Inherit styles from super-class.
$style.innerHTML = `
/* Begin styles inherited from components/oom-3/oom-3.html */
${Oom3.oom.$.style.innerHTML}
/* End styles inherited from components/oom-3/oom-3.html */

${Oom3Cloud.oom.$.style.innerHTML}
`


customElements.define('oom-3-cloud', Oom3Cloud)

export { Oom3Cloud }

/*
import { api } from './api.js'

class Oom3Cloud extends HTMLElement {

    constructor() {
        super()

        //// Clone the template into a new Shadow DOM.
        const
            $baseLink = document.querySelector(
                'link[rel="import"][href$="components/all.html"]')
          , $subLink = $baseLink.import.querySelector(
                'link[rel="import"][href$="white-cloud.html"]')
          , $template = $subLink.import.querySelector('#white-cloud')
          , $clonedTemplate = $template.content.cloneNode(true)
          , frag = this.attachShadow({mode:'open'}).appendChild($clonedTemplate)

        //// Handy refs to elements whose styles depend on attributes.
        this.$main = this.shadowRoot.querySelector('.main')

        //// Validate attributes, cast them to their proper type, and apply.
        this.attributeChangedCallback()

        //// Deal with mouse events.
        this.addEventListener( 'click', e => this.setAttribute('y', -2) )

    }

    parseAttributes () {
        this.x = +this.getAttribute('x') || 0
        this.y = +this.getAttribute('y') || 0
        this.z = +this.getAttribute('z') || 0

        const weather = this.getAttribute('weather') || ''
        this.weather = 0 > weathers.indexOf(weather) ? weathers[0] : weather
    }


    //// One of the custom element's attributes is added, removed, or changed.
    //// For this to work, tou have to observe the attributes:
    static get observedAttributes() { return 'x y z weather'.split(' ') }
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue); @TODO just operate on `name`

        //// Validate attributes, and cast them to their proper type.
        this.parseAttributes()
        const { weather, x, y, z } = this

        this.$main.classList.add(weather)
        this.$main.style.transform =
            `translate3d(${x-5}vmin, ${y+63}vmin, ${-z}vmin)`
    }

}

customElements.define('white-cloud', Oom3Cloud)

export { Oom3Cloud }
*/
