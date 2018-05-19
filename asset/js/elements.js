import { spawn } from './spawn.js'

const
    $ = document.querySelector.bind(document)
  , $$ = s => Array.from( document.querySelectorAll(s) )
  , $container = $('.oom-container')
  , $camera = $('.oom-camera')
  , $scene = $('.oom-scene')
  , $me = $('#me')
  , $$locations = $$('oom-3-location')
  , $$balloons = [$me]
  , $$clouds = []

export {
    $, $$
  , $container, $camera, $scene
  , $$locations, $$balloons, $$clouds
  , $me
}
