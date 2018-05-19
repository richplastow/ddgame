import { parse, on } from '../oom-kit.js'
import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Location = { name:'oom-3-location' }

//// Merge <oom-3> attributes into <oom-3-location> attributes.
apiOom3Location.attributes = Object.assign({}, apiOom3.attributes, {
    windpath: {
        parser: parse.enum
      , onChange: [on.change]
      , valid: ['cyclone', 'anticyclone', 'ns','sn', 'ew','we'
              , 'ne','en', 'es','se', 'sw','ws', 'wn','nw']
      , linkedElements: ['wrap']
    }
})

//// Merge <oom-3> elements into <oom-3-location> elements.
apiOom3Location.elements = Object.assign({}, apiOom3.elements, {
})

export { apiOom3Location }
