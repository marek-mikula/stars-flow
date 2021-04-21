let verze = "v1.01";
let gameName = "Stars Flow";

let ctxHeight = window.innerHeight
let ctxWidth = window.innerWidth;

let center = {
	x: ctxWidth / 2,
	y: ctxHeight / 2,
}

let interval;

let frequency = 10;

let stars = [];

function star(width, height) {

	this.pos = function () {
		this.x = randomInt(ctxWidth / 2 - 100, -ctxWidth / 2 + 100);
		this.y = randomInt(ctxHeight / 2 - 100, -ctxHeight / 2 + 100);

		if (Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) < 10) {
			this.pos();
		}
	}

	this.pos();

	this.background = {
		R: 0,
		G: 0,
		B: 0,
	};

	this.height = height;
	this.width = width;

	this.getBigger = 0.05;

	this.speed = 0.06;

	this.update = function () {

		this.x += this.x * this.speed;
		this.y += this.y * this.speed;

		this.background.R += 5;
		this.background.G += 5;
		this.background.B += 5;

		this.width += this.getBigger;
		this.height += this.getBigger;

		if (Math.abs(this.x) > ctxWidth / 2 || Math.abs(this.y) > ctxHeight / 2) {
			this.reset();
		}

		this.draw();
	}

	this.reset = function () {
		this.pos();

		this.width = width;
		this.height = height;

		this.background = {
			R: 0,
			G: 0,
			B: 0,
		};
	}

	this.draw = function () {
		gameArea.ctx.fillStyle = "rgb(" + this.background.R + "," + this.background.G + "," + this.background.B + ")";
		gameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

let gameArea = {

	canvas: document.getElementById("canvas"),

	ctx: null,

	background: {
		R: 0,
		G: 0,
		B: 0,
	},

	height: ctxHeight,
	width: ctxWidth,

	start: function () {
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('width', this.width);

		this.ctx = this.canvas.getContext('2d');

		this.ctx.fillStyle = "rgb(" + this.background.R + "," + this.background.G + "," + this.background.B + ")";
		this.ctx.fillRect(0, 0, this.width, this.height);

		this.ctx.translate(center.x, center.y);

		spawnStars(3000);

		interval = setInterval(this.updateCanvas, frequency);
	},

	updateCanvas: function () {
		gameArea.clear();

		stars.forEach(function (value, index, array) {
			value.update();
		});

		gameArea.descriptions();
	},

	descriptions: function () {
		this.ctx.fillStyle = "white";
		this.ctx.textAlign = "left";
		this.ctx.font = "10px Arial";
		this.ctx.fillText(gameName + " " + verze, -this.width / 2 + 15, -this.height / 2 + 25);

		this.ctx.textAlign = "end";
		this.ctx.fillText("Developed by Marek Mikula, 2018", this.width / 2 - 15, -this.height / 2 + 25);
	},

	clear: function () {
		this.ctx.fillStyle = "rgb(" + this.background.R + "," + this.background.G + "," + this.background.B + ")";
		this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
	},
}

function randomInt(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnStars(n) {
	for (let i = 0; i < n; i++) {
		stars.push(new star(2, 2))
	}
}

gameArea.start();

document.addEventListener('keydown', function (event) {
	if (event.which == 32) {
		if (interval) {
			clearInterval(interval);
			interval = false;
		} else {
			interval = setInterval(gameArea.updateCanvas, frequency);
		}

		event.preventDefault();
	}
});
