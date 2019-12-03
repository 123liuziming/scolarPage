<template>
  <div class="introBox">
    <el-table
      :show-header="false"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        width="100%"
      >
        <template slot-scope="scope">
          <strong>{{ scope.row.date }}</strong>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "Intro",
        data() {
            return {
                tableData: [{
                    date: '姓名',
                    name: '老刘',
                }, {
                    date: '擅长领域',
                    name: '机器学习',
                }, {
                    date: '个人简介',
                    name: '擅长唱，跳，rap，篮球',
                }, {
                    date: '教育经历',
                    name: '本科毕业于北京航空航天大学软件学院，',
                }]
            }
        }
    }
</script>

<style scoped>
  .introBox {
    width: 40vw;
    margin-left: 3vw;
    margin-top: 2vh;
  }
  @media (max-width: 1200px) {
    .introBox{
      width: 60vw;
    }
  }
</style>
