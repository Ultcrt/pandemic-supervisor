<template>
  <div id="login">
    <div id="login-sub-window" class="sub-window">
      <div id="login-title-div">
        <label id="login-title-label">登录</label>
      </div>
      <div id="login-type-div" class="login-input-div">
        <label class="login-label">类型：</label>
        <select id="login-type-select" class="global-input clickable login-input" v-model="loginType">
          <option>学生</option>
          <option>管理员</option>
        </select>
      </div>
      <div id="login-account-div" class="login-input-div">
        <label class="login-label">账号：</label>
        <input class="login-input" v-model="id"/>
      </div>
      <div id="login-password-div" class="login-input-div">
        <label class="login-label">密码：</label>
        <input class="login-input" type="password" v-model="password"/>
      </div>
      <button id="login-button" class="global-input clickable login-input" @click="login">登录</button>
      <p id="login-notification"><span v-html="`<span style='color: white'>${notification}</span>`"></span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {
  Authority,
  authority,
  authorizedId,
  authorizedPassword,
  axiosInstance,
  ResponseStatus
} from "../scripts/SharedState";

let loginType = ref("学生")

let id = ref("")
let password = ref("")

let notification = ref("")

function login() {
  switch (loginType.value) {
    case "学生":
      axiosInstance.post("/students/login", {
        id: id.value,
        password: password.value,
        type: Authority.Student
      }).then(function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          authority.value = Authority.Student
          authorizedId.value = id.value;
          authorizedPassword.value = password.value;
          window.location.hash = "/student"
          notification.value = ""
        }
        else {
          notification.value = "登录失败，请检查登录信息"
        }
      })
      break
    case "管理员":
      axiosInstance.post("/admin/login", {
        id: id.value,
        password: password.value,
        type: Authority.Admin
      }).then(function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          authority.value = Authority.Admin
          authorizedId.value = id.value
          authorizedPassword.value = password.value;
          window.location.hash = "/admin"
          notification.value = ""
        }
        else {
          notification.value = "登录失败，请检查登录信息"
        }
      })
      break;
  }
}
</script>

<style scoped>
#login {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: -609px 0;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: beige;
}

.sub-window {
  background-color: darkred;
}

#login-sub-window {
  width: 40vh;
  height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

#login-title-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#login-title-label {
  font-size: 40px;
  color: white;
}

#login-notification {
  height: 10%;
}

.login-label {
  color: white;
  font-size: 24px;
  height: 100%;
}

.login-input-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  width: 90%;
  height: 10%;
}

.login-input {
  width: 75%;
  font-size: 24px;
}
</style>