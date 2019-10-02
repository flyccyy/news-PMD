<template>
  <div>
    <van-cell>
      <div class="desc">
        <div class="img">
          <van-image :src="detailMsg.aut_photo" width="50" height="50" />
        </div>
        <div class="account">
          <van-cell :title="detailMsg.aut_name" label>
            <template slot="label">
              <div>{{detailMsg.pubdate|dateFormat}}</div>
            </template>
          </van-cell>
        </div>
        <div>
          <van-button
            type="danger"
            size="small"
            @click="follow(detailMsg.aut_id)"
            v-if="detailMsg.is_followed===false"
          >关注</van-button>
          <van-button
            type="default"
            size="small"
            v-else
            @click="cancelFollow(detailMsg.aut_id)"
          >取消关注</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { followUser, cancelFollowUser } from "@/api/user.js";
export default {
  props: ["detailMsg"],
  data() {
    return {};
  },
  methods: {
    async follow(aut_id) {
      try {
        await followUser(aut_id);
        this.$toast.success("关注成功");
        this.detailMsg.is_followed = true;
      } catch (error) {
        this.$toast.fail("关注失败");
      }
    },
    async cancelFollow(aut_id) {
      try {
        await cancelFollowUser(aut_id);
        this.$toast.success("取关成功");
        this.detailMsg.is_followed = false;
      } catch (error) {
        this.$toast.fail("取关失败");
      }
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
.detail_wrap .img /deep/ .van-image__img {
  border-radius: 50%;
}
</style>