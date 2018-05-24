//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom-3-mass-cloud/apiOom3MassCloud.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom3Mass } from '../oom-3-mass/apiOom3Mass.js'
import { parse, update, constant } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Define the API.
const api = {
    name: 'oom-3-mass-cloud'
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
api.elements  = Object.assign({}, apiOom3Mass.elements , api.elements)
api.listeners = Object.assign({}, apiOom3Mass.listeners, api.listeners)
api.members   = Object.assign({}, apiOom3Mass.members  , api.members)
export { api as apiOom3MassCloud }
