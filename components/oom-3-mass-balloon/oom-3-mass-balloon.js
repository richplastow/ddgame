import parentApi from '../oom-3-mass/oom-3-mass.js'
import { parse, constant, update } from '../oom-kit.js'
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

//// Define the API, including the class.
const api = {
    Class: class Oom3MassBalloon extends parentApi.Class {}
  , title: 'Oom3MassBalloon'
  , tag: 'oom-3-mass-balloon'
  , parentApi
  , elements: {}
  , listeners: {}
  , members: {
        upper: upperLowerConfig
      , lower: upperLowerConfig
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
