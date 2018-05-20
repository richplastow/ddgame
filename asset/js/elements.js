import { progress } from './progress.js'; progress('asset/js/elements.js')
import { spawn } from './spawn.js'

const
    $ = document.querySelector.bind(document)
  , $$ = s => Array.from( document.querySelectorAll(s) )
  , $body = document.body
  , $container = $('.oom-container')
  , $camera = $('.oom-camera')
  , $scene = $('.oom-scene')
  , $me = $('#me')
  , $$locations = $$('oom-3-location')
  , $$balloons = [$me]
  , $$clouds = []

export {
    $, $$
  , $body
  , $container, $camera, $scene
  , $$locations, $$balloons, $$clouds
  , $me
}
