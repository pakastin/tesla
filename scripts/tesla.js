
export default function Tesla () {
  this.velocity = 0
  this.y = 0
  this.throttling = false
  this.braking = false
}

Tesla.prototype.velocityChange = function (timeDelta) {
  if (this.throttling && this.braking) {
  } else if (this.throttling) {
    this.velocity += 10 / 3 / timeDelta
    if (this.velocity > 62.4) {
      this.velocity = 62.4
    }
  } else if (this.reversing) {
    this.velocity -= 5 / 3 / timeDelta
    if (this.velocity < -6) {
      this.velocity = -6
    }
  } else if (this.braking) {
    if (this.velocity > 0) {
      this.velocity -= 15 / 3 / timeDelta
      if (this.velocity < 0) {
        this.velocity = 0
      }
    }
  } else {
    if (this.velocity > 0) {
      this.velocity -= 0.3 / timeDelta
      if (this.velocity < 0) {
        this.velocity = 0
      }
    } else if (this.velocity < 0) {
      this.velocity += 0.3 / timeDelta
      if (this.velocity > 0) {
        this.velocity = 0
      }
    }
  }
  this.y -= this.velocity
}
