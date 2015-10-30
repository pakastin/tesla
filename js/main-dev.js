(function () {
  'use strict';

  function Tesla() {
    this.velocity = 0;
    this.y = 0;
    this.throttling = false;
    this.braking = false;
  }

  Tesla.prototype.velocityChange = function (timeDelta) {
    if (this.throttling && this.braking) {} else if (this.throttling) {
      this.velocity += 10 / 3 / timeDelta;
      if (this.velocity > 62.4) {
        this.velocity = 62.4;
      }
    } else if (this.reversing) {
      this.velocity -= 5 / 3 / timeDelta;
      if (this.velocity < -6) {
        this.velocity = -6;
      }
    } else if (this.braking) {
      if (this.velocity > 0) {
        this.velocity -= 15 / 3 / timeDelta;
        if (this.velocity < 0) {
          this.velocity = 0;
        }
      }
    } else {
      if (this.velocity > 0) {
        this.velocity -= 0.3 / timeDelta;
        if (this.velocity < 0) {
          this.velocity = 0;
        }
      } else if (this.velocity < 0) {
        this.velocity += 0.3 / timeDelta;
        if (this.velocity > 0) {
          this.velocity = 0;
        }
      }
    }
    this.y -= this.velocity;
  };

  var $speed = document.createElement('p');
  var $tesla = document.createElement('div');
  var $graphics = document.createElement('div');

  var tesla = new Tesla();

  $tesla.id = 'tesla';
  $graphics.classList.add('graphics');

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  $tesla.appendChild($graphics);
  document.body.appendChild($speed);
  document.body.appendChild($tesla);

  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);

  function onKeydown(e) {
    if (e.which === 38) {
      tesla.throttling = true;
      return;
    }
    if (e.which === 40) {
      if (tesla.velocity > 0 || tesla.braking) {
        tesla.braking = true;
      } else {
        tesla.reversing = true;
      }
      return;
    }
  }

  function onKeyup(e) {
    if (e.which === 38) {
      tesla.throttling = false;
      return;
    }
    if (e.which === 40) {
      tesla.braking = false;
      tesla.reversing = false;
      return;
    }
  }

  var lastRender = 0;

  requestAnimationFrame(render);

  function render() {
    var now = Date.now();
    var timediff = now - lastRender;
    requestAnimationFrame(render);
    tesla.velocityChange(timediff);
    lastRender = now;
    if (tesla.y < -window.innerHeight / 2 - 60) {
      tesla.y = window.innerHeight / 2 + 60;
    } else if (tesla.y > window.innerHeight / 2 + 60) {
      tesla.y = -window.innerHeight / 2 - 60;
    }
    $speed.textContent = (tesla.velocity > 0 ? tesla.velocity / 0.24 | 0 : 0) + ' km/h';
    $tesla.style.transform = 'translate(0, ' + tesla.y + 'px)';
  }
})();