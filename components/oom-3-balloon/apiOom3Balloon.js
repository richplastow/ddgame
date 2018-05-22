//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom-3/apiOom3Balloon.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom3 } from '../oom-3/apiOom3.js'
import { parse, update, constant } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Define a member-description which is shared by two attributes.
const upperLowerConfig = { Enum, ATTRIBUTE
  , valid:
        'yellow ' // or (gold), relates to topaz and the Sun
      + 'white ' // argent (silver), relates to pearl and the Moon
      + 'blue ' // azure, relates to sapphire and Jupiter
      + 'red ' // gules, relates to ruby and Mars
      + 'purple ' // purpure, relates to amethyst and Mercury
      + 'green ' // vert, relates to emerald and Venus
      + 'black' // sable, relates to diamond and Saturn
  , updaters: update.enum('wrap')
}

//// Define the API.
const api = {
    name: 'oom-3-balloon'
  , elements: {}
  , listeners: {}
  , members: {
        upper: upperLowerConfig
      , lower: upperLowerConfig
    }
}

//// Merge with the super-class’s API, and export.
api.elements  = Object.assign({}, apiOom3.elements , api.elements)
api.listeners = Object.assign({}, apiOom3.listeners, api.listeners)
api.members   = Object.assign({}, apiOom3.members  , api.members)
export { api as apiOom3Balloon }
