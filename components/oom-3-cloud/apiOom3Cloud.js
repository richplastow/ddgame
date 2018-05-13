import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Cloud = { name:'oom-3-cloud' }

//// Merge <oom-3> attributes into <oom-3-cloud> attributes.
apiOom3Cloud.attributes = Object.assign(apiOom3.attributes, {
    weather: { parser: parseWeather, valid:['fair','storm','lightning'] }
})

//// Merge <oom-3> elements into <oom-3-cloud> elements.
apiOom3Cloud.elements = apiOom3.elements.concat([
])

export { apiOom3Cloud }




//// UTILITY

function parseWeather (value) {
    const valid = apiOom3Cloud.attributes.weather.valid
    return 0 > valid.indexOf(value) ? valid[0] : value
}
