
import Tesla from './tesla'

var $speed = document.createElement('p')
var $tesla = document.createElement('div')
var $graphics = document.createElement('div')

var tesla = new Tesla()

$tesla.id = 'tesla'
$graphics.classList.add('graphics')

while (document.body.firstChild) {
  document.body.removeChild(document.body.firstChild)
}

$tesla.appendChild($graphics)
document.body.appendChild($speed)
document.body.appendChild($tesla)

window.addEventListener('keydown', onKeydown)
window.addEventListener('keyup', onKeyup)

window.addEventListener('touchstart', onTouchstart)
window.addEventListener('touchend', onTouchend)

function onTouchstart (e) {
  if (e.touches.length === 1) {
    if (e.touches[0].pageY < window.innerHeight / 2) {
      tesla.throttling = true
    } else {
      if (tesla.velocity > 0 || tesla.braking) {
        tesla.braking = true
      } else {
        tesla.reversing = true
      }
    }
  }
}

function onTouchend (e) {
  if (e.touches.length === 1) {
    tesla.throttling = false
    tesla.braking = false
    tesla.reversing = false
  }
}

function onKeydown (e) {
  if (e.which === 38) {
    tesla.throttling = true
    return
  }
  if (e.which === 40) {
    if (tesla.velocity > 0 || tesla.braking) {
      tesla.braking = true
    } else {
      tesla.reversing = true
    }
    return
  }
}

function onKeyup (e) {
  if (e.which === 38) {
    tesla.throttling = false
    return
  }
  if (e.which === 40) {
    tesla.braking = false
    tesla.reversing = false
    return
  }
}

var lastRender = 0

requestAnimationFrame(render)

function render () {
  var now = Date.now()
  var timediff = now - lastRender
  requestAnimationFrame(render)
  tesla.velocityChange(timediff)
  lastRender = now
  if (tesla.y < -window.innerHeight / 2 - 60) {
    tesla.y = window.innerHeight / 2 + 60
  } else if (tesla.y > window.innerHeight / 2 + 60) {
    tesla.y = -window.innerHeight / 2 - 60
  }
  $speed.textContent = (tesla.velocity > 0 ? (tesla.velocity / 0.24 | 0) : 0) + ' km/h'
  $tesla.style.transform = 'translate(0, ' + (tesla.y) + 'px)'
}
