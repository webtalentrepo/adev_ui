<template>
  <div>
    <svg :width="width"
         :height="height"
         :viewBox="viewBox"
         preserveAspectRatio="xMinYMid"
         >
      <g style="transform: translate(0, 10px)">
        <path :d="line" />
      </g>
    </svg>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import * as d3 from 'd3';
export default {
  name: 'LineChart',
  data() {
    return {
      width: 0,
      height: 0,
      viewBox: '0 0 0 0',
      data: [99, 71, 78, 25, 36, 92],
      line: '',
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize: debounce(function() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      this.viewBox =  `0 0 ${this.width} ${this.height}`
      this.calculatePath()
    }, 250),
    getScales() {
      const x = d3.scaleTime().range([0, this.width]);
      const y = d3.scaleLinear().range([this.height, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },

    scales() {
      var xScale = d3.scaleLinear()
          .domain([0, 5-1])
          .range([0, this.width]);
      var yScale = d3.scaleLinear()
          .domain([0, 1])
          .range([this.height, 0]);
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    },
  },
};
</script>
<style lang="stylus">
svg {
}
path {
  fill: none;
  stroke: #76BF8A;
  stroke-width: 3px;
}
</style>
