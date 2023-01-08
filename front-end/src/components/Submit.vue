<template>
  <div id="submit">
    <div id="department" class="submit-row">
      <label class="login-label">学院：</label>
      <select v-model="college" class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled">
        <option v-for="item in departmentList">{{item}}</option>
      </select>
    </div>
    <div id="location" class="submit-row">
      <label class="login-label">所在地：</label>
      <select v-model="location" class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled">
        <option v-for="item in locationList">{{item}}</option>
      </select>
    </div>
    <div id="done-test" class="submit-row">
      <label class="login-label">当日核酸结果：</label>
      <select v-model="detectResult" class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled">
        <option v-for="item in detectResultTypes">{{item}}</option>
      </select>
    </div>
    <textarea v-model="remarks" placeholder=""></textarea>
    <button id="submit-button" class="global-input" :class="readyToSubmit ? 'clickable' : ''" @click="submit" :disabled="!readyToSubmit">提交</button>
    <p> <span v-html="`<span style='color: red'>${notification}</span>`"></span> </p>
  </div>
</template>

<script setup lang="ts">
import {
  authority,
  locationList,
  departmentList,
  axiosInstance,
  authorizedId,
  authorizedPassword,
  detectResultTypes, ResponseStatus
} from "../scripts/SharedState";
import {computed, ref} from "vue";

let props = defineProps(["studentId", "disabled"])

let college = ref("")
let location = ref("")
let detectResult = ref("")
let remarks = ref("")

let notification = ref("")

const readyToSubmit = computed(() => {
  return college.value !== "" && location.value !== "" && detectResult.value !== ""
})

function submit() {
  axiosInstance.post("/students/submit", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    detect_result: detectResult.value,
    location: location.value,
    remarks: remarks.value,
    college: college.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notification.value = ""
        }
        else {
          notification.value = "提交失败，请检查学院信息"
        }
      }
  )
}
</script>

<style scoped>
#submit {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.submit-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>