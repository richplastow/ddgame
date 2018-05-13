const apiOom3 = {
    name: 'oom-3'
  , attributes: {
        x: { parser:parseNumber, onChange:[onXYZChange] }
      , y: { parser:parseNumber, onChange:[onXYZChange] }
      , z: { parser:parseNumber, onChange:[onXYZChange,onZChange] }
      , marker: {
            parser:parseMarker, onChange:[onMarkerChange]
          , valid:['none','red','green','blue']
        }
    }
  , elements: {
        main: '.main'
      , shadow: '.shadow'
    }
}

export { apiOom3 }




//// PARSERS

function parseNumber (value) { return +value || 0 }

function parseMarker (value) {
    const valid = apiOom3.attributes.marker.valid
    return 0 > valid.indexOf(value) ? valid[0] : value
}




//// ON ATTRIBUTE CHANGE

function onXYZChange (evt) {
    const { x, y, z } = this.oom.instance
    this.oom.$.main.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin)`
    this.oom.$.shadow.style.transform =
        `translate3d(${x}vmin, 72vmin, ${-z}vmin) scaleZ(0.5) rotateX(90deg)`
}

function onZChange (evt) {
    const { z } = this.oom.instance
    this.oom.$.main.style.zIndex = 97 - ~~z
}

function onMarkerChange (evt) {
    const { marker } = this.oom.instance
    this.oom.$.main.classList.remove(
        'marker-none','marker-red','marker-green','marker-blue')
    this.oom.$.main.classList.add('marker-'+marker)
}
