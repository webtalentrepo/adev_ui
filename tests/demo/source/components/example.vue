<---------Modal---------->
<template>
  <ui-Dialog>
    <DialogHeader :showClose="true" :icon="'help'">Dialog Title</DialogHeader>
    <h3>This is slot number two</h3>
    <small>I can put more info in, too!</small>
    <DialogFooter>
      <button class="ui-button">Button 1</button>
      <button class="ui-button">Button 2</button>
      <button class="ui-button">Button 3</button>
    </DialogFooter>
  </ui-Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
export default {
  components: { 'ui-Dialog': Dialog },
}
</script>

<---------APP---------->
<template>
  <div>
    <!-- transition: modal-slide-{right|top|left|bottom}|modal-fall -->
    <Popup :show="showModal"
           transition="modal-fall"
           @close="onClose">
      <Modal></Modal>
    </Popup>
    <button class="ui-button"
            @click="showModal = true">Show</button>
  </div>
</template>
<script>
import {Popup} from '@'
import Modal from './Modal'
export default {
  components: { Modal, Popup },
  data: () => ({
    showModal: false
  }),
  methods: {
    onClose(type) {
      if (type == 'overlay') {
        showModal = false
      }
      if(type == 'escape') {
        //nothing on escape
      }
    },
  }
}
</script>
