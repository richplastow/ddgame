// import config from './config.js'


export function boot() {
    console.log('booted!');
}


const
    $ = document.querySelector.bind(document)
  , $bodyclass = $('body').classList
  , me = { $el:$('#me'), x:0, y:0, z:0, going:null }
  , objects = [ me ]

//// Deal with keypresses.
window.addEventListener('keydown', e => {
    me.going = ({ 38:'n', 39:'e', 40:'s', 37:'w' }[e.keyCode]) || me.going
    $bodyclass.remove('n','e','s','w')
    $bodyclass.add(me.going)
})
window.addEventListener('keyup', e => {
    me.going = null
    $bodyclass.remove('n','e','s','w')
})

//// Modify the scene.
let then
function animate (now) {
    window.requestAnimationFrame(animate)
    if (! then) { then = now; return }
    const diff = now - then
    then = now
    me.x = Math.min( 96, me.x + ('e' === me.going ? diff/10 : 0) )
    me.x = Math.max(  0, me.x - ('w' === me.going ? diff/10 : 0) )
    me.z = Math.min(  0, me.z + ('s' === me.going ? diff/10 : 0) )
    me.z = Math.max(-96, me.z - ('n' === me.going ? diff/10 : 0) )
    me.$el.style.transform = `translate3d(${me.x}vmin,72vmin,${me.z}vmin)`
}
animate()
