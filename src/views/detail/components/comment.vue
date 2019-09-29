<template>
  <div class="comment">
    <van-cell>
      <template slot="title">
        <div class="desc">
          <div class="img">
            <van-image
              src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi"
              width="50"
              height="50"
            />
          </div>
          <div class="account">
            <van-cell title="11821215" label></van-cell>
          </div>
          <div class="btn">
             <van-icon name="good-job-o" /> 0
          </div>
        </div>
        <div class="content">
          <div>你好</div>
          <div>09-22 <span>回复(0)</span></div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
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
.content{
    margin-left: 66px;
    margin-top: -10px;
}
</style>