<template>
  <div class="scholarPg">
    <Header v-if="headerFlag" v-on:auth="authFlag = true" v-on:sendprivatemsg="privateMsgFlag = true" :scholarinfo="scholarInfo"
            :isself="isSelf"
            :isfollowing="isFollowing"></Header>
    <Body v-if="bodyFlag" v-on:editBulletin="bulletinFlag = true" :scholarInfo="scholarInfo" :isSelf="isSelf"></Body>
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
    <el-dialog title="编辑通知" :visible.sync="bulletinFlag" :modal-append-to-body="false">
      <el-input
        type="textarea"
        :rows="6"
        style="width: 90%;"
        v-model="scholarBulletin"
        autocomplete="on"
        :placeholder="this.scholarInfo.bulletin"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bulletinFlag = false">取 消</el-button>
        <el-button type="primary" @click="updateBul">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="认领主页" :visible.sync="authFlag" :modal-append-to-body="false">
      <el-form :model="authForm" :ref="authForm" label-position="right">
        <el-form-item label="Email">
          <el-input v-model="authForm.email" style="width: 90%">
          </el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-input
            type="textarea"
            :rows="6"
            style="width: 90%;"
            v-model="authForm.content"
            autocomplete="on"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authFlag = false">取 消</el-button>
        <el-button type="primary" @click="sendAuth">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import Header from "./Header";
    import Body from "./Body";
    import {findScholarById, sendMessage, updateBulletin} from "../../graphql/scholar";

    export default {
        name: "Main",
        components: {
            Header,
            Body
        },
        async mounted() {
            let that = this;
            const id = that.$route.query.ID;
            if (id === this.$store.getters.userId) this.isSelf = true;
            const scholar = await findScholarById(id);
            this.scholarInfo = scholar.data["findScholarById"].scholar;
            if(this.scholarInfo.orgs.length === 0)
                this.scholarInfo.orgs.push("No research institute");
            this.isFollowing = scholar.data["findScholarById"].isFollowing;
            this.headerFlag = true;
            this.bodyFlag = true;
        },
        computed: {
            id() {
                return this.$store.getters.id;
            }
        },
        data() {
            return {
                bodyFlag:false,
                headerFlag:false,
                isFollowing: "",
                isSelf: false,
                privateMsgFlag: false,
                bulletinFlag: false,
                authFlag: false,
                privateMsgForm: {
                    subject: "",
                    privateMsgVal: ""
                },
                authForm: {
                    email: "",
                    content: ""
                },
                scholarInfo: {},
                scholarBulletin: "",
            };
        },
        methods: {
            sendPrivateMsg: function () {
                sendMessage(this.$route.query.ID, this.privateMsgForm.privateMsgVal);
                this.privateMsgFlag = false;
                this.$message({
                    type: "success",
                    message: "已成功发送私信"
                });
            },
            updateBul() {
                //alert(this.$store.getters.userId);
                //alert(this.scholarBulletin);
                updateBulletin(this.$store.getters.userId, this.scholarBulletin);
                this.$notify({
                    title: "已成功更新",
                    type: "success",
                    message: "已经成功更新通知栏"
                });
                this.bulletinFlag = false;
            },
            sendAuth(){

            }
        },
    };
</script>

<style scoped>
</style>
