var Particle = function() {

  extend(this, {

    // visual representation of particle
    el: (function() {
      var el = document.createElement('div');
      el.className = 'particle';
      return el;
    }()),

    // current and initial life in seconds
    initialLife: 0,
    life: 0,

    // grow time in seconds
    growTime: 0,

    // shrink time in seconds
    shrinkTime: 0,

    // current position of particle
    x: 0,
    y: 0,

    // linear velocity
    vx: 0,
    vy: 0,

    // current rotation of particle
    rotation: 0,

    // angular velocity
    omega: 0,

    // current & initial scale of particle
    initialScale: 0,
    scale: 0

  });

};


extend(Particle.prototype, {

  update: function(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.rotation += this.omega * dt;
    this.life -= dt;

    if (this.life > this.initialLife - this.growTime) {
      this.scale = lerp(0, this.initialScale, (this.initialLife - this.life) / this.growTime);
    } else if (this.life < this.shrinkTime) {
      this.scale = lerp(this.initialScale, 0, (this.shrinkTime - this.life) / this.shrinkTime);
    } else {
      this.scale = this.initialScale;
    }

    this.el.style[transform] =
      'translate(' + this.x + 'px, ' + this.y + 'px) ' +
      'rotate(' + this.rotation + 'deg) ' +
      'scale(' + this.scale + ')';
  }

});