{
	const Color = {
		Red: "#F44336",
		Pink: "#E91E63",
		Purple: "#9C27B0",
		Deep_Purple: "#673AB7",
		Indigo: "#3F51B5",
		Blue: "#2196F3",
		Light_Blue: "#03A9F4",
		Cyan: "#00BCD4",
		Teal: "#009688",
		Green: "#4CAF50",
		Light_Green: "#8BC34A",
		Lime: "#CDDC39",
		Yellow: "#FFEB3B",
		Amber: "#FFC107",
		Orange: "#FF9800",
		Deep_Orange: "#FF5722",
		Brown: "#795548",
		Grey: "#9E9E9E",
		Blue_Grey: "#607D8B"
	};
	
	class Canvas {
		constructor(element) {
			this.canvas = element;
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.context = this.canvas.getContext("2d");
			this.objects = [];
			this.events();
		}
		
		addObject(object) {
			this.objects.push(object);
		}
		
		render() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.objects.forEach(object => {
				object.move(this.canvas);
				object.draw(this.context);
			});
		}
		
		events() {
			window.addEventListener("resize", () => {
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
				this.render();
			});
			
			window.addEventListener("devicemotion", (event) => {
				this.objects.forEach(object => {
					object.ax = -event.accelerationIncludingGravity.x * object.g;
					object.ay = event.accelerationIncludingGravity.y * object.g;
				});
			}, true);
		}
	}
	
	class Circle {
		constructor() {
			this.x = window.innerWidth * Math.random();
			this.y = window.innerHeight * Math.random();
			this.vx = Math.random() * 10 - 5;
			this.vy = Math.random() * 10 - 5;
			this.ax = 0;
			this.ay = 0.1;
			this.g = 0.05;
			this.e = 0.8;
			this.radius = Math.random() * 10 + 5;
			this.fillStyle = this.randomColor();
			this.strokeStyle = undefined;
		}
		
		draw(context) {
			if (context) {
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
				if (this.fillStyle) {
					context.fillStyle = this.fillStyle;
					context.fill();
				}
				if (this.strokeStyle) {
					context.strokeStyle = this.strokeStyle;
					context.stroke();
				}
			}
		}
		
		move(canvas) {
			this.x += this.vx;
			this.y += this.vy;
			this.vx += this.ax;
			this.vy += this.ay;
			
			if (this.vx > -0.001 && this.vx < 0.001) {
				this.vx = 0;
			}
			
			if (this.vy > -0.001 && this.vy < 0.001) {
				this.vy = 0;
			}
			
			if (this.x <= this.radius) {
				this.x = this.radius;
				this.vx = -this.vx * this.e;
			}
			else if (this.x >= canvas.width - this.radius) {
				this.x = canvas.width - this.radius;
				this.vx = -this.vx * this.e;
			}
			
			if (this.y <= this.radius) {
				this.y = this.radius;
				this.vy = -this.vy * this.e;
			}
			else if (this.y >= canvas.height - this.radius) {
				this.y = canvas.height - this.radius;
				this.vy = -this.vy * this.e;
			}
		}
		
		randomColor() {
			let keys = Object.keys(Color);
			return Color[keys[Math.trunc(keys.length * Math.random())]];
		}
	}
	
	window.addEventListener("load", () => {
		const canvas = new Canvas(document.getElementById("canvas"));
		const addButton = document.getElementById("add-button");
		
		canvas.addObject(new Circle());
		canvas.render();
		animate(canvas);
		
		function animate(canvases) {
			canvas.render();
			window.requestAnimationFrame(animate.bind(this, canvas));
		}
		
		addButton.addEventListener("click", () => {
			canvas.addObject(new Circle());
		});
	});
}
