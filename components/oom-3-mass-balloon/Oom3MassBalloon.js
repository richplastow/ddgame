import { apiOom3MassBalloon } from './apiOom3MassBalloon.js'
import { Oom3Mass } from '../oom-3-mass/Oom3Mass.js'

class Oom3MassBalloon extends Oom3Mass {
    static get api () { return apiOom3MassBalloon }
    static get parent () { return Oom3Mass } //@TODO is there a JS built-in ref?
}

//// Define the <oom-3-mass-balloon> custom element.
customElements.define('oom-3-mass-balloon', Oom3MassBalloon)

export { Oom3MassBalloon }
