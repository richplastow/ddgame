const apiOom3 = {
    name: 'oom-3'
  , attributes: {
        x: { parser:parseNumber }
      , y: { parser:parseNumber }
      , z: { parser:parseNumber }
      , marker: { parser:parseMarker, valid:['none','red','green','blue'] }
    }
  , elements: [
        '.main'
    ]
}

export { apiOom3 }




//// UTILITY

function parseNumber (value) { return +value || 0 }

function parseMarker (value) {
    const valid = apiOom3.attributes.marker.valid
    return 0 > valid.indexOf(value) ? valid[0] : value
}
