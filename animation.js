window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); /*містить всі властивості та методи полотна */
    // console.log(ctx); за допомогою нього ми можемо побачити вбудовані стилі канвас в консолі
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    // тут ми збільщили маштаб нашого полотна і ми можемо малювати на всій сторінці

    /**
     тут ми викликаємо нашу картинку з html
     */

    class Parcticle {
        // конструктор може запустити код усередині нього щоб  створити один 
        // новий порожній обєкт і призначити йому значення та властивості
        // на основі креслень в середині
        // там де ми вказали size = 3 це маленькі кубіки будуть по три пікселя також їх можна зробити кружечками
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = Math.random() * this.effect.width;/*Math.random() * this.effect.width або 0 аба  this.effect.width*5... якщо буде таке то буде по всій сторінці, а то біш зжатий варіант і він відповідає висоті і ширині самої картінки тобто якщо прописати х і у*/
            this.y = Math.random() * this.effect.width;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;/*25 this.effect.gap*/
            this.vx = 0;/*Math.random() * 2 - 1 */
            this.vy = 0;
            this.ease = 0.45;/*скорость зборки картінки */
            this.friction = 0.90;/*це кароче при наведені на скільки сложно буде розїбати картінку*/
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.fourse = 0;
            this.angle = 0;
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.fourse = -this.effect.mouse.radius / this.distance;

            if(this.distance < this.effect.mouse.radius){
                this.ange = Math.atan2(this.dy, this.dx);
                this.vx += this.fourse * Math.cos(this.angle);
                this.vy += this.fourse * Math.cos(this.angle)
            }
            
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease; /*можна множити на 0.1 або this.ease */
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }

    } /*тут ми створюємо окремі обєкти частинок*/

    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 3;
            this.mouse = {
                radius: 30000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
        }
        init(context){
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for(let y = 0; y < this.height; y += this.gap){
                for(let x = 0; x < this.width; x += this.gap){
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels [index + 1];
                    const blue = pixels [index + 2];
                    const alpha = pixels [index + 3]; 
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                    if(alpha > 0){
                        this.particlesArray.push(new Parcticle(this, x, y, color));
                    }
                }
            }
        }
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
        }
        update(){
            this.particlesArray.forEach(particle => particle.update());
        }
    } /*для обробки всіх частинок одночасно*/
    
    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);

 
    // const particlel = new Parcticle();
    // particlel.draw();
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }/*для створення всього анімованого та інтерактивного*/
    animate();

    // ctx.fillRect(20,0,100,200);
    /*тут ми заливаємо кольором якийсь там вбудований прямокутник тут він чорного кольору
    також стиль заливки за замовчуванням в канвас чорний
    оказується розмір ми вказали в душках ctx.fillRect(20,0,100,200) це параметри не кольору а розміру тільки в душі не їбу шо таке 20 ну да похуй
    а вжк їбу 20 то відступ від стінок в нашому випадку 20 з права*/
    // ctx.drawImage(image1, 100, 100, 400, 300)// тут ми викликаємо вбудований метод наприклад малювання зображення.В зображення потрібно 
    // внести не менше трьох аргументів, які ми хочемо намалювати 
    // в тому числі і координати х і у тут ми вказуємо в душках відступ від стінок так само як і ті 20.
    // І якщо не задати значення джс наристує його в звичайному розмірі но тут можна задавати і ширину і висоту
});
