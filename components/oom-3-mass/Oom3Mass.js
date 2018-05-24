import { apiOom3Mass } from './apiOom3Mass.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Mass extends Oom3 {
    static get api () { return apiOom3Mass }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3-mass> custom element.
customElements.define('oom-3-mass', Oom3Mass)

export { Oom3Mass }
