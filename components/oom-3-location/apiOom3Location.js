import { progress } from '../../asset/js/progress.js'
progress('components/oom-3/apiOom3Location.js')

import { parse, update, constant } from '../oom-kit.js'
const { Enum, Vector } = parse
const { ATTRIBUTE } = constant

import { vectorAtPoint } from './vectorAtPoint.js'

import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Location = { name:'oom-3-location' }

//// Merge <oom-3> elements into <oom-3-location> elements.
apiOom3Location.elements = Object.assign({}, apiOom3.elements, {
})

//// Merge <oom-3> members into <oom-3-location> members.
apiOom3Location.members = Object.assign({}, apiOom3.members, {
    windpath: { Enum, ATTRIBUTE
      , valid: 'none cyclone anticyclone ns sn ew we ne en es se sw ws wn nw'
      , updaters: update.enum('wrap')
    }
  , vectorAtPoint
})

//// Merge <oom-3> listeners into <oom-3-location> listeners.
apiOom3Location.listeners = Object.assign({}, apiOom3.listeners, {
})


function onXYZRXChange (evt) {
    const { x, y, z, rx } = this.oom.current
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin) rotateX(${rx}deg)`
    this.oom.$.ground.style.transform =
        `translate3d(${x}vmin, 72vmin, ${-z}vmin)`
}


export { apiOom3Location }
