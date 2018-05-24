//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom-3/apiOom3.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom } from '../oom/apiOom.js'
import { constant } from '../oom-kit.js'
const { ATTRIBUTE } = constant

//// Define the API.
const api = {
    name: 'oom-3'
  , elements: {}
  , listeners: {}
  , members: {

        //// Attributes.
        x:  { Number, ATTRIBUTE, updaters:'updateXYZ' }
      , y:  { Number, ATTRIBUTE, updaters:'updateXYZ' }
      , z:  { Number, ATTRIBUTE, updaters:'updateXYZ updateZ' }

        //// Attribute updater handlers.
      , updateXYZ
      , updateZ

    }
}

//// Merge with the super-class’s API, and export.
api.elements  = Object.assign({}, apiOom.elements , api.elements)
api.listeners = Object.assign({}, apiOom.listeners, api.listeners)
api.members   = Object.assign({}, apiOom.members  , api.members)
export { api as apiOom3 }




//// ATTRIBUTE-UPDATE HANDLERS

function updateXYZ (evt) {
    const { x, y, z } = this.oom.current
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin)`
}

function updateZ (evt) {
    const { z } = this.oom.current
    this.oom.$.wrap.style.zIndex = 97 - ~~z //@TODO relative to camera
}
