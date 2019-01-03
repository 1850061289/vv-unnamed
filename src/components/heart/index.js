import {
  randomBetween,
  randomBetweenPrecision,
  randomColor
} from './utils';

import NP from 'number-precision';

class Shape {
  constructor(opt) {
    Object.keys(opt).forEach(item => {
      this[item] = opt[item];
    });
  }
}

class Heart extends Shape {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.opacity <= 0.02) {
      this.ctx.globalAlpha = 0;
      this.remove();
      return;
    }
    this.drawPath();
    this.fill();
  }

  remove() {
    this.needRemove = true;
  }

  fill() {

    const ctx = this.ctx;
    const h = this;
    h.opacity = Math.max(0, NP.minus(h.opacity, h.opacityChange));

    ctx.globalAlpha = h.opacity;
    ctx.strokeStyle = h.fillColor; //设置描边样式
    ctx.stroke(); //对路径描边
    ctx.fillStyle = h.fillColor;
    ctx.fill();
  }

  // 心形公式获取下一绘点坐标
  getPosition(angle, a) {
    return {
      x: a * (16 * Math.pow(Math.sin(angle), 3)),
      y:
        -a *
        (13 * Math.cos(angle) -
          5 * Math.cos(2 * angle) -
          2 * Math.cos(3 * angle) -
          Math.cos(4 * angle))
    };
  }

  drawPath() {
    const h = this;
    const ctx = this.ctx;
    h.a = NP.plus(h.a, h.radiusChange);
    ctx.beginPath();
    let radian = 0; //设置初始弧度
    const radian_add = Math.PI / 180; //设置弧度增量
    const pos = h.getPosition(radian, h.a);
    // 随机位置作为起始点，角度为0
    ctx.moveTo(h.x + pos.x, h.y + pos.y);
    let runtimePos;
    while (radian <= Math.PI * 2) {
      //每增加一次弧度，绘制一条线
      radian += radian_add;
      runtimePos = h.getPosition(radian, h.a);
      ctx.lineTo(runtimePos.x + h.x, runtimePos.y + h.y);
    }

    ctx.closePath();

  }

}

class Circle extends Shape {
  constructor(props) {
    super(props);
  }

  render() {
    const h = this;
    const ctx = this.ctx;
    if (h.opacity <= 0.02) {
      ctx.globalAlpha = 0;
      return;
    }
    this.drawCircle();
    this.fill();
  }

  drawCircle() {
    const h = this;
    const ctx = this.ctx;
    ctx.beginPath();
    h.a = NP.plus(h.a, h.radiusChange);

    this.ctx.arc(this.x, this.y, this.a, 0, 2 * Math.PI);
    ctx.closePath();

  }

  fill() {
    const ctx = this.ctx;
    const h = this;
    h.opacity = NP.minus(h.opacity, h.opacityChange);

    // 透明度
    ctx.globalAlpha = h.opacity;
    ctx.strokeStyle = h.fillColor; //设置描边样式
    ctx.stroke(); //对路径描边
    ctx.fillStyle = h.fillColor;
    ctx.fill();
  }
}

export class Shapes {
  constructor(options) {
    this.canvas = options.elem;
    this.ctx = this.canvas.getContext("2d");
    this.config = options.config;

    this.defaultConfig = {
      radiusMin: 1, // 初始半径最小值
      radiusMax: 2, // 初始半径最大值
      radiusAddMin: 0.03,
      radiusAddMax: 0.05,
      opacityMin: 0.3,
      opacityMax: 0.5,
      opacitySubMin: 0.003,
      opacitySubMax: 0.005,
      num: 1
    };

    this.setup();
  }

  extendConfig() {
    const config = this.config;
    for (let key in config) {
      this.defaultConfig[key] = config[key] || this.defaultConfig[key];
    }
  }

  setup() {
    this.extendConfig();
    window.addEventListener('resize', this.setCanvasSize.bind(this));

    this.setCanvasSize();

    this.xSize = Math.ceil((this.canvas.width - 50) / 100);
    this.ySize = Math.ceil((this.canvas.height - 50) / 100);

    this.grid = new Grid({
      xSize: this.xSize,
      ySize: this.ySize
    });

    this.generateHeart();

    this.render();
  }

  generateHeart() {
    this.hearts = [];

    var generate = () => {
      const time = randomBetween(500, 1000);
      this.addTile();
      setTimeout(() => {
        generate();
      }, time)
    }

    generate();

  }

  removeNode() {
    const hearts = [];
    for (let i = 0; i < this.hearts.length; i++) {
      const h = this.hearts[i];
      if (!h.needRemove) {
        hearts.push(h);
      } else {
        this.grid.removeTile({
          x: (h.x - 50) / 100,
          y: (h.y - 50) / 100,
          posX: h.x,
          posY: h.y
        });
      }
    }
    this.hearts = hearts;
  }

  // 清空canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.draw();
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.clearCanvas();
      this.render();

    }, 1000 / 60);

  }

  draw() {
    this.removeNode();
    for (let i = 0; i < this.hearts.length; i++) {
      const h = this.hearts[i];
      h.render();
    }
  }

  // 统计空格子
  calcEmptyGrid() {
    let emptyCells = [];
    for (let i = 0; i < this.xSize; i++) {
      for (let j = 0; j < this.ySize; j++) {
        if (!this.grid.cells[i][j]) {
          emptyCells.push({
            x: i,
            y: j
          });
        }
      }
    }
    return emptyCells;
  }

  addTile() {

    // 剩余空格子的位置存起来
    const emptyCells = this.calcEmptyGrid();

    // 空格子随机一个
    const index = randomBetween(0, emptyCells.length);

    const item = emptyCells[index];

    if (item) {
      const x = item.x;
      const y = item.y;

      const tile = new Tile({
        x: x,
        y: y,
        posX: 50 + 100 * x,
        posY: 50 + 100 * y
      });

      this.grid.insertTile(tile);
      this.addHeart(tile);
    }

  }

  addHeart(tile) {

    const config = this.defaultConfig;
    const heartConfig = {
      x: tile.posX,
      y: tile.posY,
      a: randomBetweenPrecision(config.radiusMin, config.radiusMax, 1),
      radiusChange: randomBetweenPrecision(config.radiusAddMin, config.radiusAddMax, 3),
      opacity: randomBetweenPrecision(config.opacityMin, config.opacityMax, 2),
      opacityChange: randomBetweenPrecision(config.opacitySubMin, config.opacitySubMax, 4),
      fillColor: randomColor(),
      ctx: this.ctx
    };
    this.hearts.push(new Heart(heartConfig));
  }

  // 设置canvas宽高
  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

class Grid {
  constructor(opt) {
    let cells = [];
    for (let i = 0; i < opt.xSize; i++) {
      cells.push([]);
      for (let j = 0; j < opt.ySize; j++) {
        cells[i].push(null);
      }
    }
    this.cells = cells;
  }

  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  }

  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  }
}

class Tile {
  constructor(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.posX = opt.posX;
    this.posY = opt.posY;
  }

  render() {

    const heartConfig = {
      x: tile.posX,
      y: tile.posY,
      a: randomBetweenPrecision(config.radiusMin, config.radiusMax, 1),
      radiusChange: randomBetweenPrecision(config.radiusAddMin, config.radiusAddMax, 3),
      opacity: randomBetweenPrecision(config.opacityMin, config.opacityMax, 2),
      opacityChange: randomBetweenPrecision(config.opacitySubMin, config.opacitySubMax, 4),
      fillColor: randomColor(),
      ctx: this.ctx
    };

    const h = new Heart(heartConfig);
    h.render();
  }
}