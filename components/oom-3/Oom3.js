import { apiOom3 } from './apiOom3.js'


//// Define the oom3 class.
class Oom3 extends HTMLElement {
    static get api () { return apiOom3 }
    static get parent () { return HTMLElement } //@TODO is there a JS built-in ref?

    constructor() {

        //// Call HTMLElement’s constructor(). Then we can reference `this`.
        super()
        const api = this.constructor.api

        //// Clone the <template> into a new Shadow DOM.
        this.attachShadow({mode:'open'}).appendChild(
            this.constructor.$template.content.cloneNode(true)
        )

        //// All Oom custom elements have an `oom` property.
        this.oom = {
            instance: {} // mostly parsed and cast from attributes
          , $: {} // handy references to sub-elements
          , Class: this.constructor
          , api
        }

        //// Store handy references to various sub-elements.
        for (const name in api.elements)
            this.oom.$[name] =
                this.shadowRoot.querySelector(api.elements[name].selector)

        //// Listen for attribute changes.
        for (const name in api.attributes)
            for (const listener of api.attributes[name].onChange)
                this.addEventListener(`oom-${name}-change`, listener)

        //// Validate attributes, cast to proper types, and store in `instance`.
        for (const name in api.attributes)
            this.attributeChangedCallback(name)

        //// Listen for user events (typically mouse clicks, etc).
        this.addEventListener( 'click', e => this.setAttribute('y', -2) )

    }

    //// Validates an attribute and casts it to the proper type.
    //// Used by `constructor()` and `attributeChangedCallback()`.
    parseAttribute (attrName) {
        const
            api = this.constructor.api
          , parser = api.attributes[attrName].parser.bind(this) // eg `v=>+v||0`
        return parser(this.getAttribute(attrName), attrName) // eg "1e2" to 100
    }

    //// Deals with an attribute being added, removed or changed.
    ////@TODO poll in Firefox dev-mode, in case attributes are changed via inspector
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue); //@TODO just operate on `name`

        //// Validate the attribute (cast to its proper type), and store it as a
        //// property of `this.oom.instance`.
        this.oom.instance[name] = this.parseAttribute(name)

        //// Trigger event listeners for this change.
        this.dispatchEvent( new Event(`oom-${name}-change`) )
    }

    //// Observe the attributes, to make attributeChangedCallback() work.
    static get observedAttributes () {
        return Object.keys(this.api.attributes)
    }

    //// The current class’s <template>. Will be cloned into a new Shadow DOM
    //// by the constructor().
    static get $template () {
        const
            api = this.api
          , name = this.api.name // eg 'oom-3-foo'
          , $baseLink = document.querySelector(
                'link[rel="import"][href$="oom.html"]')
          , $subLink = $baseLink.import.querySelector(
                `link[rel="import"][href$="${name}.html"]`)
        return $subLink.import.querySelector('#'+name)
    }

    //// The <style> element of the current class’s <template>.
    static get $style () {
        return this.$template.content.querySelector('style')
    }

    //// Implement class-inheritance of CSS.
    static get fullyInheritedStyle () {
        let out = '', suffix = `.style-scope.${this.api.name}`
        if ('function' === typeof this.parent.maybeScopedStyle) out += `
            /* Begin styles inherited from ${this.parent.api.name} */
            ${this.parent.maybeScopedStyle(suffix)}
            /* End styles inherited from ${this.parent.api.name} */\n`
        out += this.maybeScopedStyle(suffix) // `suffix` is only used if needed
        return out
    }

    //// In legacy browsers, suffix <style> element’s selectors to limit scope.
    static maybeScopedStyle (suffix) {
        if (-1 === window.navigator.userAgent.indexOf('Firefox') )//@TODO change this after testing in more browsers
            return this.$style.innerHTML // CSS scoped without help

        return this.$style.innerHTML.replace( // needs suffixes to scope CSS
            /([^]*?)\s*({[^]*?}|,)/g // stackoverflow.com/a/33236071
          , `$1${suffix} $2`
        )
    }

}

//// Define the <oom-3> custom element.
customElements.define('oom-3', Oom3)

export { Oom3 }
