<template>
  <div class="my_wrap">
    <van-nav-bar title="我的">
      <template slot="left">
          <div class="left">
        <van-icon name="arrow-left" /></div>
      </template>
    </van-nav-bar>
    <van-cell>
      <template slot="title">
        <div class="outer_wrap">
          <div class="img" @click="toPerson">
            <van-image width="70" height="70" :src="myProfile.photo" />
          </div>
          <van-cell :title="myProfile.name">
            <template slot="label">
              <div class="btn">
                <van-button type="primary" size="mini">申请认证</van-button>
              </div>
            </template>
          </van-cell>
          <div class="read">
            <div>
              <van-image width="20" height="20" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="today">
              <van-cell title="今日阅读" label="5分钟"></van-cell>
            </div>
          </div>
        </div>
      </template>
    </van-cell>
    <van-grid :column-num="3" clickable>
      <van-grid-item text="动态">
        <template slot="icon">
          {{myProfile.art_count}}
        </template>
      </van-grid-item>
      <van-grid-item text="关注">
        <template slot="icon">
          {{myProfile.follow_count}}
        </template>
      </van-grid-item>
      <van-grid-item text="粉丝">
        <template slot="icon">
          {{myProfile.fans_count}}
        </template>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="3" clickable>
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <van-cell-group>
      <van-cell title="用户反馈" is-link/>
      <van-cell title="小智同学" is-link to="/chat" />
      <van-cell title="系统设置" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import {getUserOwnProfile} from '@/api/user.js'
export default {
  data() {
    return {
      myProfile:{}
    }
  },
    methods: {
        toPerson(){
            this.$router.push('/person')
        }
    },
    async mounted(){
      let res = await getUserOwnProfile()
      console.log(res)
      this.myProfile = res.data.data
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
.left{

    .van-icon {
      color: #fff;
    }
}
.my_wrap {
  margin-top: 46px;
  .outer_wrap {
    display: flex;
    position: relative;
    .img {
      .van-image /deep/ img {
        border-radius: 50%;
      }
    }
    .read {
      position: absolute;
      right: -30px;
      top: 15px;
      display: flex;
      width: 110px;
      align-items: center;
      background-color: #ccc;
      border-radius: 40px 0 0 40px;
      padding-left: 10px;
      .today {
        margin-left: 10px;
        .van-cell {
          padding: 0;
          background-color: #ccc;
        }
      }
    }
  }
  .btn {
    .van-button {
      border-radius: 20px;
    }
  }
}
</style>