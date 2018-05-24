//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom-3-location/apiOom3Location.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom3 } from '../oom-3/apiOom3.js'
import { parse, update, constant } from '../oom-kit.js'
const { Enum } = parse, { ATTRIBUTE } = constant

//// Import special functionality.
import { vectorAtPoint } from './vectorAtPoint.js'

//// Define the API.
const api = {
    name: 'oom-3-location'
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

//// Merge with the super-class’s API, and export.
api.elements  = Object.assign({}, apiOom3.elements , api.elements)
api.listeners = Object.assign({}, apiOom3.listeners, api.listeners)
api.members   = Object.assign({}, apiOom3.members  , api.members)
export { api as apiOom3Location }




//// ATTRIBUTE-UPDATE HANDLERS

function updateXYZ (evt) {
    const { x, y, z } = this.oom.current
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin) rotateX(90deg)`
}
