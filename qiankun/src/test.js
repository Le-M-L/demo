export const fitTimeMixin = {
  data() {
    return {
      fitTimeWidth: 1920,
      fitTimeHeight: 1080,
      fitTimeDom: null,
      fitTimesSale: 1
    }
  },
  created() {
    window.addEventListener("resize", this.debounce(this.setScale));

  },
  methods: {
    setFitData({
      width = 1920,
      height = 1080,
      dom,
      scale
    }) {
      if (!dom) {
        return console.warn('dom is null')
      }
      dom.style.setProperty("--scale", 1);
      dom.style.transition = '0.3s';
      dom.style.transform = 'scale(var(--scale))';
      this.fitTimeWidth = width;
      this.fitTimeHeight = height;
      this.fitTimeDom = dom;
      this.fitTimesSale = scale;
      let resize = new Event('resize')
      window.dispatchEvent(resize)
    },
    debounce(fn, delay) {
      const delays = delay || 500;
      let timer;
      return function () {
        const th = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    },
    getScale() {
      const wh = window.innerHeight / this.fitTimeHeight;
      const ww = window.innerWidth / this.fitTimeWidth;
      return ww < wh ? ww : wh;
    },
    setScale() {
        console.log(123)
      this.fitTimesSale = this.getScale();
      if (this.fitTimeDom) {
        this.fitTimeDom.style.setProperty("--scale", this.fitTimesSale);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.debounce(this.setScale));
  }
}
