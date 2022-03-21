// vue mixins 

function debounce(fn, delay) {
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
}
export const fitLargeMixin = {
  data() {
    return {
      fitLargeWidth: 1920,
      fitLargeHeight: 1080,
      fitLargeDom: null,
      fitLargesSale: 1,
    };
  },
  created() {
    window.addEventListener("resize", this.setScale);
  },
  methods: {
    setFitData({ width = 1920, height = 1080, dom, scale }) {
      if (!dom) {
        return console.warn("dom is null");
      }
      dom.style.setProperty("--scale", 1);
      dom.style.transition = "0.3s";
      dom.style.transform = "scale(var(--scale))";
      this.fitLargeWidth = width;
      this.fitLargeHeight = height;
      this.fitLargeDom = dom;
      this.fitLargesSale = scale;
      let resize = new Event("resize");
      window.dispatchEvent(resize);
    },
    getScale() {
      const wh = window.innerHeight / this.fitLargeHeight;
      const ww = window.innerWidth / this.fitLargeWidth;
      return ww < wh ? ww : wh;
    },
    setScale: debounce(function (){
      this.fitLargesSale = this.getScale();
      if (this.fitLargeDom) {
        this.fitLargeDom.style.setProperty("--scale", this.fitLargesSale);
      }
    }),
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setScale);
  },
};
