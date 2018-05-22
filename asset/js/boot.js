//@TODO import config from './config.js'
import { progress } from './progress.js'; progress('asset/js/boot.js')
import { state } from './state.js'
import { spawn } from './spawn.js'
import { $body, $me, $scene, $$locations, $$balloons, $$clouds } from './elements.js'

// Boot the app (Firefox is not supported).
if (! document.body.classList.contains('ffx') ) boot()

function boot () {

    //// Start animating 1 second after 'progress' reaches 100%.
    if ( $body.classList.contains('oom-progress-100') )
        setTimeout( () => { state.isAnimating = true }, 1000 )
    else
        window.addEventListener('oom-progress-100'
          , () => { setTimeout( () => { state.isAnimating = true }, 1000 ) } )

    //// Poll for the balloon’s Shadow DOM to be ready. @TODO better than polling?
    new Promise( (resolve, reject) => {
        let iterations = 0, interval = 10
        function pollBalloonReady () {
            setTimeout( function () {
                const $el = document.querySelector('#me')
                if ($el.shadowRoot)
                    resolve()
                else if (100 < ++iterations)
                    reject(`Balloon not ready after ${interval*(iterations-1)}ms`)
                else
                    pollBalloonReady()
            },interval)
        }
        pollBalloonReady()
    })
    .catch(reason => { console.error(reason) })
    .then( () => {

        // const
            // $bodyclass = $('body').classList
          // , me = { $el:$('#me'), going:null,
          //       global: { x:80, y:0, z:20 }
          //     , location: { x:80, y:0, z:20 } // relative to the current location
          //   }

        //// Deal with keypresses.
        // window.addEventListener('keydown', e => {
        //     me.going = ({ 38:'n', 39:'e', 40:'s', 37:'w' }[e.keyCode]) || me.going
        //     $bodyclass.remove('n','e','s','w')
        //     $bodyclass.add(me.going)
        // })
        // window.addEventListener('keyup', e => {
        //     me.going = null
        //     $bodyclass.remove('n','e','s','w')
        // })

        //// Modify the scene.
        let then
        animate()
        function animate (now) {

            window.requestAnimationFrame(animate)
            if (! state.isAnimating) return // eg waiting for progress to reach 100%

            if (! then) { then = now; return }
            const diff = now - then
            then = now

            //// Possibly spawn a balloon or a cloud.
            const randSpawn = Math.random()
            if (0.005 > randSpawn && 10 > $$balloons.length)
                spawn.balloons(1)
            else if (0.03 > randSpawn && 30 > $$clouds.length)
                spawn.clouds(1)

            //// Trigger the `tick()` method of any element which needs it.
            triggerTicks(now)
            //
            // //// Update clouds and balloons’ locations - they may have crossed a
            // //// boundary on the last frame.
            // resetTargets()
            // updateLocations()
            //
            // //// Apply various forces.
            // applyWind(diff)
            // applyMomentum(diff)
            // applyBurner(diff)
            // applyGuards(diff)
            //
            // //// Move all clouds and balloons to their new positions.
            // updatePositions()

            ////
            // animateGameplay(me, diff)

            //// Firefox-only...
            if (! $scene) {
                tweenCamera(diff)
                tweenLocations(diff)
            }

        }
    })
}


//// Triggers the `tick()` method of any element which needs it.
function triggerTicks (now) {
    const fn = $el => {
        const { metabolism, prevTick } = $el.oom.current
        if ( prevTick + metabolism < now)
            $el.dispatchEvent( new CustomEvent('tick', { detail:now }) )
    }
    $$balloons.map(fn)
    $$clouds.map(fn)
}

function resetTargets () {
    const fn = $el => $el.oom.target = Object.assign({}, $el.oom.instance)
    $$balloons.map(fn)
    $$clouds.map(fn)
}

/*
function updateLocations () {
    const inBounds = (elX, elZ, locX, locZ) => {
        if (
            (elX > locX)
         && (elZ > locZ - 50)
         && (elX < locX + 100)
         && (elZ < locZ + 50)
        ) return true
    }
    const fn = $el => {
        const
            { misc } = $el.oom
          , { x:elX, z:elZ } = $el.oom.instance
          , { x:currLocX, z:currLocZ } =
                misc.$location ? misc.$location.oom.instance : { x:9e9, z:9e9 }

        //// Usually, an element is still in the same location as before.
        if ( inBounds(elX, elZ, currLocX, currLocZ) ) return

        //// Otherwise, search for the location.
        misc.$location = null // signifies not in any location... oops!
        for (let i=0; i<$$locations.length; i++) {
            const
                $location = $$locations[i]
              , { x:locX, z:locZ } = $location.oom.instance
            if ( inBounds(elX, elZ, locX, locZ) ) {
                misc.$location = $location
                // console.log( $el.id + ' is now in ' + misc.$location.getAttribute('windpath') );
                break
            }
        }
    }
    $$balloons.map(fn)
    $$clouds.map(fn)
}

function applyWind (diff) {
    // const
    //     camX = state.camera.current.translate.x
    //   , camZ = state.camera.current.translate.z
    const fn = $el => {
        if (! $el.oom.misc.$location) return // not in any location!
        const
            { target, instance, misc } = $el.oom
          , windpath = misc.$location.getAttribute('windpath')
          , relX = (instance.x + 1e9) % 100 // eg -1 -> 99
          , relZ = (instance.z + 1e9) % 100
          , { vx, vz } = getWindVector(diff, windpath, relX, relZ)
        target.x = instance.x + vx
        target.z = instance.z + vz
        // document.title = target.x + ' ' + instance.x + ' ' + vx
    }
    $$balloons.map(fn)
    $$clouds.map(fn)
}

function applyMomentum(diff) { }
function applyBurner(diff) { }
function applyGuards(diff) { }

function updatePositions() {
    const fn = $el => {
        const { target, instance } = $el.oom
        if (target.x !== instance.x)
            $el.setAttribute('x', target.x)
        if (target.z !== instance.z)
            $el.setAttribute('z', target.z)
    }
    $$balloons.map(fn)
    $$clouds.map(fn)
}
*/



function animateGameplay (me, diff) {

    //// Apply keyboard controls
    // me.global.x = Math.min( 96, me.global.x + ('e' === me.going ? diff/10 : 0) )
    // // me.global.x = Math.max(  0, me.global.x - ('w' === me.going ? diff/10 : 0) )
    // me.global.x = me.global.x - ('w' === me.going ? diff/10 : 0)
    // me.global.z = Math.min( 96, me.global.z + ('n' === me.going ? diff/10 : 0) )
    // me.global.z = Math.max(  0, me.global.z - ('s' === me.going ? diff/10 : 0) )
    me.global.x = me.global.x + ('e' === me.going ? diff/10 : 0)
    me.global.x = me.global.x - ('w' === me.going ? diff/10 : 0)
    me.global.z = me.global.z + ('n' === me.going ? diff/10 : 0)
    me.global.z = me.global.z - ('s' === me.going ? diff/10 : 0)

    //// Apply the prevailing windforce.
    // me.global.x -= diff/300
    // me.global.z += diff/300

    //// Get the position relative to the current location.
    me.location.x = me.global.x - state.camera.current.translate.x
    me.location.z = me.global.z - state.camera.current.translate.z

    //// Apply impassable location boundaries.
    const currWindpath = $$locations[state.locationIndex].getAttribute('windpath')
    if ( 'cyclone' === currWindpath ) {
        me.location.x = Math.min(96, me.location.x)
        me.location.x = Math.max( 0, me.location.x)
        me.location.z = Math.min(96, me.location.z)
        me.location.z = Math.max( 0, me.location.z)
    } else if ( 'w-n' === currWindpath ) {
        me.location.x = Math.min(96, me.location.x)
        me.location.z = Math.max( 0, me.location.z)
    } else if ( 'n-e' === currWindpath ) {
        me.location.x = Math.max( 0, me.location.x)
        me.location.z = Math.max( 0, me.location.z)
    }

    //// Convert global coordinates to coordinates relative to the location.
    me.location.x = state.camera.current.translate.x + me.global.x
    me.location.z = state.camera.current.translate.z + me.global.z

    ////
    if ( me.location.x != me.$el.getAttribute('x') )
        me.$el.setAttribute('x', me.location.x)
    if ( me.location.z != me.$el.getAttribute('z') )
        me.$el.setAttribute('z', me.location.z)

    //// Detect crossing a location boundary.
    if (0 > me.global.x && 0 === state.locationIndex) {
        state.locationIndex = 1
        if ($scene)
            $scene.style.transform = `translate3d(100vmin, 0, 0)`
        else
            state.camera.target.translate.x += 100
    } else if (0 < me.global.x && 1 === state.locationIndex) {
        state.locationIndex = 0
        if ($scene)
            $scene.style.transform = `translate3d(0vmin, 0, 0)`
        else
            state.camera.target.translate.x -= 100
    }

}





function tweenCamera (diff) {
    const
        currT = state.camera.current.translate
      , currR = state.camera.current.rotate
      , { x:currTX, y:currTY, z:currTZ } = currT
      , { x:targTX, y:targTY, z:targTZ } = state.camera.target.translate
      , { x:currRX, y:currRY, z:currRZ } = currR
      , { x:targRX, y:targRY, z:targRZ } = state.camera.target.rotate
      , dTX = currTX - targTX
      , dTY = currTY - targTY
      , dTZ = currTZ - targTZ
      , dRX = currRX - targRX
      , dRY = currRY - targRY
      , dRZ = currRZ - targRZ

    if (0.01 > dTX && -0.01 < dTX)
        currT.x = targTX
    else
        currT.x = (currTX * 7 + targTX) / 8 //@TODO use `diff`

    if (0.01 > dTY && -0.01 < dTY)
        currT.y = targTY
    else
        currT.y = (currTY * 7 + targTY) / 8 //@TODO use `diff`

    if (0.01 > dTZ && -0.01 < dTZ)
        currT.z = targTZ
    else
        currT.z = (currTZ * 7 + targTZ) / 8 //@TODO use `diff`

}


function tweenLocations (diff) { //@TODO use `diff`
    const
        currT = state.camera.current.translate
      , { x:currTX, y:currTY, z:currTZ } = currT
    $$locations.forEach( $location => {
        $location.setAttribute('x', $location.oom.initially.x + currTX)
        $location.setAttribute('z', $location.oom.initially.z + currTZ)
    })
}

//// Define helper functions for the various kinds of windpath.
const

    //// Curved windpaths.
    getDxs = { // distance on the x-axis from the location’s corner to the point
        nw: x => x
      , en: x => 100-x
      , se: x => 100-x
      , ws: x => x
    }
  , getDzs = { // distance on the z-axis from the location’s corner to the point
        nw: z => 100-z
      , en: z => 100-z
      , se: z => z
      , ws: z => z
    }
  , getTooCloseVectors = { // push the point away from the location’s corner
        nw: dc => { const m=40-dc; return { vx: m/5e3, vz:-m/5e3 } } //magnitude
      , en: dc => { const m=40-dc; return { vx:-m/5e3, vz:-m/5e3 } }
      , se: dc => { const m=40-dc; return { vx:-m/5e3, vz: m/5e3 } }
      , ws: dc => { const m=40-dc; return { vx: m/5e3, vz: m/5e3 } }
    }
  , getTooFarVectors = { // push the point away from the location’s outer-rim
        nw: (dc,dx,dz) => { const m=dc-90; return { vx:-m*dx/5e5, vz: m*dz/5e5 } }
      , en: (dc,dx,dz) => { const m=dc-90; return { vx: m*dx/5e5, vz: m*dz/5e5 } }
      , se: (dc,dx,dz) => { const m=dc-90; return { vx: m*dx/5e5, vz:-m*dz/5e5 } }
      , ws: (dc,dx,dz) => { const m=dc-90; return { vx:-m*dx/5e5, vz:-m*dz/5e5 } }
    }
  , getInsideLaneVectors = { // note 4e3 vs 5e3
        nw: (dx,dz) => { return { vx:-dz/5e3, vz:-dx/4e3 } }
      , wn: (dx,dz) => { return { vx: dz/5e3, vz: dx/4e3 } }
      , en: (dx,dz) => { return { vx:-dz/4e3, vz: dx/5e3 } }
      , ne: (dx,dz) => { return { vx: dz/4e3, vz:-dx/5e3 } }
      , se: (dx,dz) => { return { vx: dz/5e3, vz: dx/4e3 } } //wn
      , es: (dx,dz) => { return { vx:-dz/5e3, vz:-dx/4e3 } } //nw
      , ws: (dx,dz) => { return { vx: dz/4e3, vz:-dx/5e3 } } //ne
      , sw: (dx,dz) => { return { vx:-dz/4e3, vz: dx/5e3 } } //en
    }
  , getOutsideLaneVectors = { // note 4e3 vs 5e3
        nw: (dx,dz) => { return { vx:-dz/4e3, vz:-dx/5e3 } }
      , wn: (dx,dz) => { return { vx: dz/4e3, vz: dx/5e3 } }
      , en: (dx,dz) => { return { vx:-dz/5e3, vz: dx/4e3 } }
      , ne: (dx,dz) => { return { vx: dz/5e3, vz:-dx/4e3 } }
      , se: (dx,dz) => { return { vx: dz/4e3, vz: dx/5e3 } } //wn
      , nw: (dx,dz) => { return { vx:-dz/4e3, vz:-dx/5e3 } } //nw
      , ws: (dx,dz) => { return { vx: dz/5e3, vz:-dx/4e3 } } //ne
      , sw: (dx,dz) => { return { vx:-dz/5e3, vz: dx/4e3 } } //en
    }

    //// Linear windpaths.
  , getDs = {
        sn: (x, z) => x
      , we: (x, z) => z
    }
  , getTooEdgyVectors = {
        sn: d => {
            if (10 > d)
                return { vx: (40-d)/5e3, vz:1/5e3 } //@TODO magnitude
            else // 90 < d
                return { vx:-(d-60)/5e3, vz:1/5e3 } //@TODO magnitude
        }
      , ns: d => {
            if (10 > d)
                return { vx: (40-d)/5e3, vz:-1/5e3 } //@TODO magnitude
            else // 90 < d
                return { vx:-(d-60)/5e3, vz:-1/5e3 } //@TODO magnitude
        }
      , we: d => {
            if (10 > d)
                return { vx: 1/5e3, vz: (40-d)/5e3 } //@TODO magnitude
            else // 90 < d
                return { vx: 1/5e3, vz:-(d-60)/5e3 } //@TODO magnitude
        }
      , ew: d => {
            if (10 > d)
                return { vx:-1/5e3, vz: (40-d)/5e3 } //@TODO magnitude
            else // 90 < d
                return { vx:-1/5e3, vz:-(d-60)/5e3 } //@TODO magnitude
        }
    }
  , getLinearVectors = {
        sn: d => { return { vx:0, vz: 1/1e2 } } //@TODO magnitude, and drift inwards
      , ns: d => { return { vx:0, vz:-1/1e2 } } //@TODO magnitude, and drift inwards
      , we: d => { return { vx: 1/1e2, vz:0 } } //@TODO magnitude, and drift inwards
      , ew: d => { return { vx:-1/1e2, vz:0 } } //@TODO magnitude, and drift inwards
    }

//// Duplicate some helper functions.
getDxs.wn = getDxs.nw
getDxs.ne = getDxs.en
getDxs.es = getDxs.se
getDxs.sw = getDxs.ws
getDzs.wn = getDzs.nw
getDzs.ne = getDzs.en
getDzs.es = getDzs.se
getDzs.sw = getDzs.ws
getTooCloseVectors.wn = getTooCloseVectors.nw
getTooCloseVectors.ne = getTooCloseVectors.en
getTooCloseVectors.es = getTooCloseVectors.se
getTooCloseVectors.sw = getTooCloseVectors.ws
getTooFarVectors.wn = getTooFarVectors.nw
getTooFarVectors.ne = getTooFarVectors.en
getTooFarVectors.es = getTooFarVectors.se
getTooFarVectors.sw = getTooFarVectors.sw
getDs.ns = getDs.sn
getDs.ew = getDs.we


//// Windpaths push balloons towards the middle track, where the airstream is
//// fastest.
function curvedWindVectorFnFactory (windpath) {

    //// Choose the appropriate helpers for this windpath.
    const
        getDx = getDxs[windpath]
      , getDz = getDzs[windpath]
      , getTooCloseVector = getTooCloseVectors[windpath]
      , getTooFarVector = getTooFarVectors[windpath]
      , getInsideLaneVector = getInsideLaneVectors[windpath]
      , getOutsideLaneVector = getOutsideLaneVectors[windpath]

    //// Create and return the windVectorFn().
    return (x, z) => {
        const
            dx = getDx(x)
          , dz = getDz(z)
          , dc = Math.sqrt(dx*dx + dz*dz) // distance to corner - ta pythagoras!

        //// Too close to the corner.
        if (20 > dc) {
            // document.title = 'too close: ' + dc
            return getTooCloseVector(dc)
        }

        //// Too far from the corner.
        if (100 < dc) {
            // document.title = 'too far: ' + dc
            return getTooFarVector(dc,dx,dz)
        }

        //// In the inside lane - drift outwards.
        if (60 > dc) {
            // document.title = 'inside lane: ' + dc
            return getInsideLaneVector(dx,dz)
        }

        //// In the outside lane - drift inwards.
        // document.title = 'outside lane: ' + dc
        return getOutsideLaneVector(dx,dz)
    }

}


function linearWindVectorFnFactory (windpath) {

    //// Choose the appropriate helpers for this windpath.
    const
        getD = getDs[windpath]
      , getTooEdgyVector = getTooEdgyVectors[windpath]
      , getLinearVector = getLinearVectors[windpath]

    //// Create and return the windVectorFn().
    return (x, z) => {

        const d = getD(x, z)

        //// Too close to an edge.
        if (10 > d || 90 < d) {
            // document.title = 'too edgy: ' + d
            return getTooEdgyVector(d)
        }

        //// In the proper area - drift inwards.
        // document.title = 'proper lane: ' + d
        return getLinearVector(d)
    }

}


function circularWindVectorFnFactory (windpath) {

    //// `c` reverses wind direction for anticyclones.
    const
        c = 'anticyclone' === windpath ? 1 : -1
      , drift1 = 'anticyclone' === windpath ? 5e3 : 4e3
      , drift2 = 'anticyclone' === windpath ? 4e3 : 5e3

    //// Create and return the windVectorFn().
    return (x, z) => {
        let
            sdx = 50 - x // signed x-distance from center to point
          , sdz = 50 - z
          , dc = Math.sqrt(sdx*sdx + sdz*sdz) // distance to center


        //// Don’t get stuck in the exact center!
        if (1 > dc)
            x = 51, z = 51, sdx = sdz = 1, dc = Math.sqrt(2)

        //// Too far from the center.
        if (50 < dc) {
            // document.title = 'too far from center: ' + dc
            const
                m = dc - 40 // 71 -> 31, 50 -> 10
              , sx = x < 50 ? +1 : -1 // for pushing towards the center
              , sz = z < 50 ? +1 : -1
            return {
                vx: sx * m * dc / 5e5
              , vz: sz * m * dc / 5e5
            }
        }

        //   NW    |
        //         |     NE
        //         |
        // --------+--------
        //         |
        //         |
        //     SW  |  SE
        //
        // NEx=80, NEz=70, NEdx=+30, NEdz=+20, NEvx=+0.2, NEvz=-0.3, +, -
        // SEx=60, SEz=10, SEdx=+10, SEdz=-40, SEvx=-0.4, SEvz=-0.1, +, -
        // NWx=20, NWz=90, NWdx=-30, NWdz=+40, NWvx=+0.4, NWvz=+0.3, +, -
        // SWx=30, SWz=10, SWdx=-20, SWdz=-40, SWvx=-0.4, SWvz=+0.2, +, -

        //// In the inside lane - drift outwards.
        if (30 > dc) {
            // document.title=`${50<x?50<z?'NE':'SE':50<z?'NW':'SW'} inside lane: `+dc
            return 50 < x ? 50 < z
              ?
                    { vx: c * sdz / drift1, vz: c * -sdx / drift2 } // NE
                  : { vx: c * sdz / drift2, vz: c * -sdx / drift1 } // SE
              : 50 < z
                  ? { vx: c * sdz / drift2, vz: c * -sdx / drift1 } // NW
                  : { vx: c * sdz / drift1, vz: c * -sdx / drift2 } // SW
        }

        //// In the outside lane - drift inwards.
        // document.title=`${50<x?50<z?'NE':'SE':50<z?'NW':'SW'} outside lane: `+dc
        return 50 < x ? 50 < z
          ?
                { vx: c * sdz / drift2, vz: c * -sdx / drift1 } // NE
              : { vx: c * sdz / drift1, vz: c * -sdx / drift2 } // SE
          : 50 < z
              ? { vx: c * sdz / drift1, vz: c * -sdx / drift2 } // NW
              : { vx: c * sdz / drift2, vz: c * -sdx / drift1 } // SW

    }

}


//// Generate all functions to calculate wind-vectors as the app initialises.
const windVectorFns = {
    nw: curvedWindVectorFnFactory('nw')
  , wn: curvedWindVectorFnFactory('wn')
  , en: curvedWindVectorFnFactory('en')
  , ne: curvedWindVectorFnFactory('ne')
  , se: curvedWindVectorFnFactory('se')
  , es: curvedWindVectorFnFactory('es')
  , ws: curvedWindVectorFnFactory('ws')
  , sw: curvedWindVectorFnFactory('sw')

  , sn: linearWindVectorFnFactory('sn')
  , ns: linearWindVectorFnFactory('ns')
  , we: linearWindVectorFnFactory('we')
  , ew: linearWindVectorFnFactory('ew')

  , cyclone: circularWindVectorFnFactory('cyclone')
  , anticyclone: circularWindVectorFnFactory('anticyclone')
}


//// `x` and `z` should be relative to the current location.
function getWindVector (diff, windpath, x, z) {
    diff *= 4
    if (! windVectorFns[windpath]) {
        state.isAnimating = false
        return console.error(`No such windVectorFns.${windpath}()`)
    }
    const { vx, vz } = windVectorFns[windpath](x, z)
    // if (0.008 > vx && -0.008 < vx && 0.008 > vz && -0.008 < vz)
    //     console.error(`Stuck? ${vx} ${vz}`);
    return { vx:vx*diff, vz:vz*diff }
    // return { vx:0.01, vz:0.02}
}
