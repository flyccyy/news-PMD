<template>
  <div class="chat_wrap">
    <van-nav-bar title="小智同学">
      <template slot="left">
        <div class="left">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
      </template>
    </van-nav-bar>
    <div class="main">
      <ul class="talk_list">
        <li class="rightmsg">
          <span>{{msg}}</span>
        </li>
        <li class="leftmsg">
          <span>你好</span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <input type="text" placeholder="说点什么吧" class="input_txt" v-model="msg" />
      <input type="button" value="发送" class="input_sub" @click="sendChat" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import io from "socket.io-client";
export default {
  data() {
    return {
      msg: "你好",
      replyMsg: ""
    };
  },
  methods: {
    sendChat() {
      const socket = io("http://ttapi.research.itcast.cn", {
        token: this.$store.state.user.token
      });
      socket.on("connect", function() {
        console.log("连接成功");
      });
      socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });
      socket.on("message", function(data) {
        $(".leftmsg span").text(data.msg);
        console.log(data);
      });
    }
  },
  created() {
    //   this.msg = ''
    // const socket = io("http://ttapi.research.itcast.cn", {
    //   token: this.$store.state.user.token
    // });
    // socket.on("connect", function() {
    //   console.log("连接成功");
    // });
    // socket.emit("message", {
    //   msg: this.msg,
    //   timestamp: Date.now()
    // });
    // socket.on("message", function(data) {
    //   //   $("li").text(data.msg);
    //   console.log();
    // });
  }
};
</script>

<style lang="less">
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
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 55px;
  background-color: #f4f3f3;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  .talk_list {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    li {
      overflow: hidden;
      margin: 20px 0px 30px;
    }
    .leftmsg span {
      float: left;
      background-color: #fe9697;
      padding: 10px 15px;
      max-width: 290px;
      border-radius: 12px;
      font-size: 16px;
      color: #fff;
      margin-left: 13px;
      position: relative;
      line-height: 24px;
    }
    .rightmsg span {
      float: right;
      background-color: #fff;
      padding: 10px 15px;
      max-width: 290px;
      border-radius: 12px;
      font-size: 16px;
      color: #000;
      margin-right: 13px;
      position: relative;
      line-height: 24px;
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