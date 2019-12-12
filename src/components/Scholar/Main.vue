<template>
  <div class="scholarPg">
    <Header v-on:sendprivatemsg="privateMsgFlag = true" :scholarInfo="scholarInfo" :isSelf="isSelf" :isFollowing="isFollowing"></Header>
    <Body :scholarInfo="scholarInfo" :isSelf="isSelf"></Body>
    <!-- 对话框，发送私信用 -->
    <el-dialog title="发送私信" :visible.sync="privateMsgFlag" :modal-append-to-body="false">
      <el-form :model="privateMsgForm" :ref="privateMsgForm" label-position="left">
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="6"
            style="width: 90%;"
            v-model="privateMsgForm.privateMsgVal"
            autocomplete="on"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="privateMsgFlag = false">取 消</el-button>
        <el-button type="primary" @click="sendPrivateMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "./Header";
import Body from "./Body";
import { findScholarById, sendMessage } from "../../graphql/scholar";
export default {
  name: "Main",
  components: {
    Header,
    Body
  },
  async mounted() {
    //const curUser = await getCurrentUser();
    let that = this;
    const id = that.$route.query.ID;
    if (id === this.$store.getters.id) this.isSelf = true;
    const scholar = await findScholarById(id);
    this.scholarInfo = scholar.data["findScholarById"].scholar;
    this.isFollowing = scholar.data["findScholarById"].isFollowing;
  },
  computed: {
    username() {
      return this.$store.getters.usersName;
    },
    id() {
      return this.$store.getters.id;
    }
  },
  data() {
    return {
      isFollowing:false,
      isSelf: false,
      privateMsgFlag: false,
      privateMsgForm: {
        subject: "",
        privateMsgVal: ""
      },
      scholarInfo: {}
    };
  },
  methods: {
    sendPrivateMsg: function() {
      sendMessage(this.$route.query.ID, this.privateMsgForm.privateMsgVal);
      this.privateMsgFlag = false;
      this.$message({
        type: "success",
        message: "已成功发送私信"
      });
    },
    openPrivateMsgDialog: function() {}
  },
};
</script>

<style scoped>
</style>
