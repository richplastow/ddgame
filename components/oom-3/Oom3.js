import { apiOom3 } from './apiOom3.js'
import { Oom } from '../oom/Oom.js'

class Oom3 extends Oom {
    static get api () { return apiOom3 }
    static get parent () { return Oom } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3> custom element.
customElements.define('oom-3', Oom3)

export { Oom3 }
