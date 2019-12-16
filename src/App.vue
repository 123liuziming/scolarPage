<template>
  <div id="app">
    <Navigator />
    <router-view />
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
      :showEmoji="true"
      :showFile="true"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
    >
      <template v-slot:text-message-toolbox="scopedProps">
        <button
          v-if="!scopedProps.me && scopedProps.message.type==='text'"
          @click.prevent="like(scopedProps.message.id)"
        >👍</button>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
        <p
          v-if="scopedProps.message.data.meta"
          class="sc-message--meta"
          :style="{color: scopedProps.messageColors.color}"
        >{{scopedProps.message.data.meta}}</p>
        <p
          v-if="scopedProps.message.isEdited || scopedProps.message.liked"
          class="sc-message--edited"
        >
          <template v-if="scopedProps.message.isEdited">✎</template>
          <template v-if="scopedProps.message.liked">👍</template>
        </p>
      </template>
    </Launcher>
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

export default {
  name: "App",
  components: {
    Navigator,
    Launcher
  },
  data() {
    return {
      participants: [],
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
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
      timer: null,
    };
  },
  created() {
    this.setColor("dark");
  },
  async mounted() {
    if (!this.$store.getters.hasLoggedIn && !!localStorage.getItem("token")) {
      this.$store.dispatch(fetchUserInfo);
    }
    this.messageList.forEach(x => (x.liked = false));
    await this.getAllContacts();
    this.changeParticipant(this.contacts[0].id);
  },
    methods: {
    scrollDown(){
      this.$refs.launcher.handleScrollDown()
    },
    async getAllContacts() {
      try {
        const response = await gql_getAllContacts();
        this.contacts = response.data.recentContacts.map(e => ({
          ...e,
          imageUrl: e.avatar? e.avatar : "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
        }));
      } catch (err) {
        console.error(err);
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
        // console.log(response.data);
        this.messageList = response.data.messages.map(e => ({
          type: "text",
          author:
            e.senderId === this.$store.getters.userId
              ? "me"
              : this.participants[0].name,
          id: e.id,
          data: {
            text: e.content
          }
        }));
      } catch (err) {
        console.error(err);
      }
    },
    async handleSendMessage(message) {
      // message got format like this:
      // {
      //   author:...
      //   type:
      //   data:{
      //     text:'...'
      //   }
      // }
      try {
        await gql_sendMessage(this.participants[0].id, message.data.text);
        this.scrollDown()
      } catch (err) {
        console.error(err);
      }
    },
    async changeParticipant(userId) {
      if(this.participants.length && this.participants[0].id == userId)
        return
      this.participants = this.contacts.filter(x => x.id === userId);
      await this.getAllMessages();
      // update messages every 10s
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.getAllMessages();
      }, 10000);
      // console.log(userId);
      this.scrollDown();
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          id: Math.random(),
          data: { text }
        });
      }
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
      if(!this.$store.getters.userId){
        this.$notify({
          type: "info",
          title: "需要登录",
          message: `登录以后才可以使用站内信功能`,
          duration:4000,
        });
        return;
      }
      this.isChatOpen = true;
      this.newMessagesCount = 0;
      this.getAllContacts();
    },
    closeChat() {
      this.isChatOpen = false;
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
    linkColor() {
      return this.chosenColor === "dark"
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg;
    },
    backgroundColor() {
      return this.chosenColor === "dark" ? this.colors.messageList.bg : "#fff";
    },
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
.body.bodyScholar{
  margin-top: 300px;
}

.body.bodyArticle {
  margin-top: 100px;
}

.body.bodyPerson {
  margin-top: 100px;
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
  height: 590px;
}

<<<<<<< HEAD
@media (max-width: 1200px) {
  .eChartContainer.relation {
    margin-left: 45vw;
    width: 30vw;
  }
}
/* ChatWindow needed */
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
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
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
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
=======
>>>>>>> e7e5f632ed3942599d47f57ded3f6c703b6609d6
</style>
