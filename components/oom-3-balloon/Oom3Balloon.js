import { apiOom3Balloon } from './apiOom3Balloon.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Balloon extends Oom3 {

    constructor () {
        super(apiOom3Balloon)

        //// Initialise event listeners.
        this.addEventListener('oom-upper-change', onUpperChange)
        function onUpperChange (evt) {
            const { upper } = this.oom.instance
            this.oom.$['.main'].classList.remove(
                'upper-or','upper-argent','upper-azure','upper-gules'
              , 'upper-purpure','upper-vert','upper-sable')
            this.oom.$['.main'].classList.add('upper-'+upper)
        }
        this.addEventListener('oom-lower-change', onLowerChange)
        function onLowerChange (evt) {
            const { lower } = this.oom.instance
            this.oom.$['.main'].classList.remove(
                'lower-or','lower-argent','lower-azure','lower-gules'
              , 'lower-purpure','lower-vert','lower-sable')
            this.oom.$['.main'].classList.add('lower-'+lower)
        }
    }

    //// Observe the attributes, to make attributeChangedCallback() work.
    static get observedAttributes() { return Object.keys(apiOom3Balloon.attributes) }
}

////
const
    $baseLink = document.querySelector(
        'link[rel="import"][href$="oom.html"]')
  , $subLink = $baseLink.import.querySelector(
        `link[rel="import"][href$="${apiOom3Balloon.name}.html"]`)
  , $template = $subLink.import.querySelector('#'+apiOom3Balloon.name) // eg '#oom-3-foo'
  , $style = $template.content.querySelector('style')

Oom3Balloon.oom = {
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

${Oom3Balloon.oom.$.style.innerHTML}
`


customElements.define('oom-3-balloon', Oom3Balloon)

export { Oom3Balloon }
