<template>
  <div>
      我是chat
      <ul >
          <li id="message"></li>
      </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import io from 'socket.io-client'

export default {
    created(){
        const socket  =io('http://ttapi.research.itcast.cn',{
            token:this.$store.state.user.token
        })
        socket.on('connect',function(){
            console.log('连接成功')
        })
        socket.emit('message',{
            msg:'我是aa',
            timestamp:Date.now()
        })
        socket.on('message',function(data){
        $('li').text(data.msg)
            console.log()
        })
    }
}
</script>

<style>

</style>