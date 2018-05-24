import { apiOom } from './apiOom.js'

class Oom extends HTMLElement {
    static get api () { return apiOom }
    static get parent () { return HTMLElement } //@TODO is there a JS built-in ref?

    constructor() {

        //// Call HTMLElement’s constructor(). Then we can reference `this`.
        super()
        const
            Class = this.constructor
          , api = Class.api
          , { elements, members, listeners } = api

        //// Clone the <template> into a new Shadow DOM.
        this.attachShadow({mode:'open'}).appendChild(
            Class.$template.content.cloneNode(true)
        )

        //// Add a CSS <link>.
        this.shadowRoot.appendChild( Object.assign(
            document.createElement('link'), { rel:'stylesheet'
          , href:`${Class.componentsURL}${api.name}/${api.name}.css` }) )

        //// All Oom custom elements have an `oom` object.
        ////@TODO maybe add `, initially:{}, target: {}`
        this.oom = { api, Class, $:{}, current:{} }

        //// Store handy references to various sub-elements in `$`.
        for ( const [name, el] of Object.entries(elements) )
            if ('this' === name) throw Error(`invalid element name 'this'`)
            else this.oom.$[name] = this.shadowRoot.querySelector(el.selector)

        //// Validate member names. For example, 'current' is an invalid name.
        for (const name in members)
            if (this.oom[name]) throw Error(`invalid method name '${name}'`)

        //// Bind methods to this instance, and store them in `this.oom`.
        for ( const [name, member] of Object.entries(members) )
            if (member.bind) this.oom[name] = member.bind(this)

        //// Record default non-attribute properties into `this.oom.current`.
        for ( const [name, member] of Object.entries(members) )
            if (! member.ATTRIBUTE && ! member.bind)
                for ( const [key, value] of Object.entries(member) )
                    if (value.bind && 'updaters' !== key && null !==
                        (this.oom.current[name] = value.bind(this)(null, name))
                    ) break

        //// Bind attribute-updaters defined as a single function.
        for ( const [name, member] of Object.entries(members) )
            if (member.ATTRIBUTE && member.updaters && member.updaters.bind)
                this.addEventListener(
                    `oom-${name}-update`, member.updaters.bind(this) )

        //// Bind attribute-updaters defined as an array of functions.
        for ( const [name, member] of Object.entries(members) )
            if (member.ATTRIBUTE && member.updaters && member.updaters.pop)
                for (const updater of member.updaters)
                    this.addEventListener(
                        `oom-${name}-update`, updater.bind(this) )

        //// Bind attribute-updaters defined as a space-delimited string.
        for ( const [name, member] of Object.entries(members) )
            if (member.ATTRIBUTE && member.updaters && ! member.updaters.bind)
                for (const uName of member.updaters.split(' ')) // updater name
                    if (! this.oom[uName]) throw Error(`No this.oom.${uName}()`)
                    else this.addEventListener(
                        `oom-${name}-update`, this.oom[uName].bind(this) )

        //// Record attribute values (or defaults) into `this.oom.current`.
        for ( const [name, member] of Object.entries(members) )
            if (member.ATTRIBUTE)
                this.attributeChangedCallback(name)

        //// Set up listeners.
        for (const evtnames in listeners)
            evtnames.split(' ').map( evtname => {
                const listener = api.listeners[evtname]
                listener.targets.split(' ').map( targetname =>
                    ('this' === targetname ? this : this.oom.$[targetname])
                       .addEventListener( evtname, listener.fn.bind(this) )
                )
            })

        //@TODO maybe use these... need to deep-copy.
        // //// Make a permanent record of each property’s initial value.
        // this.oom.initially = Object.assign({}, this.oom.members)
        //
        // //// Target values begin identically to the `instance` values.
        // this.oom.target = Object.assign({}, this.oom.instance)

    }

    //// Validates an attribute and casts it to the proper type.
    //// Oom tries every function that’s not an updater.
    //// Used by `constructor()` and `attributeChangedCallback()`.
    parseAttribute (attrName) {
        const member = this.constructor.api.members[attrName]
        let parsed = null
        for ( const [key, value] of Object.entries(member) )
            if (value.bind && 'updaters' !== key && null !==
                ( parsed = value.bind(this)(this.getAttribute(attrName), attrName) )
            ) return parsed
    }

    //// Deals with an attribute being added, removed or changed.
    ////@TODO poll in Firefox dev-mode, in case attributes are changed via inspector
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue); //@TODO just operate on `name`

        //// Validate the attribute (cast to its proper type), and store it as a
        //// property of `this.oom.current`.
        this.oom.current[name] = this.parseAttribute(name)

        //// Trigger event listeners for this change.
        this.dispatchEvent( new Event(`oom-${name}-update`) )
    }

    //// Observe the attributes, to make attributeChangedCallback() work.
    static get observedAttributes () {
        const { members } = this.api
        return Object.keys(members).filter(name => members[name].ATTRIBUTE)
    }

    //// The <link> element which loaded the 'oom-all.html' file.
    static get $baseLink () {
        return document.querySelector('link[rel="import"][href$="oom-all.html"]')
    }

    //// The <link> element which loaded the 'oom.html' file.
    static get $subLink () {
        return this.$baseLink.import.querySelector(
            `link[rel="import"][href$="${this.api.name}.html"]`)
    }

    //// The current class’s <template>. Will be cloned into a new Shadow DOM
    //// by the constructor().
    static get $template () {
        return this.$subLink.import.querySelector('#'+this.api.name)
    }

    //// Fully qualified URL of the ‘components/’ directory.
    static get componentsURL () {
        return this.$baseLink.href.slice(0,-12) // trim trailing 'oom.html'
    }
}

//// Define the <oom-base> custom element.
customElements.define('oom-base', Oom)

export { Oom }
