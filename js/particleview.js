var ParticleView = function() {

  extend(this, {

    // particle emitter
    emitter: new PointEmitter(),

    // emitter speed
    emitterSpeed: 500,

    // path stuff
    emitterTheta: 0,
    emitterRadius: 200,

    // 60 is fps (i hope)
    dt: 1 / 60

  });

};


extend(ParticleView.prototype, {

  update: function() {
    this.emitterTheta += this.emitterSpeed * this.dt / this.emitterRadius;
    
    extend(this.emitter.position, {
      x: this.emitterRadius * Math.cos(this.emitterTheta),
      y: this.emitterRadius * Math.sin(this.emitterTheta)
    });

    this.emitter.update(this.dt);
    requestAFrame(this.update.bind(this));
  }

});