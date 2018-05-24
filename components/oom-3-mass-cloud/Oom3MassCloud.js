import { apiOom3MassCloud } from './apiOom3MassCloud.js'
import { Oom3Mass } from '../oom-3-mass/Oom3Mass.js'

class Oom3MassCloud extends Oom3Mass {
    static get api () { return apiOom3MassCloud }
    static get parent () { return Oom3Mass } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3-mass-cloud> custom element.
customElements.define('oom-3-mass-cloud', Oom3MassCloud)

export { Oom3MassCloud }
