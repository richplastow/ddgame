import { apiOom3Cloud } from './apiOom3Cloud.js'
import { Oom3 } from '../oom-3/Oom3.js'

class Oom3Cloud extends Oom3 {
    static get api () { return apiOom3Cloud }
    static get parent () { return Oom3 } //@TODO is there a JS built-in ref?
}


//// Inherit styles from super-class.
Oom3Cloud.$style.innerHTML = Oom3Cloud.fullyInheritedStyle
// Oom3Cloud.$style.innerHTML = `
// /* Begin styles inherited from components/oom-3/oom-3.html */
// ${Oom3.$style.innerHTML}
// /* End styles inherited from components/oom-3/oom-3.html */
//
// ${Oom3Cloud.$style.innerHTML}
// `


customElements.define('oom-3-cloud', Oom3Cloud)

export { Oom3Cloud }
