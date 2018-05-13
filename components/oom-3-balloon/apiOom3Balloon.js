import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Balloon = { name:'oom-3-balloon' }

const validTincture = [
    'or' // gold or yellow, relates to topaz and the Sun
  , 'argent' // silver or white, relates to pearl and the Moon
  , 'azure' // blue, relates to sapphire and Jupiter
  , 'gules' // red, relates to ruby and Mars
  , 'purpure' // purple, relates to amethyst and Mercury
  , 'vert' // green, relates to emerald and Venus
  , 'sable' // black, relates to diamond and Saturn
]

//// Merge <oom-3> attributes into <oom-3-balloon> attributes.
apiOom3Balloon.attributes = Object.assign(apiOom3.attributes, {
    upper: { parser: parseTincture, valid:validTincture }
  , lower: { parser: parseTincture, valid:validTincture }
})

//// Merge <oom-3> elements into <oom-3-balloon> elements.
apiOom3Balloon.elements = apiOom3.elements.concat([
])

export { apiOom3Balloon }




//// UTILITY

function parseTincture (value) {
    return 0 > validTincture.indexOf(value) ? validTincture[0] : value
}
