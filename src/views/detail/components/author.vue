<template>
  <div>
    <van-cell>
      <div class="desc">
        <div class="img">
          <van-image
            :src="detailMsg.aut_photo"
            width="50"
            height="50"
          />
        </div>
        <div class="account">
          <van-cell :title="detailMsg.aut_name" label>
            <template slot="label">
              <div>{{detailMsg.pubdate|dateFormat}}</div>
            </template>
          </van-cell>
        </div>
        <div>
          <van-button type="danger" size="small">关注</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props:['detailMsg']
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