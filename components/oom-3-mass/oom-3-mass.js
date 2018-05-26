import parentApi from '../oom-3/oom-3.js'
import { $$, parse, constant, update, clamp, vector, geometry } from '../oom-kit.js'
const { Enum, Vector } = parse, { ATTRIBUTE } = constant

//// Define the API, including the class.
const api = {
    Class: class Oom3Location extends parentApi.Class {}
  , title: 'Oom3Mass'
  , tag: 'oom-3-mass'
  , parentApi
  , elements: {
        hitzone:    { selector:'.hitzone' }
      , silhouette: { selector:'.silhouette' }
      , surround:   { selector:'.surround' }
      , ground:     { selector:'.ground' }
      , shadow:     { selector:'.shadow' }
      , marker:     { selector:'.marker' }
    }
  , listeners: {
        'tick':  { fn:onTick, targets:'this' }
      , 'click': { fn (e) { this.setAttribute('y', -2) }, targets:'hitzone' }
    }
  , members: {

        //// Attributes.
        metabolism: { Metabolism, ATTRIBUTE, updaters:'updateMetabolism' }
      , marker: { Enum, ATTRIBUTE
          , valid: 'none red green blue'
          , updaters: update.enum('marker')
        }

        //// Attribute updater handlers.
      , updateXYZ // override `updateXYZ()` defined in <oom-3>
      , updateZ // override `updateZ()` defined in <oom-3>
      , updateMetabolism

        //// Properties.
      , prevTick:  { Number }
      , $location: { Location }
      , momentum:  { Vector }

        //// Other methods.
      , updateLocation
      , updateVisibility

    }
}




//// ATTRIBUTE-UPDATE HANDLERS

function updateXYZ (evt) {
    const { x, y, z } = this.oom.current
    this.oom.$.wrap.style.transform =
        `translate3d(${x}vmin, ${y+72}vmin, ${-z}vmin)`
    this.oom.$.ground.style.transform =
        `translate3d(${x}vmin, 72vmin, ${-z}vmin)`
}

function updateZ (evt) { //@TODO relative to camera
    const { z } = this.oom.current
    this.oom.$.wrap.style.zIndex = 97 - ~~z
    this.oom.$.silhouette.style.opacity = clamp.opacity(z / 200) // fog effect on top of .main
    this.oom.$.shadow.style.opacity = clamp.opacity( (200-z) / 200 ) // fog effect on .shadow
}




//// METHODS

////
function updateLocation () {
    const
        { current } = this.oom
      , { x, y, z, $location } = current
      , { x:lx, y:ly, z:lz } = $location ? $location.oom.current
          : { x:9e9, y:9e9, z:9e9 } // rarely, the entity is not in a location

    //// Usually, a mass is still in the same location as before.
    if ( geometry.inside(x, y, z, lx, ly, lz, 100, 100, 100) ) return

    //// Otherwise, search for the location. @TODO deal with overlapping locations
    const $$locations = $$('oom-3-location')
    current.$Location = null // signifies not in any location
    for (let i=0; i<$$locations.length; i++) {
        const
            $location = $$locations[i]
          , { x:lx, y:ly, z:lz } = $location.oom.current
        if ( geometry.inside(x, y, z, lx, ly, lz, 100, 100, 100) ) {
            current.$location = $location
            // console.log(
            //     '#' + this.id + ' is now in '
            //   + current.$location.getAttribute('windpath')
            //   + ', momentum: ('
            //   + current.momentum.vx + ', '
            //   + current.momentum.vy + ', '
            //   + current.momentum.vz
            //   + ')'
            // );
            break
        }
    }

    ////@TODO remove this?
    // $$locations.map( $location => $location.oom.$.main.style.opacity = '0.5' )
    // if (current.$location) {
    //     current.$location.oom.$.main.style.opacity = 1
    // }

}


//// Deletes, hides, or (if it was previously hidden) shows the mass, depending
//// on its distance to the camera.
function updateVisibility () {
    const
        { deleteDistance, hideDistance } = this.oom.Class
      , cameraDistance = 123

    //// Delete the mass if it’s too far from the camera.
    if ('me' === this.id) console.log(deleteDistance, cameraDistance)
}




//// PARSERS

//// Does the same job as `parse.number()`, but defaults to a random integer
//// between 20 and 30 if `value` is falsey.
function Metabolism (value) {
    // return +value || ~~(Math.random() * 20 + 10)
    return +value || ~~(Math.random() * 200 + 1000)
}

function Location (value) { //@TODO parse properly
    return value || null//{ oom: { current: { x:9e9, y:9e9, z:9e9, windpath:'none' } } }
}




//// ATTRIBUTE-UPDATE HANDLERS

function updateMetabolism (evt) {
    const { metabolism } = this.oom.current
    // this.oom.$.wrap.style.transition =
    // this.oom.$.ground.style.transition =
    //     `transform ${metabolism-5}ms linear`
    // this.oom.$.silhouette.style.transition =
    //     `opacity ${metabolism-5}ms linear`
    // this.oom.$.shadow.style.transition =
    //     `opacity ${metabolism-5}ms linear`
}




//// TICK HANDLERS

function onTick (evt) {
    const
        { current } = this.oom
      , { x, y, z, $location, momentum } = current
      , now = evt.detail
      , diff = now - current.prevTick
      , wind = $location ? $location.oom.vectorAtPoint(diff, x, y, z)
          : { vx:0, vy:0, vz:0 } // rarely, the entity is not in a location

    //// Prepare this entity for its next tick.
    current.prevTick = now

    //// Resolve all forces acting on the entity.
    let { vx, vy, vz } = vector.sum(
        diff // tell `vector.sum()` the number of ms we’re operating over
      , current // start with this entity’s current position
      , momentum // apply this entity’s motion, if any
      , wind // apply the local wind’s force and direction
    )

    const
        friction = diff * 0.03 // 1 is outer space, 0 stops all movement
      , clampLevel = diff
      , momentumClamp = clamp.factory(-clampLevel, clampLevel)

    vx = ( 0 < vx ? Math.log1p(vx/friction) : -Math.log1p(-vx/friction) ) * friction
    vz = ( 0 < vz ? Math.log1p(vz/friction) : -Math.log1p(-vz/friction) ) * friction

    //// Update this entity’s `momentum` object (replacing it would incur
    //// garbage-collection costs), and also update its position.
    momentum.vx = vx, momentum.vy = vy, momentum.vz = vz
    this.setAttribute('x', x + vx)
    this.setAttribute('y', y + vy)
    this.setAttribute('z', z + vz)

    //// The mass may have changed locations, or may not be in any location.
    this.oom.updateLocation()

    //// Depending on its new distance from the camera, the mass may need to be
    //// deleted, hidden, or (if it was previously hidden) shown.
    this.oom.updateVisibility()
}




//// BOILERPLATE

//// Merge with the super-class’s API.
api.elements  = Object.assign({}, parentApi.elements , api.elements)
api.listeners = Object.assign({}, parentApi.listeners, api.listeners)
api.members   = Object.assign({}, parentApi.members  , api.members)

//// Define the class’s custom element, and create its static `OOM` namespace.
api.Class.oomInit(api)

//// Finally, tell the progress-bar this file has loaded, and export the API.
import progress from '../../asset/js/progress.js'; progress(api.tag)
export default api
