import { message } from './utils.js'
console.log('SubComponent.js has loaded utils: ' + message);

class SubComponent extends HTMLElement {
    constructor() {
        super()
        const
            $baseLink = document.querySelector(
                'link[rel="import"][href$="base-component.html"]')
          , $subLink = $baseLink.import.querySelector(
                'link[rel="import"][href$="sub-component.html"]')
          , $template = $subLink.import.querySelector('#sub-component')
          , $clonedTemplate = $template.content.cloneNode(true)
        this.attachShadow({ mode:'open' }).appendChild($clonedTemplate)
    }
}

customElements.define('sub-component', SubComponent)

export { SubComponent }
