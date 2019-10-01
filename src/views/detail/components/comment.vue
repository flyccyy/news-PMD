<template>
  <div class="comment">
      <van-cell >
        <template slot="title">
          <div class="desc">
            <div class="img">
              <van-image :src="item.aut_photo" width="50" height="50" />
            </div>
            <div class="account">
              <van-cell :title="item.aut_name" label></van-cell>
            </div>
            <div class="btn">
              <van-icon name="good-job-o" />
              {{item.like_count}}
            </div>
          </div>
          <div class="content">
            <div>{{item.content}}</div>
            <div>
              {{item.pubdate | commentFormat}}
              <span @click="replyHandler" v-if="!isShowReply">回复({{item.reply_count}})</span>
            </div>
          </div>
        </template>
      </van-cell>
  </div>
</template>

<script>
import eventbus from '@/utils/eventbus'
export default {
  props: ["item",'isShowReply'],
  data() {
    return {
   

    }
  },
  methods:{
    // replyComment(){
    //   this.$emit('replyComment',true)
    // }
    replyHandler(){
      eventbus.$emit('replyObj',{
        reply:true,
        ...this.item
      })
      // this.$emit('replyObj',this.item)
    }
  }
};
</script>

<style lang="less" scoped>
.desc {
  display: flex;
  align-items: center;

  .account {
    flex: 1;
  }
}
.comment .img /deep/ .van-image__img {
  border-radius: 50%;
}
.content {
  margin-left: 66px;
  margin-top: -10px;
}
</style>