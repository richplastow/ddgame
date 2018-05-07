import { message } from './utils.js'
console.log('BaseComponent.js has loaded utils: ' + message);

class BaseComponent extends HTMLElement {
    constructor() {
        super()
        const
            linkSelector = 'link[rel="import"][href$="base-component.html"]'
          , $link = document.querySelector(linkSelector)
          , $template = $link.import.querySelector('#base-component')
          , $clonedTemplate = $template.content.cloneNode(true)
        this.attachShadow({ mode:'open' }).appendChild($clonedTemplate)
    }
}

customElements.define('base-component', BaseComponent)

export { BaseComponent }
