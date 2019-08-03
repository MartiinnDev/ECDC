import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmokeService {

  constructor() { }
  

  start(){
    
    (function () {
      var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  var canvas1 = <HTMLCanvasElement> document.getElementById("canvas1"),
      ctx1 = canvas1.getContext("2d");

  var canvas2 = <HTMLCanvasElement> document.getElementById("canvas2"),
  ctx2 = canvas2.getContext("2d");
  
  canvas1.height = document.body.offsetHeight;
  canvas1.width = 300;
  canvas2.height = document.body.offsetHeight;
  canvas2.width = 300;
  
  var parts = [],
      minSpawnTime = 40,
      lastTime = new Date().getTime(),
      maxLifeTime = Math.min(5000, (canvas1.height/(1.5*60)*1000)),
      emitterX = canvas1.width / 2,
      emitterY = canvas1.height - 10,
      smokeImage = new Image();
  
  function spawn() {
      if (new Date().getTime() > lastTime + minSpawnTime) {
          lastTime = new Date().getTime();
          parts.push(new smoke(emitterX, emitterY));
      }
  }
  
  function render() {
      var len = parts.length;
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  
      while (len--) {
          if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
              parts.splice(len, 1);
          } else {
              parts[len].update();
  
              ctx1.save();
              ctx2.save();
              var offsetX = -parts[len].size/2,
                  offsetY = -parts[len].size/2;
           
              ctx1.translate(parts[len].x-offsetX, parts[len].y-offsetY);
              ctx1.rotate(parts[len].angle / 180 * Math.PI);
              ctx1.globalAlpha  = parts[len].alpha;
              ctx1.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
              ctx1.restore();

              ctx2.translate(parts[len].x-offsetX, parts[len].y-offsetY);
              ctx2.rotate(parts[len].angle / 180 * Math.PI);
              ctx2.globalAlpha  = parts[len].alpha;
              ctx2.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
              ctx2.restore();
          }
      }
      spawn();
      requestAnimationFrame(render);
  }
  
  function smoke(x, y) {
      this.x = x;
      this.y = y;
  
      this.size = 1;
      this.startSize = 32;
      this.endSize = 40;
  
      this.angle = Math.random() * 359;
  
      this.startLife = new Date().getTime();
      this.lifeTime = 0;
  
      this.velY = -1 - (Math.random()*0.5);
      this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
  }
  
  smoke.prototype.update = function () {
      this.lifeTime = new Date().getTime() - this.startLife;
      this.angle += 0.2;
      
      var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
  
      this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
  
      this.alpha = 1 - (lifePerc * .01);
      this.alpha = Math.max(this.alpha,0);
      
      this.x += this.velX;
      this.y += this.velY;
  }
  
  smokeImage.src = "http://somethinghitme.com/projects/particle%20test/images/smoke.png";
  smokeImage.onload = function () {
      render();
  }
  
  
  window.onresize = resizeMe;
  window.onload = resizeMe;
  function resizeMe() {
     canvas1.height = document.body.offsetHeight;
  }
  }
}
