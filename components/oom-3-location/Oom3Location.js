import { apiOom3Location } from './apiOom3Location.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Location extends Oom3 {
    static get api () { return apiOom3Location }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}

//// Inherit styles from parent-class.
Oom3Location.$style.innerHTML = Oom3Location.fullyInheritedStyle

//// Define the <oom-3-location> custom element.
customElements.define('oom-3-location', Oom3Location)

export { Oom3Location }
