import parentApi from '../oom/oom.js'
import { constant } from '../oom-kit.js'
const { ATTRIBUTE, STATIC } = constant

//// Define the API, including the class.
const api = {
    Class: class Oom3 extends parentApi.Class {}
  , title: 'Oom3'
  , tag: 'oom-3'
  , parentApi
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

        //// Static properties.
      , hideDistance: { parse: v => +v || 15, STATIC }
      , deleteDistance: { parse: v => +v || 99, STATIC }

    }
}




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
