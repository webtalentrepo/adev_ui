<template>
  <div>
    <Collapses tag="ul" group>
      <li v-for="item in items" :key="item.id" class="hi">
        {{ item.text }}
        <button @click="deleteItem(item.id)">X</button>
      </li>
    </Collapses>

    <button @click="showDiv = !showDiv">toggle</button>
    <button @click="addItem">Add</button>
    <div class="limit-scroll">
      <Datepicker :calendarButton="true" :clearButton="true"></Datepicker>
      <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>
      <Popper>
        <button @click="showMenu = !showMenu" slot="reference" class="ui-button">Click</button>
        <ul class="ui-menu ui-elevation-1">
          <li>
            <a class="ui-menu-item ui-icon-people">Share...</a>
          </li>
          <li>
            <a class="ui-menu-item ui-icon-circle-arrow-right">Move...</a>
          </li>
          <li class="ui-menu-divider"></li>
          <li>
            <a class="ui-menu-item ui-icon-trash ui-intent-danger">Delete</a>
          </li>
        </ul>
      </Popper>
      <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>
    </div>
  </div>
</template>
<script>
import Select from "@/components/Select2.vue";
import Select2 from "@/components/Select.vue";

import Modal from "@/components/Modal";
import Dialog from "@/components/Dialog";
import Datepicker from "@/components/Datepicker";
import Popper from "@/components/Popper";

import Collapses from '@/transitions/Collapse.vue'

import MultiSelect from "vue-multiselect";
export default {
  name: "App",
  components: {
    vselect: Select,
    vvselect: Select2,
    MultiSelect,
    Datepicker,
    Popper,
    Modal,
    Collapses,
    "ui-dialog": Dialog
  },
  data: () => ({
    currentPage: 0,
    showModal: true,
    selected: null,
    showMenu: false,
    showDiv: true,
    items: [
      {id: 1, text:"HI"},
      // {id: 2, text:"HI"},
      // {id: 3, text:"HI"},
      // {id: 4, text:"HI"},
    ],
    MAXID: 4,
    options: ["list", "of", "options"]
  }),
  methods: {
    deleteItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    addItem() {
      this.items.push({id: this.MAXID++, text: "ddd"})
    }
  },
  mounted() {
    console.log(this.$refs);
  }
};
</script>
<style lang="stylus">
.my-div {
  height: 100px;
  width: 200px;
}

.unscrollbar-wrapper {
  overflow: hidden;
}

.unscrollbar-content {
  width: calc(100% + 10px);
  height: 100%;
  overflow: auto;
}

.limit-scroll {
  width: 200px;
  height: 200px;
  overflow: scroll;
  border: solid 1px;
  background: pink;
}

.red-div {
  width: 200px;
  height: 200px;
  background: red;
}

.blue-div {
  width: 200px;
  height: 200px;
  background: blue;
}
.hi {
  width: 200px;
  height: 50px;
  background: pink;
  margin: 5px;
}
</style>
