<template>
  <div class="scholarPg">
      <Header v-on:sendprivatemsg = "privateMsgFlag = true"></Header>
      <Body></Body>
    <!-- 对话框，发送私信用 -->
    <el-dialog title="发送私信" :visible.sync="privateMsgFlag" :modal-append-to-body='false'>
      <el-form :model="privateMsgForm" :ref="privateMsgForm" label-position="left">
        <el-form-item label="主题">
          <el-select v-model="privateMsgForm.subject" placeholder="请选择私信主题">
            <el-option label="专利转让" value="shanghai"></el-option>
            <el-option label="合作论文" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="6" style="width: 90%;" v-model="privateMsgForm.privateMsgVal" autocomplete="on"></el-input>
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

    export default {
        name: "Main",
        components: {
            Header,
            Body,
        },
        data() {
            return {
                privateMsgFlag: false,
                privateMsgForm:{
                    subject:"",
                    privateMsgVal: "",
                },
            }
        },
        methods:{
            sendPrivateMsg:function () {
                this.privateMsgFlag = false;
                this.$message({
                    type: 'success',
                    message: '已成功发送私信'
                })
            },
            openPrivateMsgDialog:function () {

            }
        }
    }
</script>

<style scoped>

</style>
