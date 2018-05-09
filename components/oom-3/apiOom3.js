const apiOom3 = {
    name: 'oom-3'
  , attributes: {
        x: { parser: parseNumber }
      , y: { parser: parseNumber }
      , z: { parser: parseNumber }
    }
  , elements: [
        '.main'
    ]
}

export { apiOom3 }




//// UTILITY

function parseNumber (value) { return +value || 0 }
