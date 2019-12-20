<template>
  <div class="body bodyScholar" style="width: 100%;">
    <div id="reasearchFields" style="display: flex;width: 100%">
      <h4 style="display: inline">
        <b style="color: white">研究方向：</b>
      </h4>
      <el-tag
        class="transparent"
        v-for="(tag,index) in scholarinfo.tags.slice(0,5)"
        :key="index"
        :disable-transitions="false"
        v-on:click="goToSearchTag(tag.t)"
      >{{ tag.t.length > 30 ? tag.t.substr(0, 25) + "..." : tag.t }}
      </el-tag>
    </div>
    <div style="margin-top: 3%;">
      <div style="display: flex; padding: 0 1vw 0 1vw;">
        <Card
          v-for="(item, ind) in 4"
          :key="ind"
          :title="news[ind].title"
          :description="news[ind].desc"
          :pic="news[ind].keyword"
          style="margin: 0 1vw 0 1vw; width: 100%"
          :articleId="news[ind].id"
        />
      </div>
    </div>

    <div class="scholarPaper clear">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="个人简介" name="1">
          <div style="display:flex">
            <Intro :scholarinfo="scholarinfo" :hasbox="isInfoBox"/>
            <div class="infoBox" v-show="isInfoBox">
              <div id="editBtn">
                <el-button v-show="isself" class="el-icon-edit" @click="updateBulletin"></el-button>
              </div>
              <p class="selfIntro">
                {{scholarinfo.bulletin}}
              </p>
              <p class="selfIntroTime">2019 年 5 月 31 日, 9:30 a.m.</p>
            </div>
          </div>
          <div style="height:100%;margin-left:2vw">
            <ClienderGraph :Data="scholarinfo.tags.slice(0, 20)"></ClienderGraph>
          </div>
        </el-collapse-item>
        <el-collapse-item title="相关学者" name="2">
          <Relation :selfinfo="scholarinfo" :coauthors="scholarinfo.coauthors.slice(0,9)"></Relation>
        </el-collapse-item>
        <el-collapse-item title="论文列表" name="3">
          <Paper v-if="asyncFlag" :selfnames="selfName" :articles="articles"/>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
    import Card from "./Card";
    import Paper from "./Paper";
    import Radar from "./Radar";
    import Relation from "./Relation";
    import Intro from "./Intro";
    import ClienderGraph from "./ClinderGraph";
    import {getPaperById, removeTag} from "../../graphql/scholar";

    export default {
        name: "Body",
        props: ["scholarinfo", "isself"],
        components: {
            Intro,
            Relation,
            Paper,
            Card,
            Radar,
            ClienderGraph
        },
        data() {
            return {
                tagToken: "",
                tagWeight: "",
                dynamicTags: ["标签一", "标签二", "标签三"],
                inputVisible: false,
                inputValue: "",
                infoVal: "",
                value: false,
                asyncFlag: false,
                activeNames: ["1", "2", "3", "4"],
                selfName: "",
                articles: [],

                src:
                    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                news: [
                    {
                        title: "最新发布",
                        desc: "",
                        keyword: "computer",
                        id:""
                    },
                    {
                        title: "编辑推荐",
                        desc: "",
                        keyword: "book",
                        id:""
                    },
                    {
                        title: "近期热门",
                        desc: "",
                        keyword: "student",
                        id:""
                    },
                    {
                        title: "最新发布",
                        desc: "",
                        keyword: "bool",
                        id:""
                    }
                ]
            };
        },
        computed:{
            isInfoBox(){
                return this.isself || this.scholarinfo.userId;
            }
        },
        methods: {
            sortKey(array, key) {
                return array.sort(function (a, b) {
                    let x = a[key];
                    let y = b[key];
                    return x > y ? -1 : x < y ? 1 : 0;
                });
            },
            goToSearchTag(str) {
                this.$router.push({path: '/search', query: {w: str}});
            },
            gotoArticle(id){
                this.$router.push({path: '/article', query: {ID: id}});
            },
            updateBulletin(){
                this.$emit('editBulletin')
            }
        },
        async mounted() {
            let that = this;
            const id = that.scholarinfo.userId;
            if (id === this.$store.getters.id) that.isself = true;
            const result = await getPaperById(this.$route.query.ID);
            that.articles = this.sortKey(
                result.data["searchPapersByScholarId"],
                "year"
            );
            let flag = false;
            for (let i = 0; i < that.articles.length; i++) {
                for (let j = 0; j < that.articles[i].authors.length; j++) {
                    if (that.articles[i].authors[j].id === that.$route.query.ID) {
                        that.selfName = that.articles[i].authors[j].name;
                        flag = true;
                        break;
                    }
                }
                if (flag === true)
                    break;
            }
            that.asyncFlag = true;
            for (let i = 0; i < 4; i++) {
                this.news[i].desc =
                    i < this.articles.length ? this.articles[i].title : "暂无，敬请期待";
                that.articles[i] ? this.news[i].id = that.articles[i].id : {};
            }
    },
    };
</script>

<style scoped>
  #reasearchFields {
    padding-left: 2vw;
    padding-top: 3vh;
  }

  .selfIntro {
    font-size: x-large;
    color: white;
    padding-top: 5vh;
    padding-left: 2vw;
    padding-right: 2vw;
  }

  .selfIntroTime {
    color: #9d9d9d;
    padding-top: 2vh;
    padding-left: 2vw;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .scholarPaper {
    width: 75vw;
    margin-left: 2vw;
    padding-top: 5vh;
  }

  @media (max-width: 1200px) {
    .scholarPaper {
      width: 95vw;
    }
  }

  .clear {
    clear: both;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .transparent {
    background-color: black;
    color: white;
    opacity: 1;
  }

  .infoBox {
    border-top: 4px solid greenyellow;
    float: left;
    background-color: gray;
    width: 50vw;
    margin-left: 4vw;
    margin-right: 1vw;
    margin-top: 2vh;
    height: 190px;
  }

  @media (max-width: 1200px) {
    .infoBox {
      width: 63vw;
    }
  }

  @media (max-width: 1200px) {
    .introRadar {
      width: 10vw;
    }
  }
</style>

<style>
  .el-collapse-item__header,
  .el-collapse-item__wrap,
  .el-table th,
  .el-table tr {
    background: none !important;
  }
</style>
