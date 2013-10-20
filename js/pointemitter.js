var PointEmitter = function() {
  
  extend(this, {
    // dom node to house particles
    el: document.getElementById('container'),

    // particles created per second
    emissionRate: 250,

    // current position of emitter
    position: { x: 0, y: 0 },

    // life & variation in seconds
    particleLife: 0.3,
    particleLifeVariation: 0.2,

    // particle scale & variation
    particleScale: 1,
    particleScaleVariation: 0.5,

    // grow & shrink time in life percentage
    particleGrowRatio: 0.05,
    particleShrinkRatio: 0.4,

    // speed & variation
    particleSpeed: 30,
    particleSpeedVariation: 30,

    // angular velocity variation in degrees per second
    particleOmega: 0,
    particleOmegaVariation: 500,

    // all the currently living particles
    particles: []
  });

};


extend(PointEmitter.prototype, {

  // creates all the particles
  createParticles: function(count, dt) {
    for (var i = 0; i < count; i++) {
      var particle = new Particle();

      this.el.appendChild(particle.el);
      this.particles.push(particle);

      var scale = random(this.particleScale, this.particleScaleVariation);
      var speed = random(this.particleSpeed, this.particleSpeedVariation);
      var life = random(this.particleLife, this.particleLifeVariation);
      var velocityDirectionAngle = random(0, Math.PI);

      extend(particle, {
        // rotation and scale for trailing effect
        rotation: random(0, 180),
        initialScale: scale,
        scale: scale,

        // life, grow and shrink time
        initialLife: life,
        life: life,
        growTime: this.particleGrowRatio * particle.initialLife,
        shrinkTime: this.particleShrinkRatio * particle.initialLife,

        // linear and angular velocity
        vx: speed * Math.cos(velocityDirectionAngle),
        vy: speed * Math.sin(velocityDirectionAngle),
        omega: random(0, this.particleOmegaVariation),

        // particle position
        x: this.position.x,
        y: this.position.y
      });
    }
  },

  // removes dead particles
  removeDeadParticles: function() {
    for (var i = this.particles.length - 1; i > -1; i--) {
      var particle = this.particles[i];

      if (particle.life < 0) {
        particle.el.parentNode.removeChild(particle.el);
        this.particles.splice(i, 1);
      }
    }
  },

  // main update loop
  update: function(dt) {
    var newParticlesPerFrame = this.emissionRate * dt;
    var numNewParticles = Math.abs(newParticlesPerFrame);

    if (Math.random() < newParticlesPerFrame - numNewParticles) {
      ++numNewParticles;
    }

    this.createParticles(numNewParticles, dt);

    each(this.particles, function(particle) {
      particle.update(dt);
    });

    this.removeDeadParticles();
  }

});