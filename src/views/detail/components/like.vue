<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="btn">
          <!-- 点赞之后是实心default，没点赞是空心红色
          点了不喜欢之后是实心白色，没点是空心红色-->
          <van-button
            type="default"
            icon="star"
            @click="disliking"
            v-if="detailMsg.attitude===1"
          >取消点赞</van-button>
          <van-button type="danger" icon="star-o" @click="likeArticle" v-else>点赞</van-button>
          <van-button
            type="default"
            icon="like"
            v-if="detailMsg.attitude===0"
            @click="cancelDislikeArticle"
          >取消不喜欢</van-button>
          <van-button type="danger" icon="like-o" v-else @click="dislikeArticle">不喜欢</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {
  disliking,
  likeArticle,
  cancelDislikeArticle,
  dislikeArticle
} from "@/api/article";
export default {
  props: ["detailMsg"],
  data() {
    return {};
  },
  methods: {
    //点赞文章
    async likeArticle() {
      try {
        await likeArticle(this.detailMsg.art_id);
        this.detailMsg.attitude = 1;
        this.$toast.success("点赞成功");
      } catch (error) {
        this.$toast.fail("点赞失败");
      }
    },
    //对文章取消点赞
    async disliking() {
      try {
        await disliking(this.detailMsg.art_id);
        this.detailMsg.attitude = -1;
        this.$toast.success("取消点赞成功");
      } catch (error) {
        this.$toast.fail("取消点赞失败");
      } 
    },
    //不喜欢文章
    async dislikeArticle() {
      try {
        await dislikeArticle(this.detailMsg.art_id);
        this.detailMsg.attitude = 0;
        this.$toast.success("对文章不喜欢成功");
      } catch (error) {
        this.$toast.fail("对文章不喜欢失败");
      } 
    },
    //取消对文章不喜欢
    async cancelDislikeArticle() {
      try {
        await cancelDislikeArticle(this.detailMsg.art_id);
        this.detailMsg.attitude = -1;
        this.$toast.success("取消对文章不喜欢成功");
      } catch (error) {
        this.$toast.fail("取消对文章不喜欢失败");
      } 
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  text-align: center;
  .van-button {
    margin: 0 20px;
    border-radius: 5px;
  }
}
</style>