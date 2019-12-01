<template>
  <div class="body bodyScholar">
    <div id="reasearchFields" style="display: flex;width: 100%">
      <h4 style="display: inline"><b style="color: white">研究方向：</b></h4>
      <el-tag
        class="transparent"
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <div>
      <div style="margin-top: 3%;float: left;">
        <div>
          <div style="display: flex; padding: 0 1vw 0 1vw">
          <Card
            v-for="(_, ind) in 4"
            :key="ind"
            :title="news[ind].title"
            :description="news[ind].desc"
            :pic="news[ind].keyword"
            style="margin: 0 1vw 0 1vw;"
          />
          </div>
        </div>
        <div style="padding-left: 1vw;float: left;width: 25vw">
          <div style="padding-left: 1vw"><h4 style="color: white;">相关学者</h4>
            <el-divider></el-divider></div>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          </div>
        <div class="infoBox">
          <p class="selfIntro">I'm recruiting some students to help me with a project.If you 're interested, please
            contact
            me via the e-mail provided above
          </p>
          <p class="selfIntroTime">2019年5月31日,9:30 a.m.</p>
        </div>
      </div>

    </div>

    <div class="scholarPaper clear">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="个人简介" name="1">
          <div style="float: left"><Intro></Intro></div>
          <div style="float: left"><Radar></Radar></div>
        </el-collapse-item>
        <el-divider></el-divider>
        <el-collapse-item title="学者统计" name="2">
          <div style="display: flex">
            <Relation></Relation>
          </div>
        </el-collapse-item>
        <el-divider></el-divider>
        <el-collapse-item title="论文列表" name="3">
          <Paper></Paper>
        </el-collapse-item>
        <el-divider></el-divider>
      </el-collapse>
    </div>


  </div>
</template>

<script>
    import Card from "./Card";
    import Paper from "./Paper";
    import Radar from './Radar'
    import Relation from "./Relation";
    import Intro from "./Intro";

    export default {
        name: "Body",
        components: {
            Intro,
            Relation,
            Paper,
            Card,
            Radar
        },
        data() {
            return {
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                value: false,
                activeNames: ['1','2','3','4'],
                src:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                news: [
                    {
                        title: "最新发布",
                        desc: "The rise of the machines: Artificial intelligence",
                        keyword: "computer"
                    },
                    {
                        title: "编辑推荐",
                        desc: "Exploring scholarly data with rexplorer",
                        keyword: "book"
                    },
                    {
                        title: "近期热门",
                        desc: "Evaluating search engine models for scholarly purposes",
                        keyword: "student"
                    },
                    {
                        title: "最新发布",
                        desc: "The visibility of Wikipedia in scholarly publications",
                        keyword: "book"
                    }
                ]
            }
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
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>

  #reasearchFields {
    padding-left: 2vw;
    padding-top: 3vh;
  }

  .selfIntro {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: x-large;
    color: white;
    padding-top: 5vh;
    padding-left: 2vw;
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
    width: 70vw;
    margin-left: 2vw;
    margin-top: 3vh;
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

  .infoBox{
    border-top: 4px solid greenyellow;
    float: left;
    background-color: gray;
    width: 43vw;
    margin-left: 4vw;
    margin-right: 1vw;
    margin-top: 2vh;
    min-height: 36vh;
  }

</style>
