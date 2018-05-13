import { apiOom3 } from '../oom-3/apiOom3.js'

const apiOom3Cloud = { name:'oom-3-cloud' }

//// Merge <oom-3> attributes into <oom-3-cloud> attributes.
apiOom3Cloud.attributes = Object.assign({}, apiOom3.attributes, {
    weather: { parser: parseWeather, onChange:[onWeatherChange]
      , valid:['fair','storm','lightning'] }
})

//// Merge <oom-3> elements into <oom-3-cloud> elements.
apiOom3Cloud.elements = Object.assign({}, apiOom3.elements, {
})

export { apiOom3Cloud }




//// PARSERS

function parseWeather (value) {
    const valid = apiOom3Cloud.attributes.weather.valid
    return 0 > valid.indexOf(value) ? valid[0] : value
}




//// ON ATTRIBUTE CHANGE

function onWeatherChange (evt) {
    const { weather } = this.oom.instance
    this.oom.$.main.classList.remove(
        'weather-fair','weather-storm','weather-lightning')
    this.oom.$.main.classList.add('weather-'+weather)
    this.oom.$.shadow.classList.remove(
        'weather-fair','weather-storm','weather-lightning')
    this.oom.$.shadow.classList.add('weather-'+weather)
}
