import { progress } from '../../asset/js/progress.js'
progress('components/oom-3-location/vectorAtPoint.js')




//// HELPERS

const

    //// Helpers for curved windpaths.
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

    //// Helpers for linear windpaths.
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

    //// Helpers for circular windpaths.
    //@TODO

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
function curvedVectorFnFactory (windpath) {

    //// Choose the appropriate helpers for this windpath.
    const
        getDx = getDxs[windpath]
      , getDz = getDzs[windpath]
      , getTooCloseVector = getTooCloseVectors[windpath]
      , getTooFarVector = getTooFarVectors[windpath]
      , getInsideLaneVector = getInsideLaneVectors[windpath]
      , getOutsideLaneVector = getOutsideLaneVectors[windpath]

    //// Create and return the vectorFn().
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


function linearVectorFnFactory (windpath) {

    //// Choose the appropriate helpers for this windpath.
    const
        getD = getDs[windpath]
      , getTooEdgyVector = getTooEdgyVectors[windpath]
      , getLinearVector = getLinearVectors[windpath]

    //// Create and return the vectorFn().
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


function circularVectorFnFactory (windpath) {

    //// `c` reverses wind direction for anticyclones.
    const
        c = 'anticyclone' === windpath ? 1 : -1
      , drift1 = 'anticyclone' === windpath ? 5e3 : 4e3
      , drift2 = 'anticyclone' === windpath ? 4e3 : 5e3

    //// Create and return the vectorFn().
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
const vectorFns = {
    nw: curvedVectorFnFactory('nw')
  , wn: curvedVectorFnFactory('wn')
  , en: curvedVectorFnFactory('en')
  , ne: curvedVectorFnFactory('ne')
  , se: curvedVectorFnFactory('se')
  , es: curvedVectorFnFactory('es')
  , ws: curvedVectorFnFactory('ws')
  , sw: curvedVectorFnFactory('sw')

  , sn: linearVectorFnFactory('sn')
  , ns: linearVectorFnFactory('ns')
  , we: linearVectorFnFactory('we')
  , ew: linearVectorFnFactory('ew')

  , cyclone: circularVectorFnFactory('cyclone')
  , anticyclone: circularVectorFnFactory('anticyclone')
}


//// `ex`, `ey` and `ez` are the entity’s absolute position.
function vectorAtPoint (diff, ex, ey, ez) {
// diff *= 4
    const
        { x:lx, y:ly, z:lz, windpath } = this.oom.current
      , rx = ex - lx // entity position relative to this location
      , ry = ey - ly
      , rz = ez - lz
      , vectorFn = vectorFns[windpath]

    if (! vectorFn) throw Error(`No such vectorFns.${windpath}()`)//@TODO remove - probably not possible

    const { vx, vz } = vectorFns[windpath](rx, rz)
    // if (0.008 > vx && -0.008 < vx && 0.008 > vz && -0.008 < vz)
    //     console.error(`Stuck? ${vx} ${vz}`);
// document.title = `${windpath}  ${~~ex},${~~ey},${~~ez}  ${~~rx},${~~ry},${~~rz}  ${vx*diff},-,${vz*diff}`
    return { vx:vx*diff, vy:0, vz:vz*diff }
    // return { vx:0.01, vy:0, vz:0.02}
}


export { vectorAtPoint }
