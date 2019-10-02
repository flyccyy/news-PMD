<template>
  <div class="write">
    <van-cell>
      <template slot="title">
        <div class="wrap">
          <div class="input">
            <van-field v-model="commentMsg" placeholder="写评论" left-icon="edit" />
          </div>
          <div class="btn">
            <van-button class="send" @click="sendComment">发送</van-button>
            <van-button icon="star-o" v-if="isCollect"></van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { addComment } from "@/api/comment.js";
export default {
  props: ["art_id", "isCollect", "commentId"],
  data() {
    return {
      commentMsg: "",
      writeObj: {}
    };
  },
  methods: {
    //点击发送按钮：如果isCollect是true，代表添加的是文章的评论，是false代表添加的是评论的回复
    async sendComment() {
      if (this.isCollect) {
        let res = await addComment({
          id: this.art_id,
          content: this.commentMsg
        });
        this.writeObj = res.data.data;
        this.$emit("writeMsg", res.data.data);
        this.commentMsg = "";
      } else {
        let res = await addComment({
          id: this.commentId,
          content: this.commentMsg,
          art_id: this.art_id
        });
        this.commentMsg = "";
        this.$emit("writeMsg", res.data.data);
      }
    }
  }
};
</script>

<style lang="less">
.write {
  position: fixed;
  bottom: 0;
  left: 0;
}
.wrap {
  display: flex;

  .input {
    flex: 1;
    .van-field {
      background-color: #eee;
      border-radius: 20px;
    }
  }
  .btn {
    .van-button {
      border: none;
    }
    .send {
      height: 36px;
      line-height: 36px;
      color: #fff;
      background-color: #ca402c;
      margin-left: 30px;
    }
  }
}
</style>