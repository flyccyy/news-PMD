<template>
  <div class="chat_wrap">
    <van-nav-bar title="小智同学">
      <template slot="left">
        <div class="left">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
      </template>
    </van-nav-bar>
    <div id="main">
      <div id="leftmsg">
        <div class="messageAvatar">
          <img src="./xiaozhi.jpg" alt="..." width="44" height="44" />
        </div>
        <div class="messageBox">
          <div class="messageContent">{{replyMsg}}</div>
          <div class="messageTriangle"></div>
        </div>
      </div>
      <div class="rightmsg" v-if="isDisplay">
        <div class="messageBox">
          <div class="messageContent">{{sendmsg}}</div>
          <div class="messageTriangle"></div>
        </div>
        <div class="messageAvatar">
          <img src="./empty_avatar_user.png" alt="..." width="44" height="44" />
        </div>
      </div>
      <div id="leftmsg" v-if="replyDisplay">
        <div class="messageAvatar">
          <img src="./xiaozhi.jpg" alt="..." width="44" height="44" />
        </div>
        <div class="messageBox">
          <div class="messageContent">{{replyMsg1}}</div>
          <div class="messageTriangle"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <input type="text" placeholder="说点什么吧" class="input_txt" v-model="msg" />
      <input type="button" value="发送" class="input_sub" @click="sendChat" />
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
import bus from "@/utils/bus.js";
import $ from "jquery";
import io from "socket.io-client";

export default {
  data() {
    return {
      isDisplay: false,
      sendmsg: "",
      msg: "",
      replyMsg: "hello, 有什么需要帮助的么？",
      user: 0,
      replyMsg1: "",
      replyDisplay: false
    };
  },
  methods: {
    sendChat() {
      //连接到服务端
      const socket = io("http://ttapi.research.itcast.cn", {
        token: this.$store.state.user.token
        // "perception":{
        //   "inputText":{
        //     "text":"你好"
        //   },
        //   "userInfo":{
        //     "apiKey":"902dbf73278f4233ae8d105ec7ad12ec",
        //     "userId":this.user
        //   }
        // }
      });
      //客户端接收到连接成功的提示
      socket.on("connect", function() {
        console.log("连接成功");
      });
      //客户端发送请求
      socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });
      this.isDisplay = true;
      this.sendmsg = this.msg;
      setTimeout(() => {
        this.replyDisplay = true;
        this.replyMsg1 =
          "您的反馈已收到，我们会认真解决。如果有其他需要，欢迎随时联系我们。";
      }, 1000);
      //客户端接收到接口返回的数据
      socket.on("message", function(data) {
        console.log(data);
      });
    }
  },
  mounted() {
    bus.$on("send", data => {
      this.user = data.id;
    });
  }
};
</script>

<style lang="less" >
.chat_wrap {
  margin-top: 46px;
}
.van-nav-bar {
  background-color: #3396fc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .van-nav-bar__title {
    color: #fff;
  }
}
.left {
  .van-icon {
    color: #fff;
  }
}
#main {
  z-index: 1;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 55px;
  background-color: #f4f3f3;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  .rightmsg,
  #leftmsg {
    display: flex;
    width: 85%;
    overflow: hidden;
    margin: 1rem 0.5rem 0 0.5rem;
    align-items: flex-start;
    float: right;
    justify-content: flex-end;
    .messageBox {
      background-color: #e0e3da;
      padding: 0.5rem;
      position: relative;
      border-radius: 4px;
      word-break: break-all;
      margin-top: 5px;
    }
    .messageAvatar {
      margin-left: 16px;
      img {
        border-radius: 50%;
      }
    }
  }
  #leftmsg {
    float: left;
    justify-content: flex-start;
    .messageAvatar {
      margin-left: 0;
      margin-right: 16px;
    }
  }
}
.footer {
  width: 100%;
  height: 55px;
  left: 0px;
  bottom: 0px;
  background-color: #fff;
  position: absolute;
  .input_txt {
    float: left;
    width: 270px;
    height: 37px;
    border: 0px;
    background-color: #f4f3f3;
    margin: 9px 0 0 20px;
    border-radius: 8px;
    padding: 0px;
    outline: none;
    text-indent: 15px;
  }
  .input_sub {
    float: left;
    width: 70px;
    height: 37px;
    border: 0px;
    background-color: #fe9697;
    margin: 9px 0 0 15px;
    border-radius: 8px;
    padding: 0px;
    outline: none;
    color: #fff;
    cursor: pointer;
  }
}
</style>