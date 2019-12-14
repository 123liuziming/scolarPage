<template>
  <div class="body bodyScholar" style="width: 100%;">
    <div id="reasearchFields" style="display: flex;width: 100%">
      <h4 style="display: inline">
        <b style="color: white">研究方向：</b>
      </h4>
      <el-tag
        class="transparent"
        :key="tag"
        v-for="tag in scholarInfo.tags.slice(0,4)"
        :closable="isSelf"
        :disable-transitions="false"
        @close="handleClose(tag)"
        v-on:click="goToSearchTag(tag.t)"
      >{{ tag.t }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInput"
        v-show="isSelf"
      >+ New Tag
      </el-button>
    </div>
    <div style="margin-top: 3%;float: left; width: 100%">
      <div style="width: 100%;">
        <div style="display: flex; padding: 0 1vw 0 1vw; width: 100%;">
          <Card
            v-for="(_, ind) in 4"
            :key="ind"
            :title="news[ind].title"
            :description="news[ind].desc"
            :pic="news[ind].keyword"
            style="margin: 0 1vw 0 1vw; width: 100%"
          />
        </div>
      </div>
      <div style="padding-left: 1vw;float: left;width: 29vw">
        <div style="padding-left: 1vw">
          <h4 style="color: white;">相关学者</h4>
          <el-divider/>
        </div>
        <el-carousel :interval="4000" type="card" height="30vh">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="infoBox">
        <div id="editBtn">
          <el-button v-show="isSelf" class="el-icon-edit" @click="$emit('editBulletin')"></el-button>
        </div>
        <p class="selfIntro">
          {{scholarInfo.bulletin}}
        </p>
        <p class="selfIntroTime">2019 年 5 月 31 日, 9:30 a.m.</p>
      </div>
    </div>

    <div class="scholarPaper clear">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="个人简介" name="1">
          <div style="display:flex">
            <Intro :scholarInfo="scholarInfo"/>
            <Relation></Relation>
          </div>
          <div style="height:100%;margin-left:2vw">
            <ClienderGraph :Data="scholarInfo.tags"></ClienderGraph>
          </div>
        </el-collapse-item>
        <el-collapse-item title="论文列表" name="3">
          <Paper :articles="articles" :totalArticles="articles.length"/>
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
    import {getPaperById} from "../../graphql/scholar";

    export default {
        name: "Body",
        props: ["scholarInfo", "isSelf"],
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
                dynamicTags: ["标签一", "标签二", "标签三"],
                inputVisible: false,
                inputValue: "",
                infoVal: "",
                value: false,
                activeNames: ["1", "2", "3", "4"],
                articles: [],
                src:
                    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                news: [
                    {
                        title: "最新发布",
                        desc: ""
                    },
                    {
                        title: "编辑推荐",
                        desc: ""
                    },
                    {
                        title: "近期热门",
                        desc: ""
                    },
                    {
                        title: "最新发布",
                        desc: ""
                    }
                ]
            };
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);

            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = "";
            },
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
        },
        async mounted() {
            let that = this;
            const id = that.$route.query.ID;
            if (id === this.$store.getters.id) this.isSelf = true;
            const result = await getPaperById(id);
            this.articles = this.sortKey(
                result.data["searchPapersByScholarId"],
                "year"
            );
            for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i].authors.name === this.$store.getters.usersName) {
                    this.articles.splice(i, 1);
                }
            }

            for (let i = 0; i < 4; i++) {
                this.news[i].desc =
                    i < this.articles.length ? this.articles[i].title : "暂无，敬请期待";
            }
            this.sortKey(this.scholarInfo.tags, "w");
        }
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
    width: 44vw;
    margin-left: 4vw;
    margin-right: 1vw;
    margin-top: 2vh;
    height: 37vh;
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
