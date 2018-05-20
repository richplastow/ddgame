import { progress } from './progress.js'; progress('asset/js/state.js')

const state = {
    camera: {
        current: { translate: { x:0, y:0, z:0 }, rotate: { x:0, y:0, z:0 } }
      , target:  { translate: { x:0, y:0, z:0 }, rotate: { x:0, y:0, z:0 } }
    }
  , locationIndex: 0
  , isAnimating: false // boot.js changes this to `true` when progress is 100%
}

export { state }
