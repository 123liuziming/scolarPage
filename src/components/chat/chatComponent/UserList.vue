<template>
  <div class="user-list">
    <table class="" style="padding-top: 5px;">
      <tbody>
        <tr v-for="user in contacts" :key="user.id" @click="$emit('changeParticipant',user.id)">
          <el-button size="mini" class="el-button" type="primary" plain>
            <td style="text-align: center;"><img :src="user.imageUrl" class="img-msg"/></td>
            <td class="user-element">{{user.name}}</td>
          </el-button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
.el-button{
  margin-top: 5px;
}
.user-list {
  background-color: #304154;
  height: 100%;
  overflow: auto;
  padding-left: 5px;
  padding-top: 5px;
}
.img-msg {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 3px;
}
.user-element {
  font-size: 18px;
  vertical-align: middle;
}
</style>
