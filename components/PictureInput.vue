<template>
  <div class="ui-picture-input">
    <div class="placeholder"><span class="ui-icon ui-icon-upload"></span>{{$options.$supports}}</div>
    <canvas class="preview ui-card ui-elevation-3" ref="previewCanvas"
            @drag.stop.prevent
            @dragover.stop.prevent
            @dragstart.stop.prevent="onDragStart"
            @dragenter.stop.prevent="onDragStart"
            @dragend.stop.prevent="onDragStop"
            @dragleave.stop.prevent="onDragStop"
            @drop.stop.prevent="onFileDrop"></canvas>
  </div>
</template>

<script>
import { draganddrop, filereader, canvas2d, fileinput } from './common/supports.js';
export default {
  name: 'PictureInput',

  props: {
    size: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    accept: {
      type: String,
      default: 'image/*'
    },
  },

  supports: {
    preview: filereader && canvas2d,
    draganddrop,
    fileinput
  },

  model: {
    prop: 'selectedValue',
    event: 'change'
  },

  computed: {
  },

  methods: {
    onDragStart(e) {
      console.log(e)
    },
    onDragStart(e) {
      console.log(e)
    },
    onDragStop(e) {
      console.log(e)
    },
    onDragStop(e) {
      console.log(e)
    },
    onFileDrop(e) {
      this.onDragStop()
      this.onFileChange(e)
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      if (files[0].size <= 0 || files[0].size > this.size * 1024 * 1024) {
        alert(this.strings.fileSize + ' (' + this.size + 'MB)')
        return
      }
      if (files[0].name === this.fileName && files[0].size === this.fileSize && this.fileModified === files[0].lastModified) {
        return
      }
      this.file = files[0]
      this.fileName = files[0].name
      this.fileSize = files[0].size
      this.fileModified = files[0].lastModified
      this.fileType = files[0].type
      if (this.accept === 'image/*') {
        if (files[0].type.substr(0, 6) !== 'image/') {
          return
        }
      } else {
        if (this.fileTypes.indexOf(files[0].type) === -1) {
          alert(this.strings.fileType)
          return
        }
      }
      this.imageSelected = true
      this.image = ''
      if (this.$options.supports.preview) {
        this.loadImage(files[0])
      } else {
        this.$emit('change')
      }
    },
    render(src) {
      var MAX_HEIGHT = 100
      var image = new Image()
      image.onload = () => {
        var canvas = this.$refs.previewCanvas
        if (image.height > canvas.height) {
          image.width *= canvas.height / image.height
          image.height = canvas.height
        }
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
      }
      image.src = src
    },
    loadImage(file) {
      if (!file.type.match(/image.*/)) {
        console.log("The dropped file is not an image: ", file.type)
        return
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        this.render(e.target.result)
      };
      reader.readAsDataURL(file)
    },
  },
  mounted() {
    if (this.$options.supports.preview) {
      this.pixelRatio = Math.round(window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI)
      const canvas = this.$refs.previewCanvas
      if (canvas.getContext) {
        this.context = canvas.getContext('2d')
        this.context.scale(this.pixelRatio, this.pixelRatio)
      }
    }
    if (this.accept !== 'image/*') {
      this.fileTypes = this.accept.split(',')
      this.fileTypes = this.fileTypes.map(s => s.trim())
    }
  },
  created() {
  }
}
</script>

<style lang="stylus">
.ui-picture-input {
  position: relative;
}
.ui-picture-input  .preview {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
}

.ui-picture-input>.placeholder {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed #1D272E;
  border-radius: 20px;
}

.ui-picture-input>.placeholder.dragover {
  background: rgba(#fff, .1)
}

.ui-picture-input>.placeholder:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.ui-picture-input>.placeholder .ui-icon {
  font-size: 80px;
  color: #1D272E;
}
</style>
