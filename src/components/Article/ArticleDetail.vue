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
  import {getPaper} from "../../graphql/Article";
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
          name: ""
        },
        {
          date: "issue",
          name: ""
        },
        {
          date: "keywords",
          name: ""
        },
        {
            date: "venue",
            name: ""
        },
        {
          date: "abstracts",
          name: ""
        }
      ]
    };
  },
  async mounted() {
    this.id = this.$route.query.ID;
    const item = (await getPaper(this.id)).data.getPaperById.currentPaper;
    //文章信息初始化
    this.tableData[0].name = item.title;
    for(let i =0;i<item.authors.length;i++){
      this.tableData[1].name+=item.authors[i].name+","
    }
    this.tableData[2].name = item.issue!==null?item.issue:"暂无"
    if(item.keywords.length===0)
      this.tableData[3].name = '暂无关键词'
    for(let i =0;i<item.keywords.length;i++){
      this.tableData[3].name+=item.keywords[i]+","
    }
    this.tableData[4].name = item.venue===null?"暂无":item.venue;
    this.tableData[5].name = item.abstract===null?"应版权方要求，无法显示":item.abstract;
  },
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
