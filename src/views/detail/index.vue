<template>
  <div class="detail_wrap">
    <van-nav-bar title="文章详情">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <van-cell>
      <template slot="title">
        <div class="title">{{detailObj.title}}</div>
      </template>
    </van-cell>
  <author :detailMsg="detailObj"></author>
    <van-list
  v-model="detailLoading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell>
  <template slot="title">
    <div v-html="detailObj.content"></div>
  </template>
  </van-cell>
</van-list>
<like></like>
<comment></comment>
<write></write>
  </div>
</template>

<script>
import author from '@/views/detail/components/author'
import like from '@/views/detail/components/like'
import comment from '@/views/detail/components/comment'
import write from '@/views/detail/components/write'
import {getArticleDetail} from '@/api/article.js'
export default {
    components:{
        author,
        like,
        comment,
        write
    },
    data() {
        return {
            detailLoading:false,
            finished:false,
            detailObj:{}
        }
    },
    methods: {
        onLoad(){

        },
        async getArticleDetail(){
          let res = await getArticleDetail(this.$route.params.art_id)
          console.log(res)
          this.detailObj=res.data.data;
        }
    },
    mounted(){
      this.getArticleDetail();
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
  .title{
    font-size: 20px;
    font-weight: 700;
  }
}

</style>