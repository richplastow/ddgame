const NAME = 'base-mousse'

const Class = class BaseMousse extends HTMLElement {

    constructor(name) {
        super() // always call super first in constructor

        //// `baseContent` is always the content of base-mousse.html.
        const baseContent = getContent(document, NAME)

        //// `content` and `name` depend on whether this `constructor()` was
        //// called by a subcomponent’s `super()`.
        const content = name
          ? getContent(baseContent, name) // subcomponent, eg sweet-mousse.html
          : baseContent // not a subcomponent
        name = name || NAME // fallback to 'base-mousse' if not a subcomponent

        //// Create a shadow root accessible by JS running in the main context.
        const shadow = this.attachShadow({ mode:'open' })

        //// Create elements and attach them to the shadow DOM.
        //// You could create and add a <style> element here.
        const outer = document.createElement('div')
        outer.setAttribute('class', 'outer')
        const inner = document.createElement('h1')
        inner.setAttribute('class', 'inner')
        inner.innerHTML = content.querySelector('.title').innerHTML
        outer.appendChild(inner)
        shadow.appendChild(outer)

        //// ...?
        const finishedContent = baseContent.querySelector('template').content
        if (name !== NAME)
            finishedContent.appendChild(
                content.querySelector('template').content
            )
        outer.appendChild( finishedContent.cloneNode(true) )
    }


    //// The custom element is first connected to the document's DOM.
    connectedCallback() { console.log('connectedCallback()');
    }

    //// The custom element is disconnected from the document's DOM.
    disconnectedCallback() { console.log('disconnectedCallback()');
    }

    //// The custom element is moved to a new document.
    adoptedCallback() { console.log('adoptedCallback()');
    }

    //// One of the custom element's attributes is added, removed, or changed.
    //// For this to work, tou have to observe the attributes, eg:
    ////  static get observedAttributes() {return ['w', 'l']; }
    attributeChangedCallback() { console.log('attributeChangedCallback()');
    }


}//Class

window.customElements.define(NAME, Class, { extends:'div' })
export { Class }




//// UTILITY

////
function getContent (top, name) {
    return top.querySelector('link[rel="import"][href$="'+name+'.html"]').import
}
