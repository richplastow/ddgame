import { apiOom3Balloon } from './apiOom3Balloon.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Balloon extends Oom3 {
    static get api () { return apiOom3Balloon }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3-balloon> custom element.
customElements.define('oom-3-balloon', Oom3Balloon)

export { Oom3Balloon }
