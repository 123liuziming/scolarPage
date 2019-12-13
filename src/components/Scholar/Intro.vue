<template>
  <div class="introBox">
    <el-table :show-header="false" :data="tableData" style="width: 100%; background: none;">
      <el-table-column width="100%">
        <template slot-scope="scope">
          <strong>{{ scope.row.date }}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="name"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Intro",
  props:["scholarInfo"],
  mounted() {
    this.tableData[0].name = this.scholarInfo.name;
    this.tableData[1].name = this.scholarInfo.hIndex;
    this.tableData[2].name = this.scholarInfo.nPubs;
    this.tableData[3].name = this.scholarInfo.nCitations;
  },
  data() {
    return {
      tableData: [
        {
          date: "姓名",
          name: ""
        },
        {
          date: "H-index",
          name: 0
        },
        {
          date: "发表论文数",
          name: 0
        },
        {
          date: "引用总数",
          name: 0
        }
      ]
    };
  }
};
</script>

<style scoped>
.introBox {
  width: 62vw;
  margin-top: 2vh;
  margin-left: 5vw
}
</style>
