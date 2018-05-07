import { flavours } from './attributes.js'

class WhiteCloud extends HTMLElement {

    constructor() {
        super()

        //// Clone the template into a new Shadow DOM.
        const
            $baseLink = document.querySelector(
                'link[rel="import"][href$="base-cloud.html"]')
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

        const flavour = this.getAttribute('flavour') || ''
        this.flavour = 0 > flavours.indexOf(flavour) ? flavours[0] : flavour
    }


    //// One of the custom element's attributes is added, removed, or changed.
    //// For this to work, tou have to observe the attributes:
    static get observedAttributes() { return 'x y z flavour'.split(' ') }
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue); @TODO just operate on `name`

        //// Validate attributes, and cast them to their proper type.
        this.parseAttributes()
        const { flavour, x, y, z } = this

        this.$main.classList.add(flavour)
        this.$main.style.transform =
            `translate3d(${x-5}vmin, ${y+63}vmin, ${-z}vmin)`
    }

}

customElements.define('white-cloud', WhiteCloud)

export { WhiteCloud }
