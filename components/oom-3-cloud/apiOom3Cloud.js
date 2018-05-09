import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Cloud = { name:'oom-3-cloud' }

//// Merge <oom-3> attributes into <oom-3-cloud> attributes.
apiOom3Cloud.attributes = Object.assign(apiOom3.attributes, {
    flavour: { parser: parseFlavour }
})

//// Merge <oom-3> elements into <oom-3-cloud> elements.
apiOom3Cloud.elements = apiOom3.elements.concat([
])

export { apiOom3Cloud }




//// UTILITY

function parseFlavour (value) {
    const
        flavour = value || ''
      , flavours = [
            'chocolate' // default
          , 'berry'
          , 'apple'
        ]
    return 0 > flavours.indexOf(flavour) ? flavours[0] : flavour
}
