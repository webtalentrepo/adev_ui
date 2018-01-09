<template>
  <div>
    <LoadingOverlay message="hii" :show="showLoad"></LoadingOverlay>
    <Popup :show="showModal2"
           transition="modal-fall"
           @close="showModal2 = false">
      <MyModal @close="showModal2 = false"
               :name="2"></MyModal>
      <button class="ui-button"
              @click="showModal = false">X</button>
      <button class="ui-button"
              @click="showModal = true">V</button>
    </Popup>

    <Popup :show="showModal"
           @close="showModal = false">
      <div v-for="(item, i) in myArr"
           class="ui-card"
           :key="i">{{item}}</div>
      <button class="ui-button"
              @click="myArr.push('k')">Add</button>
    </Popup>

    <button class="ui-button"
            @click="showModal2 = true">Show2</button>
  </div>
</template>
<script>
import {Modal, LoadingOverlay} from '@'
import MyModal from './ModalTest'
export default {
  name: 'Load',
  components: { MyModal, LoadingOverlay, Popup: Modal },
  data: () => ({
    myArr: [],
    showModal2: false,
    showModal: false,
    showLoad: true
  }),
  methods: {
    say(n) {
      console.log(n)
    },
  }
}
</script>
