// window.addEventListener('load', function(){
//     const canvas = document.getElementById('canvas1');
//     const ctx = canvas.getContext('2d');

//     canvas.width = window.innerWidth; 
//     canvas.height = window.innerHeight

//     class Parcticle {

//         constructor(effect, x, y, color){
//             this.effect = effect;
//             this.x = Math.random() * this.effect.width;
//             this.y = Math.random() * this.effect.width;
//             this.originX = Math.floor(x);
//             this.originY = Math.floor(y);
//             this.color = color;
//             this.size = this.effect.gap;
//             this.vx = 0;
//             this.vy = 0;
//             this.ease = 0.60;
//             this.friction = 0.90;
//             this.dx = 0;
//             this.dy = 0;
//             this.distance = 0;
//             this.fourse = 0;
//             this.angle = 0;
//         }
//         draw(context){
//             context.fillStyle = this.color;
//             context.fillRect(this.x, this.y, this.size, this.size)
//         }
//         update(){
//             this.dx = this.effect.mouse.x - this.x;
//             this.dy = this.effect.mouse.y - this.y;
//             this.distance = this.dx * this.dx + this.dy * this.dy;
//             this.fourse = -this.effect.mouse.radius / this.distance;

//             if(this.distance < this.effect.mouse.radius){
//                 this.ange = Math.atan2(this.dy, this.dx);
//                 this.vx += this.fourse * Math.cos(this.angle);
//                 this.vy += this.fourse * Math.cos(this.angle)
//             }

//             this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease; /*можна множити на 0.1 або this.ease */
//             this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
//         }

//     } 

//     class Effect{
//         constructor(width, height){
//             this.width = width;
//             this.height = height;
//             this.particlesArray = [];
//             this.image = document.getElementById('image1');
//             this.centerX = this.width * 0.5;
//             this.centerY = this.height * 0.5;
//             this.x = this.centerX - this.image.width * 0.5;
//             this.y = this.centerY - this.image.height * 0.5;
//             this.gap = 3;
//             this.mouse = {
//                 radius: 30000,
//                 x: undefined,
//                 y: undefined
//             }
//             window.addEventListener('mousemove', event => {
//                 this.mouse.x = event.x;
//                 this.mouse.y = event.y;
//             });
//         }
//         init(context){
//             context.drawImage(this.image, this.x, this.y);
//             const pixels = context.getImageData(0, 0, this.width, this.height).data;
//             for(let y = 0; y < this.height; y += this.gap){
//                 for(let x = 0; x < this.width; x += this.gap){
//                     const index = (y * this.width + x) * 4;
//                     const red = pixels[index];
//                     const green = pixels [index + 1];
//                     const blue = pixels [index + 2];
//                     const alpha = pixels [index + 3]; 
//                     const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

//                     if(alpha > 0){
//                         this.particlesArray.push(new Parcticle(this, x, y, color));
//                     }
//                 }
//             }
//         }
//         draw(context){
//             this.particlesArray.forEach(particle => particle.draw(context));
//         }
//         update(){
//             this.particlesArray.forEach(particle => particle.update());
//         }
//     } 
    
//     const effect = new Effect(canvas.width, canvas.height);
//     effect.init(ctx);

//     function animate(){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         effect.draw(ctx);
//         effect.update();
//         requestAnimationFrame(animate);
//     }
//     animate();
// });


// код для функцій


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;

    const gap = 3;
    const mouse = {
        radius: 30000,
        x: undefined,
        y: undefined
    };

    const particlesArray = [];
    
    const image = document.getElementById('image1');
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.5;
    const x = centerX - image.width * 0.5;
    const y = centerY - image.height * 0.5;

    window.addEventListener('mousemove', event => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function init(context){
        context.drawImage(image, x, y);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        for(let y = 0; y < canvas.height; y += gap){
            for(let x = 0; x < canvas.width; x += gap){
                const index = (y * canvas.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3]; 
                const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                if(alpha > 0){
                    particlesArray.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        color,
                        size: gap,
                        vx: 0,
                        vy: 0,
                        ease: 0.01,
                        friction: 0.10,
                        dx: 0,
                        dy: 0,
                        distance: 0,
                        fourse: 0,
                        angle: 0
                    });
                }
            }
        }
    }

    function drawParticle(particle, context){
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
    }

    function updateParticle(particle){
        particle.dx = mouse.x - particle.x;
        particle.dy = mouse.y - particle.y;
        particle.distance = particle.dx * particle.dx + particle.dy * particle.dy;
        particle.fourse = -mouse.radius / particle.distance;

        if(particle.distance < mouse.radius){
            particle.angle = Math.atan2(particle.dy, particle.dx);
            particle.vx += particle.fourse * Math.cos(particle.angle);
            particle.vy += particle.fourse * Math.cos(particle.angle);
        }

        particle.x += (particle.vx *= particle.friction) + (particle.originX - particle.x) * particle.ease;
        particle.y += (particle.vy *= particle.friction) + (particle.originY - particle.y) * particle.ease;
    }

    function draw(context){
        particlesArray.forEach(particle => drawParticle(particle, context));
    }

    function update(){
        particlesArray.forEach(updateParticle);
    }

    init(ctx);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx);
        update();
        requestAnimationFrame(animate);
    }
    animate();
});
