<template>
  <div class="introBox">
    <el-table
      :show-header="false"
      :data="tableData"
      style="width: 100%; background: none;  table-layout: fixed"
    >
      <el-table-column width="100%">
        <template slot-scope="scope">
          <strong>{{ scope.row.date }}</strong>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Intro",
  data() {
    return {
      tableData: [
        {
          date: "title",
          name: ""
        },
        {
          date: "authors",
          name: {}
        },
        {
          date: "issue",
          name: ""
        },
        {
          date: "keywords",
          name: []
        },
        {
            date: "venue",
            name: ""
        },
        {
          date: "abstracts",
          name: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
        }
      ]
    };
  }
};
</script>

<style scoped>
.introBox {
  width: 100%;
  margin-top: 1vh;
}
@media (max-width: 1200px) {
  .introBox {
    width: 60vw;
  }
}
</style>
<style lang="css"> .el-tooltip__popper{ max-width:40% } </style>
