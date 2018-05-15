import { parse, on } from '../oom-kit.js'
import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Balloon = { name:'oom-3-balloon' }

const upperLowerConfig = {
    parser: parse.enum
  , onChange: [on.change]
  , linkedElements: ['main']
  , valid: [
        'yellow' // or (gold), relates to topaz and the Sun
      , 'white' // argent (silver), relates to pearl and the Moon
      , 'blue' // azure, relates to sapphire and Jupiter
      , 'red' // gules, relates to ruby and Mars
      , 'purple' // purpure, relates to amethyst and Mercury
      , 'green' // vert, relates to emerald and Venus
      , 'black' // sable, relates to diamond and Saturn
    ]
}

//// Merge <oom-3> attributes into <oom-3-balloon> attributes.
apiOom3Balloon.attributes = Object.assign({}, apiOom3.attributes, {
    upper: upperLowerConfig
  , lower: upperLowerConfig
})

//// Merge <oom-3> elements into <oom-3-balloon> elements.
apiOom3Balloon.elements = Object.assign({}, apiOom3.elements, {
})

export { apiOom3Balloon }
