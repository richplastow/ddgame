class BaseCloud extends HTMLElement {
    constructor() {
        super()
        const
            $link = document.querySelector(
                'link[rel="import"][href$="base-cloud.html"]' )
          , $template = $link.import.querySelector('#base-cloud')
          , $clonedTemplate = $template.content.cloneNode(true)
        this.attachShadow({ mode:'open' }).appendChild($clonedTemplate)
    }
}

customElements.define('base-cloud', BaseCloud)

export { BaseCloud }
