// Fireworks effect for index.html
(function(){
  var canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 60%)`;
  }
  function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.color = randomColor();
    this.radius = 2 + Math.random() * 2;
    this.dy = 4 + Math.random() * 2;
    this.exploded = false;
    this.particles = [];
  }
  Firework.prototype.update = function() {
    if (!this.exploded) {
      this.y -= this.dy;
      if (this.y <= this.targetY) {
        this.exploded = true;
        for (let i = 0; i < 30; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    } else {
      this.particles.forEach(p => p.update());
    }
  };
  Firework.prototype.draw = function() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw());
    }
  };
  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 1 + Math.random() * 2;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 2 + Math.random() * 3;
    this.alpha = 1;
  }
  Particle.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= 0.96;
    this.alpha -= 0.015;
  };
  Particle.prototype.draw = function() {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  let fireworks = [];
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) {
      fireworks.push(new Firework());
    }
    fireworks.forEach(fw => {
      fw.update();
      fw.draw();
    });
    fireworks = fireworks.filter(fw => !fw.exploded || fw.particles.some(p => p.alpha > 0));
    requestAnimationFrame(animate);
  }
  animate();
})();
