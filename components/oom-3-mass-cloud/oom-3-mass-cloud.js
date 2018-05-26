import parentApi from '../oom-3-mass/oom-3-mass.js'
import { parse, update, constant } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Define the API, including the class.
const api = {
    Class: class Oom3MassCloud extends parentApi.Class {}
  , title: 'Oom3MassCloud'
  , tag: 'oom-3-mass-cloud'
  , parentApi
  , elements: {}
  , listeners: {}
  , members: {
        weather: { Enum, ATTRIBUTE
          , valid: 'fair storm lightning'
          , updaters: update.enum('wrap shadow')
        }
    }
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
