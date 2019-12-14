<template>
  <div :class="hasbox ? 'introBox hasbox' : 'introBox nobox'">
    <el-table :show-header="false" :data="tableData" style="background: none;">
      <el-table-column>
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
        props: ["scholarinfo", "hasbox"],
        mounted() {
            this.tableData[0].name = this.scholarinfo.name;
            this.tableData[1].name = this.scholarinfo.hIndex;
            this.tableData[2].name = this.scholarinfo.nPubs;
            this.tableData[3].name = this.scholarinfo.nCitations;
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
  .introBox.hasbox {
    width: 40vw;
    margin-top: 2vh;
    margin-left: 2vw
  }

  .introBox.nobox {
    width: 69vw;
    margin-top: 2vh;
    margin-left: 2vw
  }
</style>
