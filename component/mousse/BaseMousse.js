class BaseMousse extends HTMLElement {
    constructor() {
        super()
        const
            $link = document.querySelector(
                'link[rel="import"][href$="base-mousse.html"]' )
          , $template = $link.import.querySelector('#base-mousse')
          , $clonedTemplate = $template.content.cloneNode(true)
        this.attachShadow({ mode:'open' }).appendChild($clonedTemplate)
    }
}

customElements.define('base-mousse', BaseMousse)

export { BaseMousse }
