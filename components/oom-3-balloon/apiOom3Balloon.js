import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Balloon = { name:'oom-3-balloon' }

const validColor = [
    'yellow' // or (gold), relates to topaz and the Sun
  , 'white' // argent (silver), relates to pearl and the Moon
  , 'blue' // azure, relates to sapphire and Jupiter
  , 'red' // gules, relates to ruby and Mars
  , 'purple' // purpure, relates to amethyst and Mercury
  , 'green' // vert, relates to emerald and Venus
  , 'black' // sable, relates to diamond and Saturn
]

//// Merge <oom-3> attributes into <oom-3-balloon> attributes.
apiOom3Balloon.attributes = Object.assign(apiOom3.attributes, {
    upper: { parser: parseColor, valid:validColor }
  , lower: { parser: parseColor, valid:validColor }
})

//// Merge <oom-3> elements into <oom-3-balloon> elements.
apiOom3Balloon.elements = apiOom3.elements.concat([
])

export { apiOom3Balloon }




//// UTILITY

function parseColor (value) {
    return 0 > validColor.indexOf(value) ? validColor[0] : value
}
