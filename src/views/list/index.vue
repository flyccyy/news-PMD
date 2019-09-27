<template>
  <div class="list_wrap">
    <van-nav-bar title="搜索列表">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-cell :title="item.aut_name" v-for="(item,index) in searchList" :key="index">
        <template slot="label">
          <span>{{item.title}}</span>
          <van-grid :column-num="3">
            <van-grid-item  text="评论" />
            <van-grid-item  text="点赞" />
            <van-grid-item  text="收藏" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {getList} from '@/api/article.js'
export default {
  data(){
    return{
      searchList:[]
    }
  },
  async mounted(){
    let res = await getList({
      page:1,
      per_page:10,
      q:this.$route.params.key
    })
    console.log(res)
    this.searchList = res.data.data.results;
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
.list_wrap{
  margin-top: 46px;
  .van-cell{
    border-bottom:10px solid #eee
  }
}
.van-icon {
  color: #fff;
}
</style>