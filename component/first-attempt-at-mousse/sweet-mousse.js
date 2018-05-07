const NAME = 'sweet-mousse'

import { Class as BaseMousse } from './base-mousse.js'

const Class = class SweetMousse extends BaseMousse {

    constructor() {
        super(NAME) // always call super first in constructor
    }


}//Class

window.customElements.define(NAME, Class, { extends:'div' })
export { Class }
