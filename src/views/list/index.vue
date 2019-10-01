<template>
  <div class="list_wrap">
    <van-nav-bar title="搜索列表">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group>
        <van-cell :title="item.aut_name" v-for="(item,index) in searchList" :key="index">
          <template slot="label">
            <span @click="toDetail(item)">{{item.title}}</span>
            <van-grid :column-num="3">
              <van-grid-item text="评论" @click="toWriteComment" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getList } from "@/api/article.js";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      searchList: [],
      page: 0
    };
  },
  methods: {
    async onLoad() {
      this.page++;
      let res = await getList({
        page: this.page,
        per_page: 10,
        q: this.$route.params.key
      });
      this.searchList = [...this.searchList, ...res.data.data.results];
      if (this.searchList.length === res.data.data.total_count) {
        this.finished = true;
      }
      this.loading = false;
    },
    toDetail(item) {
      this.$router.push("/detail/" + item.art_id);
    },
    toWriteComment() {
      this.$login();
    }
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
.list_wrap {
  margin-top: 46px;
  .van-cell {
    border-bottom: 10px solid #eee;
  }
}
.van-icon {
  color: #fff;
}
</style>