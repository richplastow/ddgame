//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom-3/apiOom3Cloud.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom3 } from '../oom-3/apiOom3.js'
import { parse, update, constant } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Define the API.
const api = {
    name: 'oom-3-cloud'
  , elements: {}
  , listeners: {}
  , members: {
        weather: { Enum, ATTRIBUTE
          , valid: 'fair storm lightning'
          , updaters: update.enum('wrap shadow')
        }
    }
}

//// Merge with the super-class’s API, and export.
api.elements  = Object.assign({}, apiOom3.elements , api.elements)
api.listeners = Object.assign({}, apiOom3.listeners, api.listeners)
api.members   = Object.assign({}, apiOom3.members  , api.members)
export { api as apiOom3Cloud }
