<template>
  <div class="write">
    <van-cell>
      <template slot="title">
        <div class="wrap">
          <div class="input">
            <van-field v-model="commentMsg" placeholder="写评论" left-icon="edit" />
          </div>
          <div class="btn">
            <van-button class="send">发送</van-button>
            <van-button icon="star-o"></van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentMsg: ""
    };
  }
};
</script>

<style lang="less">
.write {
  position: fixed;
  bottom: 0;
  left: 0;
}
.wrap {
  display: flex;

  .input {
    flex: 1;
    .van-field {
      background-color: #eee;
      border-radius: 20px;
    }
  }
  .btn {
    .van-button {
      border: none;
    }
    .send {
      height: 36px;
      line-height: 36px;
      color: #fff;
      background-color: #ca402c;
      margin-left: 30px;
    }
  }
}
</style>