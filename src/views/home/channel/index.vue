<template>
  <div>
    <van-popup
      :value="value"
      position="bottom"
      :style="{ height: '90%' }"
      @input="$emit('input',$event)"
    >
      <div class="popup_wrap">
        <div class="title">
          我的频道
          <span class="channel">点击进入频道</span>
          <van-button type="default" v-if="!clearBtnShow" @click="clearBtnShow=true">编辑</van-button>
          <van-button type="default" v-else @click="finished">完成</van-button>
        </div>
        <van-grid clickable>
          <van-grid-item v-for="(item,index) in channelList" :key="item.id">
            <div
              slot="text"
              class="text"
              :class="{active:active===index?true:false}"
              @click="$emit('changeActive',index)"
            >{{item.name}}</div>
            <template slot="icon">
              <div class="closeBtn" v-show="clearBtnShow">
                <van-icon name="clear" @click="delChannel(index)" />
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="popup_wrap">
        <div class="title">
          频道推荐
          <span class="channel">点击进入频道</span>
        </div>
        <van-grid>
          <van-grid-item
            :text="item.name"
            v-for="(item,index) in otherChannelList"
            :key="index"
            @click="addToMychannel(item)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels, editChannels } from "@/api/channel.js";
export default {
  props: ["value", "channelList", "active"],
  data() {
    return {
      clearBtnShow: false,
      allChannelList: []
    };
  },
  methods: {
    async getAllChannels() {
      let res = await getAllChannels();
      this.allChannelList = res.data.data.channels;
    },
    async addToMychannel(item) {
      this.channelList.push(item);
      // this.saveChannel();
      let user = this.$store.state.user;
      if (!user || !user.token) {
        window.localStorage.setItem(
          "channel",
          JSON.stringify(this.channelList)
        );
      } else {
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          };
        });
        let res = await editChannels(channels);
        console.log(res);
      }
    },
    // async saveChannel() {
    //   if (this.$store.state.user) {
    //     let channels = this.channelList.slice(1).map((item, index) => {
    //       return {
    //         id: item.id,
    //         seq: index + 2
    //       };
    //     });
    //     let res = await editChannels(channels);
    //     console.log(res);
    //   } else {
    //     window.localStorage.setItem(
    //       "channel",
    //       JSON.stringify(this.channelList)
    //     );
    //   }
    // },
    finished() {
      this.clearBtnShow = false;
    },
    delChannel(index) {
      this.channelList.splice(index, 1);
      this.saveChannel();
    }
  },
  mounted() {
    this.getAllChannels();
  },
  computed: {
    otherChannelList() {
      let newArr = this.channelList.map(item => {
        return item.id;
      });
      let otherChannelList = this.allChannelList.filter(item => {
        return !newArr.includes(item.id);
      });
      otherChannelList.forEach(item => {
        this.$set(item, "pre_timestamp", 0);
        this.$set(item, "uploading", false);
        this.$set(item, "downloading", false);
        this.$set(item, "finished", false);
        this.$set(item, "article", []);
      });
      return otherChannelList;
    }
  }
};
</script>

<style lang="less">
.popup_wrap {
  padding: 10px 10px 0;
  margin-bottom: 20px;
  .title {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .channel {
      font-size: 12px;
      color: #ccc;
      flex: 1;
      margin-left: 5px;
    }
    .van-button {
      border: 1px solid #f00;
      color: #f00;
      border-radius: 18px;
      height: 24px;
      line-height: 24px;
    }
  }
  .van-grid-item {
    position: relative;
    .text {
      font-size: 12px;
      color: #333;
    }
    .text.active {
      color: #f00;
    }
    .closeBtn {
      position: absolute;
      top: -5px;
      right: 0px;
      .van-icon {
        font-size: 14px;
        color: #ccc;
      }
    }
  }
}
</style>