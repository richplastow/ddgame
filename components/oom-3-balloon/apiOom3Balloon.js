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
apiOom3Balloon.attributes = Object.assign({}, apiOom3.attributes, {
    upper: { parser: parseColor, valid:validColor, onChange:[onUpperChange] }
  , lower: { parser: parseColor, valid:validColor, onChange:[onLowerChange] }
})

//// Merge <oom-3> elements into <oom-3-balloon> elements.
apiOom3Balloon.elements = Object.assign({}, apiOom3.elements, {
})

export { apiOom3Balloon }




//// PARSERS

function parseColor (value) {
    return 0 > validColor.indexOf(value) ? validColor[0] : value
}




//// ON ATTRIBUTE CHANGE

function onUpperChange (evt) {
    const { upper } = this.oom.instance
    this.oom.$.main.classList.remove(
        'upper-or','upper-argent','upper-azure','upper-gules'
      , 'upper-purpure','upper-vert','upper-sable')
    this.oom.$.main.classList.add('upper-'+upper)
}

function onLowerChange (evt) {
    const { lower } = this.oom.instance
    this.oom.$.main.classList.remove(
        'lower-or','lower-argent','lower-azure','lower-gules'
      , 'lower-purpure','lower-vert','lower-sable')
    this.oom.$.main.classList.add('lower-'+lower)
}
