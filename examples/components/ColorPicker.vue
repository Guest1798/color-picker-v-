<template>
  <div class="color-picker">
    <div class="color-bar">
      <div class="dot" :style="`background:rgb${retBgColor}; left:${-7+eLeft}px`"></div>
      <canvas id="colorpicker" width="200" height="13" ></canvas>
      <div
        class="transparentbar"
        id="tansbar"
        @click="colorPickerClick"
        @mousemove.prevent="colorPickerMM"
        @touchmove.prevent="colorPickerTM"
        @mousedown="colorPickerMD"
        @touchstart="colorPickerMD"
        @touchend="relaseMove"
        @mouseleave="relaseMove"
        @mouseout="relaseMove"
        @mouseup="relaseMove"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color_picker',
  props: {
    width: {
      type: Number,
      default: () => 2000
    }
  },
  data() {
    return {
      colorRGB:[255, 0, 0],
      eLeft: 0,
      barLeft: 0,
      barTop: 0,
      canMove: false
    }
  },
  mounted() {
    this.canvasColorDraw('colorpicker')
  },
  computed: {
    retBgColor() {
      if (this.colorRGB.length > 0) {
        return `(${this.colorRGB[0]},${this.colorRGB[1]},${this.colorRGB[2]})`
      } else {
        return `(236,32,3)`
      }
    }
  },
  methods: {
    colorPickerClick(e) {
      var canvas = document.getElementById('colorpicker')
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d')
      }
      this.eLeft = e.offsetX
      var myColor = ctx.getImageData(e.offsetX, 5, 1, 1)
      this.colorRGB = [myColor.data[0], myColor.data[1], myColor.data[2]]
    },
    colorPickerMD() {
      this.canMove = true
    },
    colorPickerMM(e) {
      if (this.canMove) {
        var canvas = document.getElementById('colorpicker')
        if (canvas && canvas.getContext) {
          var ctx = canvas.getContext('2d')
        }
        this.eLeft = e.offsetX < 0 ? 0 : e.offsetX
        this.eLeft = e.offsetX > 198 ? 198 : e.offsetX
        var myColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1)
        this.colorRGB = [myColor.data[0], myColor.data[1], myColor.data[2]]
      }
    },
    colorPickerTM(e) {
      this.barLeft = document
        .getElementById('tansbar')
        .getBoundingClientRect().left
      this.barTop = document
        .getElementById('tansbar')
        .getBoundingClientRect().top
      if (this.canMove) {
        var canvas = document.getElementById('colorpicker')
        if (canvas && canvas.getContext) {
          var ctx = canvas.getContext('2d')
        }
        if (e.touches[0].pageX - this.barLeft > 198) {
          this.eLeft = 198
        } else if (e.touches[0].pageX - this.barLeft < 0) {
          this.eLeft = 0
        } else {
          this.eLeft = e.touches[0].pageX - this.barLeft
        }
        var myColor = ctx.getImageData(this.eLeft, 5, 1, 1)
        this.colorRGB = [myColor.data[0], myColor.data[1], myColor.data[2]]
      }
    },
    relaseMove() {
      this.canMove = false
    },
    canvasColorDraw(eleid) {
      var canvas = document.getElementById(eleid)
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d')
        var grd = ctx.createLinearGradient(0, 0, 40, 13)
        var grd1 = ctx.createLinearGradient(40, 0, 80, 13)
        var grd2 = ctx.createLinearGradient(80, 0, 120, 13)
        var grd3 = ctx.createLinearGradient(120, 0, 160, 13)
        var grd4 = ctx.createLinearGradient(160, 0, 200, 13)
        grd.addColorStop(0, '#FF0000')
        grd.addColorStop(1, 'rgb(255, 204, 47)')

        grd1.addColorStop(0, 'rgb(255, 204, 47)')
        grd1.addColorStop(1, 'rgb(162, 255, 0)')

        grd2.addColorStop(0, 'rgb(162, 255, 0)')
        grd2.addColorStop(1, 'rgb(11, 254, 234)')

        grd3.addColorStop(0, 'rgb(11, 254, 234)')
        grd3.addColorStop(1, 'rgb(23, 58, 234)')

        grd4.addColorStop(0, 'rgb(23, 58, 234)')
        grd4.addColorStop(1, 'rgb(235, 8, 238)')

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, 40, 13)
        ctx.fillStyle = grd1
        ctx.fillRect(40, 0, 80, 13)
        ctx.fillStyle = grd2
        ctx.fillRect(80, 0, 120, 13)
        ctx.fillStyle = grd3
        ctx.fillRect(120, 0, 160, 13)
        ctx.fillStyle = grd4
        ctx.fillRect(160, 0, 200, 13)
      }
    }
  }
}
</script>
<style scoped lang="less">
.color-picker {
  // edit your attrtubes
  .color-bar {
    width: 200px;
    height: 13px;
    position: absolute;
    top: 10px;
    .dot {
      width: 23px;
      height: 23px;
      background: linear-gradient(
        0deg,
        rgba(255, 109, 88, 1),
        rgb(255, 0, 0)
      );
      border: 4px solid rgba(255, 255, 255, 1);
      box-sizing: border-box;
      box-shadow: 0px 1px 2px 1px rgba(92, 92, 92, 0.24);
      border-radius: 50%;
      position: absolute;
      left: -12px;
      top: -5px;
      z-index: 9;
      transition: background cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
    }

    #colorpicker {
      position: absolute;
      top: 0;
      left: 0;
      // border-radius: 12px;
    }
    .transparentbar {
      width: 198px;
      height: 11px;
      // border-radius: 7px;
      position: absolute;
      left: 1px;
      top: 1px;
      z-index: 39;
    }

    .color-confirm {
      width: 47px;
      height: 24px;
      background: rgba(255, 255, 255, 0.24);
      border-radius: 12px;
      color: #fff;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
      position: absolute;
      right: -70px;
      top: -5px;
    }
  }
}
</style>
