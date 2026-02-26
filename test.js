(function () {
  var IMG_SRC = 'https://raw.githubusercontent.com/D1ov/cdn/main/123.jpg';
  var COUNT = 25;
  var imgs = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawn() {
    var size = rand(30, 200);
    var img = document.createElement('img');
    img.src = IMG_SRC;
    img.style.cssText =
      'position:fixed;z-index:999999;pointer-events:none;' +
      'width:' + size + 'px;height:auto;will-change:transform;';

    var side = Math.floor(Math.random() * 4);
    var x, y, vx, vy, rot, vr;
    var speed = rand(1.5, 5);

    if (side === 0) {
      x = rand(-size, innerWidth);
      y = -size;
      vx = rand(-1, 1) * speed;
      vy = speed;
    } else if (side === 1) {
      x = innerWidth + size;
      y = rand(-size, innerHeight);
      vx = -speed;
      vy = rand(-1, 1) * speed;
    } else if (side === 2) {
      x = rand(-size, innerWidth);
      y = innerHeight + size;
      vx = rand(-1, 1) * speed;
      vy = -speed;
    } else {
      x = -size;
      y = rand(-size, innerHeight);
      vx = speed;
      vy = rand(-1, 1) * speed;
    }

    rot = 0;
    vr = rand(-4, 4);

    document.body.appendChild(img);
    imgs.push({ el: img, x: x, y: y, vx: vx, vy: vy, rot: rot, vr: vr, size: size });
  }

  function loop() {
    for (var i = imgs.length - 1; i >= 0; i--) {
      var o = imgs[i];
      o.x += o.vx;
      o.y += o.vy;
      o.rot += o.vr;
      o.el.style.transform =
        'translate(' + o.x + 'px,' + o.y + 'px) rotate(' + o.rot + 'deg)';

      var out =
        o.x < -o.size * 2 ||
        o.x > innerWidth + o.size * 2 ||
        o.y < -o.size * 2 ||
        o.y > innerHeight + o.size * 2;

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
