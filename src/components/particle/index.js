class Drawing {
  constructor(opt) {
    Object.keys(opt).forEach(key => {
      this[key] = opt[key];
    });
  }

  init() {
    this.adjustCanvas();
    window.addEventListener("resize", (e) => {
      this.adjustCanvas();
    });
  }

  loop(fn) {
    this.renderFn = !this.renderFn ? fn : this.renderFn;
    this.clearFrame();
    this.renderFn();
    setTimeout(() => {
      this.loop();
    }, 1000 / 60);
    // requestFrame.call(window, this.loop.bind(this));
  }

  adjustCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  clearFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  getArea() {
    return {
      w: canvas.width,
      h: canvas.height
    };
  }

  drawCircle(p, c) {
    context.fillStyle = c.render();
    context.beginPath();
    context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
  }

}

class UI {
  constructor(opt) {
    Object.keys(opt).forEach(key => {
      this[key] = opt[key];
    });
    this.isTouch = false; //('ontouchstart' in window || navigator.msMaxTouchPoints),
    this.maxShapeSize = 30;
    this.firstAction = true;
    this.sequence = [];
    this.cmd = '#';

    this.init();
  }

  formatTime(date) {
    var h = date.getHours(),
      m = date.getMinutes(),
      m = m < 10 ? "0" + m : m;
    return h + ":" + m;
  }

  getValue(value) {
    return value && value.split(" ")[1];
  }

  getAction(value) {
    value = value && value.split(" ")[0];
    return value && value[0] === self.cmd && value.substring(1);
  }

  timedAction(fn, delay, max, reverse) {
    const self = this;
    clearInterval(this.interval);
    self.currentAction = reverse ? max : 1;
    fn(self.currentAction);

    if (
      !max ||
      (!reverse && self.currentAction < max) ||
      (reverse && self.currentAction > 0)
    ) {
      self.interval = setInterval(() => {
        self.currentAction = reverse ? self.currentAction - 1 : self.currentAction + 1;
        fn(self.currentAction);

        if (
          (!reverse && max && currentAction === max) ||
          (reverse && currentAction === 0)
        ) {
          clearInterval(interval);
        }
      }, delay);
    }
  }

  reset(destroy) {
    clearInterval(this.interval);
    this.sequence = [];
    this.time = null;
    destroy && S.Shape.switchShape(S.ShapeBuilder.letter(""));
  }

  performAction(value) {
    var action, value, current;

    const self = this;

    this.sequence =
      typeof value === "object" ? value : self.sequence.concat(value.split("|"));
    self.input.value = "";
    self.checkInputWidth();

    self.timedAction(
      (index) => {
        current = self.sequence.shift();
        action = self.getAction(current);
        value = self.getValue(current);

        switch (action) {
          case "countdown":
            value = parseInt(value) || 10;
            value = value > 0 ? value : 10;

            self.timedAction(
              function (index) {
                if (index === 0) {
                  if (sequence.length === 0) {
                    S.Shape.switchShape(S.ShapeBuilder.letter(""));
                  } else {
                    self.performAction(sequence);
                  }
                } else {
                  S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                }
              },
              1000,
              value,
              true
            );
            break;

          case "rectangle":
            value = value && value.split("x");
            value =
              value && value.length === 2 ?
              value : [maxShapeSize, maxShapeSize / 2];

            S.Shape.switchShape(
              S.ShapeBuilder.rectangle(
                Math.min(maxShapeSize, parseInt(value[0])),
                Math.min(maxShapeSize, parseInt(value[1]))
              )
            );
            break;

          case "circle":
            value = parseInt(value) || maxShapeSize;
            value = Math.min(value, maxShapeSize);
            S.Shape.switchShape(S.ShapeBuilder.circle(value));
            break;

          case "time":
            var t = formatTime(new Date());

            if (sequence.length > 0) {
              S.Shape.switchShape(S.ShapeBuilder.letter(t));
            } else {
              self.timedAction(function () {
                t = formatTime(new Date());
                if (t !== time) {
                  time = t;
                  S.Shape.switchShape(S.ShapeBuilder.letter(time));
                }
              }, 1000);
            }
            break;

          default:
            // S.Shape.switchShape(
            //   S.ShapeBuilder.letter(current[0] === self.cmd ? "What?" : current)
            // );
        }
      },
      2000,
      self.sequence.length
    );
  }

  checkInputWidth(e) {
    const input = this.input;
    const ui = this.ui;
    if (input.value.length > 18) {
      ui.classList.add("ui--wide");
    } else {
      ui.classList.remove("ui--wide");
    }

    if (this.firstAction && input.value.length > 0) {
      ui.classList.add("ui--enter");
    } else {
      ui.classList.remove("ui--enter");
    }
  }

  bindEvents() {
    const input = this.input;
    const self = this;
    document.body.addEventListener("keydown", (e) => {
      input.focus();

      if (e.keyCode === 13) {
        self.firstAction = false;
        self.reset();
        self.performAction(input.value);
      }
    });

    input.addEventListener("input", () => this.checkInputWidth);
    input.addEventListener("change", () => this.checkInputWidth);
    input.addEventListener("focus", () => this.checkInputWidth);
  }

  init() {
    this.bindEvents();
    this.input.focus();
    this.isTouch && document.body.classList.add("touch");
  }

  // Init


  // return {
  //   simulate: function(action) {
  //     performAction(action);
  //   }
  // };
}

class Point {
  constructor(args) {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
    this.a = args.a;
    this.h = args.h;
  }
}

export default class S {
  constructor(opt) {
    this.canvas = opt.canvas;
    this.input = opt.input;

    this.context = opt.canvas.getContext("2d")

    this.sequence = [];
    this.drawing = new Drawing({
      canvas: opt.canvas,
      input: opt.input,
      context: this.context
    });
    this.ui = new UI(opt);
    // this.init();
  }

  init() {
    var action = window.location.href,
      i = action.indexOf("?a=");
    this.drawing.init();
    if (i !== -1) {
      this.ui.simulate(decodeURI(action).substring(i + 3));
    } else {
      this.ui.simulate(
        "我是谁|我来自哪里|我要去哪里|我要做什么|我不知道|#countdown 3||"
      );
    }

    // S.Drawing.loop(function() {
    //   S.Shape.render();
    // });
  }

  adjustCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  uiSimulate(action) {
    this.performAction(action);
  }

  performAction(value) {
    const self = this;
    var action, value, current;

    self.sequence =
      typeof value === "object" ? value : self.sequence.concat(value.split("|"));
    self.input.value = "";
    // self.checkInputWidth();

    self.timedAction(
      (index) => {
        current = self.sequence.shift();
        action = self.getAction(current);
        value = self.getValue(current);

        switch (action) {
          case "countdown":
            value = parseInt(value) || 10;
            value = value > 0 ? value : 10;

            self.timedAction(
              function (index) {
                if (index === 0) {
                  if (self.sequence.length === 0) {
                    S.Shape.switchShape(S.ShapeBuilder.letter(""));
                  } else {
                    performAction(self.sequence);
                  }
                } else {
                  S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                }
              },
              1000,
              value,
              true
            );
            break;

          case "rectangle":
            value = value && value.split("x");
            value =
              value && value.length === 2 ?
              value : [maxShapeSize, maxShapeSize / 2];

            S.Shape.switchShape(
              S.ShapeBuilder.rectangle(
                Math.min(maxShapeSize, parseInt(value[0])),
                Math.min(maxShapeSize, parseInt(value[1]))
              )
            );
            break;

          case "circle":
            value = parseInt(value) || maxShapeSize;
            value = Math.min(value, maxShapeSize);
            S.Shape.switchShape(S.ShapeBuilder.circle(value));
            break;

          case "time":
            var t = formatTime(new Date());

            if (self.sequence.length > 0) {
              S.Shape.switchShape(S.ShapeBuilder.letter(t));
            } else {
              self.timedAction(function () {
                t = formatTime(new Date());
                if (t !== time) {
                  time = t;
                  S.Shape.switchShape(S.ShapeBuilder.letter(time));
                }
              }, 1000);
            }
            break;

          default:
            S.Shape.switchShape(
              S.ShapeBuilder.letter(current[0] === self.cmd ? "What?" : current)
            );
        }
      },
      2000,
      self.sequence.length
    );
  }

  timedAction(fn, delay, max, reverse) {
    clearInterval(interval);
    currentAction = reverse ? max : 1;
    fn(currentAction);

    if (
      !max ||
      (!reverse && currentAction < max) ||
      (reverse && currentAction > 0)
    ) {
      interval = setInterval(function () {
        currentAction = reverse ? currentAction - 1 : currentAction + 1;
        fn(currentAction);

        if (
          (!reverse && max && currentAction === max) ||
          (reverse && currentAction === 0)
        ) {
          clearInterval(interval);
        }
      }, delay);
    }
  }

}