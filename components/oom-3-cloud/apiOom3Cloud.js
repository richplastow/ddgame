import { parse, on } from '../oom-kit.js'
import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Cloud = { name:'oom-3-cloud' }

//// Merge <oom-3> attributes into <oom-3-cloud> attributes.
apiOom3Cloud.attributes = Object.assign({}, apiOom3.attributes, {
    weather: {
        parser: parse.enum
      , onChange: [on.change]
      , valid: ['fair','storm','lightning']
      , linkedElements: ['main','shadow']
    }
})

//// Merge <oom-3> elements into <oom-3-cloud> elements.
apiOom3Cloud.elements = Object.assign({}, apiOom3.elements, {
})

export { apiOom3Cloud }
