<template>
  <div class="menu">
    <button v-for="tab in tabs" class="menu-button" @click="tabChanged(tab)" :class="tabSelected === tab ? 'selected' : ''">{{tab}}</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

// 响应式数据
const props = defineProps(["tabs"])
const emit = defineEmits(['tab-changed'])

let tabSelected = ref(props.tabs[0])

// 菜单栏选项点击事件
function tabChanged(tabName: string) {
  tabSelected.value = tabName
  // 将事件抛出到上层
  emit('tab-changed', tabName)
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 20%;
  height: 100%;
  background-color: darkred;

  background-image: url("../assets/icon.png");
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-attachment: fixed;
}

.menu-button {
  width: 100%;
  height: 5%;
  border: none;
  background-color: darkgray;
  cursor: pointer;
  border-top: 5px solid darkgray;
}

.menu-button.selected {
  background-color: beige;
  border-top: 5px solid darkred;
}
</style>