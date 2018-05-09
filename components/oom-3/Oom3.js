import { apiOom3 } from './apiOom3.js'

class Oom3 extends HTMLElement {

    constructor(api) {
        super()

        //// All Oom custom elements have an `oom` property.
        this.oom = {
            instance: {}
          , $el:{}
          , api: api || apiOom3 // sub-classes should call `super(apiOom3Foo)`
        } //@TODO static

        //// Clone the template into a new Shadow DOM.
        const
            $baseLink = document.querySelector(
                'link[rel="import"][href$="components/oom.html"]')
          , $subLink = $baseLink.import.querySelector(
                `link[rel="import"][href$="${this.oom.api.name}.html"]`)
          , $template = $subLink.import.querySelector('#'+this.oom.api.name) // eg '#oom-3-foo'
          , $clonedTemplate = $template.content.cloneNode(true)
          , frag = this.attachShadow({mode:'open'}).appendChild($clonedTemplate)

        //// Store handy refs to various elements.
        this.oom.api.elements.forEach( selector => {
            this.oom.$el[selector] = this.shadowRoot.querySelector(selector)
        })

        //// Validate attributes, cast to proper types, and store in `instance`.
        for (let name in this.oom.api.attributes) this.parseAttribute(name)

        //// Initialise event listeners.
        this.addEventListener('oom-x-change', onXYZChange)
        this.addEventListener('oom-y-change', onXYZChange)
        this.addEventListener('oom-z-change', onXYZChange)
        function onXYZChange (evt) {
            const { x, y, z } = this.oom.instance
            console.log(x,y,z, `translate3d(${x-5}vmin, ${y+63}vmin, ${-z}vmin)`);
            this.oom.$el['.main'].style.transform =
                `translate3d(${x-5}vmin, ${y+63}vmin, ${-z}vmin)`
        }

        //// Deal with mouse events.
        this.addEventListener( 'click', e => this.setAttribute('y', -2) )

    }

    //// Validates an attribute, casts it to the proper type, and stores it as
    //// a property of `this.oom.instance`
    //// Used by `constructor()` and `attributeChangedCallback()`.
    parseAttribute (name) {
        const parser = this.oom.api.attributes[name].parser // eg `v => +v || 0`
        this.oom.instance[name] = parser(this.getAttribute(name)) // "1e2" > 100
    }

    //// Observe the attributes, to make attributeChangedCallback() work.
    static get observedAttributes() { return Object.keys(apiOom3.attributes) }

    //// Deal with an attribute being added, removed or changed.
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue); @TODO just operate on `name`

        //// Validate the attribute, cast it to its proper type.
        this.parseAttribute(name)

        //// Trigger event listeners for this change.
        this.dispatchEvent( new Event(`oom-${name}-change`) )
    }

}

customElements.define('oom-3', Oom3)

export { Oom3 }
