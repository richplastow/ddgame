import { apiOom3Balloon } from './apiOom3Balloon.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Balloon extends Oom3 {
    static get api () { return apiOom3Balloon }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}


//// Inherit styles from super-class.
Oom3Balloon.$style.innerHTML = Oom3Balloon.fullyInheritedStyle
// Oom3Balloon.$style.innerHTML = `
// /* Begin styles inherited from components/oom-3/oom-3.html */
// ${Oom3.$style.innerHTML}
// /* End styles inherited from components/oom-3/oom-3.html */
//
// ${Oom3Balloon.$style.innerHTML}
// `


customElements.define('oom-3-balloon', Oom3Balloon)

export { Oom3Balloon }
