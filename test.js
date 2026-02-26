(function () {
  var IMG_SRC = 'https://raw.githubusercontent.com/D1ov/cdn/main/123.jpg';
  var COUNT = 25;
  var imgs = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawn() {
    var size = rand(30, 200);
    var r = size / 2;
    var img = document.createElement('img');
    img.src = IMG_SRC;
    img.style.cssText =
      'position:fixed;z-index:999999;pointer-events:none;' +
      'width:' + size + 'px;height:auto;will-change:transform;border-radius:50%;';

    var side = Math.floor(Math.random() * 4);
    var x, y, vx, vy, rot, vr;
    var speed = rand(1.5, 4);

    if (side === 0) {
      x = rand(0, innerWidth);
      y = -size;
      vx = rand(-1, 1) * speed;
      vy = speed;
    } else if (side === 1) {
      x = innerWidth + size;
      y = rand(0, innerHeight);
      vx = -speed;
      vy = rand(-1, 1) * speed;
    } else if (side === 2) {
      x = rand(0, innerWidth);
      y = innerHeight + size;
      vx = rand(-1, 1) * speed;
      vy = -speed;
    } else {
      x = -size;
      y = rand(0, innerHeight);
      vx = speed;
      vy = rand(-1, 1) * speed;
    }

    rot = 0;
    vr = rand(-4, 4);

    document.body.appendChild(img);
    imgs.push({ el: img, x: x, y: y, vx: vx, vy: vy, rot: rot, vr: vr, size: size, r: r });
  }

  function collide(a, b) {
    var dx = (a.x + a.r) - (b.x + b.r);
    var dy = (a.y + a.r) - (b.y + b.r);
    var dist = Math.sqrt(dx * dx + dy * dy);
    var minDist = a.r + b.r;

    if (dist < minDist && dist > 0) {
      var nx = dx / dist;
      var ny = dy / dist;

      var dvx = a.vx - b.vx;
      var dvy = a.vy - b.vy;
      var dot = dvx * nx + dvy * ny;

      if (dot > 0) return;

      var massA = a.size;
      var massB = b.size;
      var total = massA + massB;

      var impulseA = 2 * massB / total * dot;
      var impulseB = 2 * massA / total * dot;

      a.vx -= impulseA * nx;
      a.vy -= impulseA * ny;
      b.vx += impulseB * nx;
      b.vy += impulseB * ny;

      a.vr = rand(-6, 6);
      b.vr = rand(-6, 6);

      var overlap = (minDist - dist) / 2;
      a.x += overlap * nx;
      a.y += overlap * ny;
      b.x -= overlap * nx;
      b.y -= overlap * ny;
    }
  }

  function loop() {
    for (var i = 0; i < imgs.length; i++) {
      for (var j = i + 1; j < imgs.length; j++) {
        collide(imgs[i], imgs[j]);
      }
    }

    for (var i = imgs.length - 1; i >= 0; i--) {
      var o = imgs[i];
      o.x += o.vx;
      o.y += o.vy;
      o.rot += o.vr;
      o.el.style.transform =
        'translate(' + o.x + 'px,' + o.y + 'px) rotate(' + o.rot + 'deg)';

      var out =
        o.x < -o.size * 3 ||
        o.x > innerWidth + o.size * 3 ||
        o.y < -o.size * 3 ||
        o.y > innerHeight + o.size * 3;

      if (out) {
        o.el.remove();
        imgs.splice(i, 1);
      }
    }

    while (imgs.length < COUNT) {
      spawn();
    }

    requestAnimationFrame(loop);
  }

  for (var i = 0; i < COUNT; i++) spawn();
  loop();
})();
