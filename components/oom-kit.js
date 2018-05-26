import progress from '../asset/js/progress.js'
progress('components/oom-kit.js')


const parse = {}, update = {}, clamp = {}, vector = {}, geometry = {}, constant = {}




//// DOM

const $ = document.querySelector.bind(document)
const $$ = s => Array.from( document.querySelectorAll(s) )




//// PARSE

//// An ‘enum’ attribute must be one of a set of valid strings.
//// An invalid attribute parses to the first (index 0) element in `valid`.
parse.Enum = function (value, attrName) {
    if (! this.oom.api.members[attrName].valid) console.error(attrName);
    const valid = this.oom.api.members[attrName].valid.split(' ')
    return 0 > valid.indexOf(value) ? valid[0] : value
}

////
parse.Vector = function (value) {
    value = 'object' === typeof value && null !== value ? value : {}
    const { vx, vy, vz } = value
    value.vx = Number(value.vx) || 0
    value.vy = Number(value.vy) || 0
    value.vz = Number(value.vz) || 0
    return value
}




//// UPDATE

update.enum = function (linkedElements) {
    return function (evt) {
        const
            attrName = evt.type.match(/^oom-(.*)-update$/)[1] // eg 'oom-foo-update'
          , { valid } = this.oom.api.members[attrName]
          , value = this.oom.current[attrName] // the 'foo' attribute’s new value
          , toRemove = valid.split(' ').map( v => attrName+'-'+v )
        linkedElements.split(' ').forEach( elName => {
            this.oom.$[elName].classList.remove(...toRemove)
            this.oom.$[elName].classList.add(attrName+'-'+value)
        })
    }
}




//// CLAMP

clamp.unit = function (v) {
    return Math.max( 0, Math.min(1, v) )
}

//// Chrome halts briefly when an element switches from/to zero opacity.
clamp.opacity = function (v) {
    return Math.max( 0.01, Math.min(1, v) )
}

//// Create a custom clamping function.
clamp.factory = function (min, max) {
    return function (v) {
        return Math.max( min, Math.min(max, v) )
    }
}




//// VECTOR

vector.sum = function (diff, { x, y, z }, ...vectors) {
    let vx = 0, vy = 0, vz = 0 //
    // vectors.push({ vx:0.1, vy:0, vz:0.2 })
    vectors.map( ({ vx:VX, vy:VY, vz:VZ }) => { vx += VX, vy += VY, vz += VZ } )
    return { vx, vy, vz }
}




//// GEOMETRY

//// Tests whether a point `p` is inside the bounds of a box at `b`.
geometry.inside = (px, py, pz, bx, by, bz, bw, bh, bd) => {
    if (
        (px >= bx)
     && (px < bx + bw)
     && (py >= by)
     && (py < by + bh)
     && (pz >= bz)
     && (pz < bz + bd)
    ) return true
}




//// CONSTANT

constant.ATTRIBUTE = 'ATTRIBUTE'
constant.STATIC = 'STATIC'


export { $, $$, parse, update, clamp, vector, geometry, constant }
