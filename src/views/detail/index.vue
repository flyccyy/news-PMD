<template>
  <div class="detail_wrap">
    <van-nav-bar title="文章详情">
      <template slot="left">
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-cell>
      <template slot="title">
        <div class="title">{{detailObj.title}}</div>
      </template>
    </van-cell>
    <author :detailMsg="detailObj"></author>

    <van-cell>
      <template slot="title">
        <div v-html="detailObj.content"></div>
      </template>
    </van-cell>

    <like :detailMsg="detailObj"></like>
    <van-list
      v-model="commentLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getComment"
    >
      <div v-for="(item,index) in commentList" :key="index">
        <comment :item="item" :isShowReply="false"></comment>
      </div>
    </van-list>
    <write :art_id="art_id" @writeMsg="writeMsg" :isCollect="true"></write>

    <!-- 评论的回复的弹出层 -->
    <van-popup v-model="reply" position="bottom" :style="{ height: '60%' }">
      <van-cell>
        <h3>当前评论</h3>
      </van-cell>
      <comment :item="replyItem" :isShowReply="true"></comment>
      <van-cell>
        <template slot="title">
          <h3>当前评论的回复</h3>
          <van-list
            v-model="replyCommentLoading"
            :finished="replyFinished"
            finished-text="没有更多了"
            @load="replyComment"
          >
            <div v-for="(item,index) in replyCommentList" :key="index">
              <comment :item="item" :isShowReply="true"></comment>
            </div>
          </van-list>
        </template>
      </van-cell>
      <write :isCollect="false" :commentId="commentId" :art_id="art_id" @writeMsg="replyList"></write>
    </van-popup>
  </div>
</template>

<script>
import author from "@/views/detail/components/author";
import like from "@/views/detail/components/like";
import comment from "@/views/detail/components/comment";
import write from "@/views/detail/components/write";
import { getArticleDetail } from "@/api/article.js";
import { getComment } from "@/api/comment.js";
import eventbus from "@/utils/eventbus.js";
export default {
  components: {
    author,
    like,
    comment,
    write
  },
  data() {
    return {
      finished: false,
      detailObj: {},
      commentList: [],
      art_id: this.$route.params.art_id,
      offset: 0,
      end_id: -1,
      commentLoading: false,
      finished: false,
      reply: false,
      replyCommentLoading: false,
      replyFinished: false,
      replyItem: {},
      commentId: 0,
      isCollect: false,
      replyCommentList: [],
      replyOffset: 0,
      reply_endId: -1
    };
  },
  methods: {
    //获取对文章的评论（需要判断是否是第一次请求）
    async getComment() {
      if (this.offset === this.end_id) {
        this.commentLoading = false;
        this.finished = true;
        return;
      }
      if (this.offset === 0) {
        let res = await getComment({
          type: "a",
          source: this.art_id,
          limit: 10
        });
        this.commentList = res.data.data.results;
        this.offset = res.data.data.last_id;
        this.end_id = res.data.data.end_id;
        this.commentLoading = false;
      } else {
        //请求第一页之后的数据
        let res = await getComment({
          type: "a",
          source: this.art_id,
          offset: this.offset,
          limit: 10
        });
        this.commentList = [...this.commentList, ...res.data.data.results];
        this.offset = res.data.data.last_id;
        this.end_id = res.data.data.end_id;
        this.commentLoading = false;
      }
    },
    writeMsg(value) {
      this.commentList.unshift({
        ...value.new_obj
      });
    },
    replyList(value) {
      this.replyCommentList.unshift({
        ...value.new_obj
      });
    },
    //获取评论的回复
    async replyComment() {
      if (this.reply_endId === this.replyOffset) {
        this.replyCommentLoading = false;
        this.replyFinished = true;
        return;
      }
      if (this.replyOffset === 0) {
        let res = await getComment({
          type: "c",
          source: this.commentId,
          limit: 10
        });
        this.replyCommentList = res.data.data.results;
        this.replyOffset = res.data.data.last_id;
        this.reply_endId = res.data.data.end_id;
        this.replyCommentLoading = false;
      } else {
        let res = await getComment({
          type: "c",
          source: this.commentId,
          offset: this.replyOffset,
          limit: 10
        });
        this.replyCommentList = [
          ...this.replyCommentList,
          ...res.data.data.results
        ];
        this.replyOffset = res.data.data.last_id;
        this.reply_endId = res.data.data.end_id;
        this.replyCommentLoading = false;
      }
    },

    //获取文章详情
    async getArticleDetail() {
      let res = await getArticleDetail(this.art_id);
      this.detailObj = res.data.data;
    }
  },
  mounted() {
    this.getArticleDetail();
    eventbus.$on("replyObj", value => {
      this.reply = value.reply;
      this.replyItem = value;
      this.commentId = value.com_id;
      console.log(value);
    });
  }
};
</script>

<style lang="less" scoped>
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
.van-icon {
  color: #fff;
}
.detail_wrap {
  margin-top: 46px;
  margin-bottom: 50px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>