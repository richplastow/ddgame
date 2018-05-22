import { apiOom3Cloud } from './apiOom3Cloud.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Cloud extends Oom3 {
    static get api () { return apiOom3Cloud }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3-cloud> custom element.
customElements.define('oom-3-cloud', Oom3Cloud)

export { Oom3Cloud }
