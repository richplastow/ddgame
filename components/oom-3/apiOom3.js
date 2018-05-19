import { parse, on, clamp } from '../oom-kit.js'

const apiOom3 = {
    name: 'oom-3'
  , attributes: {
        x:  { parser:parse.number, onChange:[onXYZRXChange] }
      , y:  { parser:parse.number, onChange:[onXYZRXChange] }
      , z:  { parser:parse.number, onChange:[onXYZRXChange,onZChange] }
      , rx: { parser:parse.number, onChange:[onXYZRXChange] }
      , marker: {
            parser: parse.enum
          , onChange: [on.change]
          , valid:['none','red','green','blue']
          , linkedElements: ['marker']
        }
    }
  , elements: {
        wrap: { selector:'.wrap' }
      , hitzone: { selector:'.hitzone' }
      , main: { selector:'.main' }
      , silhouette: { selector:'.silhouette' }
      , surround: { selector:'.surround' }
      , ground: { selector:'.ground' }
      , shadow: { selector:'.shadow' }
      , marker: { selector:'.marker' }
    }
}

export { apiOom3 }




//// EVENT HANDLERS

function onXYZRXChange (evt) {
    const { x, y, z, rx } = this.oom.instance
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin) rotateX(${rx}deg)`
    this.oom.$.ground.style.transform =
        `translate3d(${x}vmin, 72vmin, ${-z}vmin)`
}

function onZChange (evt) {
    const { z } = this.oom.instance //@TODO relative to camera
    this.oom.$.wrap.style.zIndex = 97 - ~~z
    this.oom.$.silhouette.style.opacity = clamp.opacity(z / 200) // fog effect on top of .main
    this.oom.$.shadow.style.opacity = clamp.opacity( (200-z) / 200 ) // fog effect on .shadow
}
