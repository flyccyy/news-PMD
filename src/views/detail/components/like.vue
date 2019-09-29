<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="btn">
          <!-- 点赞之后是实心defautl，没点赞是空心红色
          点了不喜欢之后是实心白色，没点是空心红色-->
          
            <van-button type="danger" icon="star-o">点赞</van-button>
        
         
            <van-button type="danger" icon="like-o">取消不喜欢</van-button>
         
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

.btn{
    text-align: center;
    .van-button{
        margin:0 20px;
        border-radius:5px;
    }
    
}
</style>