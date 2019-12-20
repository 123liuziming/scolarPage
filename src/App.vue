<template>
  <div id="app">
    <Navigator />
    <router-view v-on:messageScholar="messageScholar" />
    <Launcher
      ref="launcher"
      @changeParticipant="changeParticipant"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :titleImageUrl="titleImageUrl"
      :isOpen="isChatOpen"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :newMessagesCount="newMessagesCount"
      :onMessageWasSent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :contacts="contacts"
      :placeholder="`写入消息...`"
      :showEmoji="true"
      :showFile="false"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
    ></Launcher>
  </div>
</template>

<script>
import Navigator from "./components/Navigator";
import gql from "graphql-tag";
import { fetchUserInfo } from "@/store";
import availableColors from "./components/chat/colors";
import {
  gql_getAllContacts,
  gql_getAllMessage,
  gql_sendMessage
} from "@/graphql/social";
import Launcher from "./components/chat/chatComponent/Launcher";
import { avatarOf } from "@/common";

export default {
  name: "App",
  components: {
    Navigator,
    Launcher
  },
  data() {
    return {
      participants: [],
      messageList: [],
      contacts: [],
      newMessagesCount: 0,
      isChatOpen: false,
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: false,
      messageStyling: true,
      userIsTyping: false,
      timer: null
    };
  },
  created() {
    this.setColor("dark");
  },
  mounted() {
    if (!this.$store.getters.hasLoggedIn && !!localStorage.getItem("token")) {
      this.$store.dispatch(fetchUserInfo);
    }
    this.messageList.forEach(x => (x.liked = false));
  },
  methods: {
    avatarOf,
    messageScholar(scholar) {
      this.openChat();
      this.changeParticipant({
        id: scholar.id,
        imageUrl: avatarOf({ avatar: scholar.avatar, name: scholar.name }),
        name: scholar.name
      });
    },
    clearAll() {
      this.messageList = [];
      this.contacts = [];
      this.participants = [];
      this.newMessagesCount = 0;
    },
    scrollDown() {
      if(this.$refs.launcher)
        this.$refs.launcher.handleScrollDown();
    },
    async getAllContacts() {
      try {
        const response = await gql_getAllContacts();
        this.contacts = response.data.recentContacts.map(e => ({
          ...e,
          imageUrl: avatarOf({ avatar: e.avatar, name: e.name })
        }));
        if (!this.contacts.length)
          this.contacts.push({
            name: this.$store.getters.usersName,
            id: this.$store.getters.userId,
            imageUrl: this.$store.state.user.avatar
          });
        this.participants = [this.contacts[0]];
        this.changeParticipant(this.participants[0]);
      } catch (err) {
        console.error(err);
        this.isChatOpen = false;
        this.$message({
          type: "error",
          message: "在处理您请求的过程中发生了问题。"
        });
      }
    },
    async getAllMessages() {
      if (!this.participants.length) return;
      try {
        const response = await gql_getAllMessage(
          this.$store.getters.userId,
          this.participants[0].id,
          0,
          99
        );
        this.messageList = response.data.messages.map(e => {
          const result = {
            type: e.type || "text",
            author:
              e.senderId === this.$store.getters.userId
                ? "me"
                : this.participants[0].name,
            id: e.id
          };
          if (result.type === "emoji")
            result.data = {
              emoji: e.content
            };
          else if (result.type === "text")
            result.data = {
              text: e.content
            };
          return result;
        });
      } catch (err) {
        console.error(err);
      }
    },
    async handleSendMessage(message) {
      try {
        await gql_sendMessage(this.participants[0].id, message);
        this.scrollDown();
      } catch (err) {
        console.error(err);
      }
    },
    async changeParticipant(user) {
      this.participants = [user];
      await this.getAllMessages();
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(
        () => {
          this.getAllMessages();
        },
        process.env.NODE_ENV === "production" ? 10000 : 1000
      );
      this.scrollDown();
    },

    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
      this.messageList = [
        ...this.messageList,
        Object.assign({}, message, { id: Math.random() })
      ];
      this.handleSendMessage(message);
    },
    openChat() {
      if (!this.$store.getters.userId) {
        this.$notify({
          type: "info",
          title: "需要登录",
          message: `登录以后才可以使用站内信功能`,
          duration: 4000
        });
        return;
      }
      this.getAllContacts().then(action => {
        this.newMessagesCount = 0;
        this.isChatOpen = true;
      });
    },
    closeChat() {
      this.isChatOpen = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    setColor(color) {
      this.colors = this.availableColors[color];
      this.chosenColor = color;
    },
    showStylingInfo() {
      this.$modal.show("dialog", {
        title: "Info",
        text:
          "You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>"
      });
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked;
    },
    handleOnType() {
      this.$root.$emit("onType");
      this.userIsTyping = true;
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    removeMessage(message) {
      if (confirm("Delete?")) {
        const m = this.messageList.find(m => m.id === message.id);
        m.type = "system";
        m.data.text = "This message has been removed";
      }
    },
    like(id) {
      const m = this.messageList.findIndex(m => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    }
  },
  computed: {
    titleImageUrl() {
      if (this.participants.length && this.participants[0].imageUrl)
        return this.participants[0].imageUrl;
      else
        return "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png";
    },
    linkColor() {
      return this.chosenColor === "dark"
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg;
    },
    backgroundColor() {
      return this.chosenColor === "dark" ? this.colors.messageList.bg : "#fff";
    }
  },
  watch: {
    "$store.getters.hasLoggedIn"(newVal) {
      this.closeChat();
      this.clearAll();
    }
  }
};
</script>

<style>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.body {
  min-height: 125vh;
  background-color: black;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
  margin-bottom: 10px;
}
.body.bodyScholar {
  margin-top: 330px;
}

.body.bodyArticle {
  margin-top: 100px;
}

.body.bodyPerson {
  margin-top: 40px;
}

.scholarPg {
  padding: 15vh 10vw 0 10vw;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8)),
    url("../static/image/bg.jpg");
  background-size: cover;
  min-height: 400px;
}

@media (max-width: 1200px) {
  .scholarPg {
    padding-left: 0;
    padding-right: 0;
    font-size: 20px;
  }
}

.headAnimate {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInTop;
  background-color: #444444;
  padding-left: 4vw;
}

.eChartContainer.relation {
  width: 75vw;
  height: 730px;
}

/* ChatWindow needed */
body {
  padding: 0px;
  margin: 0px;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}

.messageStyling {
  font-size: small;
}
</style>
