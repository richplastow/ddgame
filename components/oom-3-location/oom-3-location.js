import parentApi from '../oom-3/oom-3.js'
import { parse, constant, update } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Import special functionality.
import vectorAtPoint from './vector-at-point.js'

//// Define the API, including the class.
const api = {
    Class: class Oom3Location extends parentApi.Class {}
  , title: 'Oom3Location'
  , tag: 'oom-3-location'
  , parentApi
  , elements: {}
  , listeners: {}
  , members: {

        //// Attributes.
        windpath: { Enum, ATTRIBUTE
          , valid: 'none cyclone anticyclone ns sn ew we ne en es se sw ws wn nw'
          , updaters: update.enum('wrap')
        }

        //// Attribute updater handlers.
      , updateXYZ // override `updateXYZ()` defined in <oom-3>

        //// Other methods.
      , vectorAtPoint

    }
}




//// ATTRIBUTE-UPDATE HANDLERS

function updateXYZ (evt) {
    const { x, y, z } = this.oom.current
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin) rotateX(90deg)`
}




//// BOILERPLATE

//// Merge with the super-class’s API.
api.elements  = Object.assign({}, parentApi.elements , api.elements)
api.listeners = Object.assign({}, parentApi.listeners, api.listeners)
api.members   = Object.assign({}, parentApi.members  , api.members)

//// Define the class’s custom element, and create its static `OOM` namespace.
api.Class.oomInit(api)

//// Finally, tell the progress-bar this file has loaded, and export the API.
import progress from '../../asset/js/progress.js'; progress(api.tag)
export default api
