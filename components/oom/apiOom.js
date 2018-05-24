//// Tell the progress-bar that this file has loaded.
import { progress } from '../../asset/js/progress.js'
progress('components/oom/apiOom.js')

//// Import the super-class’s API and the Oom toolkit.
import { apiOom } from '../oom/apiOom.js'
import { constant } from '../oom-kit.js'
const { ATTRIBUTE } = constant

//// Define the API.
const api = {
    name: 'oom'
  , elements: {
        wrap: { selector:'.wrap' }
      , main: { selector:'.main' }
    }
  , listeners: {}
  , members: {}
}

//// Export.
export { api as apiOom }
