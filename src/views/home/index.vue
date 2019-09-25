<template>
  <div class="home-wrap">
    <van-nav-bar title="首页" />
    <van-tabs v-model="active" class="tabs_wrap">
      <van-tab v-for="item in channelList" :title="item.name" :key="item.id">
        <van-pull-refresh v-model="item.downloading" @refresh="onRefresh">
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(subitem,index) in item.article" :key="index" :title="subitem.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div slot="nav-right" class="navIcon">
        <van-icon name="wap-nav" @click="showChannel" />
      </div>
    </van-tabs>
    <channel
      v-model="channelShow"
      :channelList="channelList"
      :active="active"
      @changeActive="active=$event"
    ></channel>
  </div>
</template>

<script>
import { getChannels } from "@/api/channel.js";
import { getArticles } from "@/api/article.js";
import channel from "@/views/home/channel";
export default {
  name: "home",
  components: {
    channel
  },
  data() {
    return {
      active: 0,
      channelList: [],
      article: [],
      channelShow: false
    };
  },
  methods: {
    //一打开页面跟触底会触发这个方法
    async onLoad() {
      let channel = this.channelList[this.active];
      //第一次请求，意思是刚打开页面
      if (channel.pre_timestamp === 0) {
        let res = await getArticles({
          channel_id: channel.id,
          timestamp: Date.now(),
          with_top: 1
        });
        channel.pre_timestamp = res.data.data.pre_timestamp;
        channel.article = res.data.data.results;
        this.channelList = [...this.channelList];
        channel.uploading = false;
        channel.downloading = false;
      } else {
        //第二次进入：就是触底的时候
        let res = await getArticles({
          channel_id: channel.id,
          timestamp: channel.pre_timestamp,
          with_top: 1
        });
        channel.article = [...channel.article, ...res.data.data.results];
        channel.pre_timestamp = res.data.data.pre_timestamp;
        this.channelList = [...this.channelList];
        channel.uploading = false;
        channel.downloading = false;
      }
    },
    async onRefresh() {
      //下拉：以当前时间发请求
      let channel = this.channelList[this.active];
      //更新当前频道的数据，意思是下拉的时候把页面原来的数据清空，再以当前时间重新发请求
      channel.pre_timestamp = 0;
      channel.uploading = false;
      channel.finished = false;
      channel.article = [];
      let res = await getArticles({
        channel_id: channel.id,
        timestamp: Date.now(),
        with_top: 1
      });
      channel.pre_timestamp = res.data.data.pre_timestamp;
      channel.article = res.data.data.results;
      this.channelList = [...this.channelList];
      channel.downloading = false;
    },
    //获取完频道数据后给里面的数据添加属性
    setChannelItem() {
      this.channelList.forEach(item => {
        this.$set(item, "pre_timestamp", 0);
        this.$set(item, "uploading", false);
        this.$set(item, "downloading", false);
        this.$set(item, "finished", false);
        this.$set(item, "article", []);
      });
    },
    showChannel() {
      this.channelShow = true;
    },
    async getChannels() {
      if (this.$store.state.user) {
        let res = await getChannels();
        this.channelList = res.data.data.channels;
      } else {
        let localChannel = window.localStorage.getItem("channel");
        if (localChannel) {
          this.channelList = JSON.parse(localChannel);
        } else {
          let res = await getChannels();
          this.channelList = res.data.data.channels;
          console.log(this.channelList);
        }
      }
      this.setChannelItem();
    }
  },
  mounted() {
    this.getChannels();
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
.home-wrap {
  padding-top: 90px;
  padding-bottom: 50px;
  .navIcon {
    position: fixed;
    right: 10px;
    top: 58px;
  }
}
.home-wrap /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  width: 90%;
  z-index: 999;
}
</style>