<template>
  <div>
    <van-search
      v-model="key"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-cell-group>
      <van-cell icon="search" v-for="(item,index) in suggestList" :key="index" @click="onSearch(key)">
        <template slot="title">
          <div v-html="item"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template slot="default">
          <div>
            <span v-if="delShow" @click="delAll">全部删除</span>
            <span v-if="delShow" @click="finished">完成</span>
            <van-icon name="delete" @click="delSearch" v-if="!delShow" />
          </div>
        </template>
      </van-cell>
      <van-cell icon="search" :title="item" v-for="(item,index) in searchHistory" :key="index" @click="onSearch(item)">
        <template slot="default">
          <div>
            <van-icon name="close" v-if="delShow" @click="delOneItem(index)" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { suggestion } from "@/api/article.js";
export default {
  data() {
    return {
      key: "",
      suggestList: [],
      searchHistory: JSON.parse(window.localStorage.getItem("search")) || [],
      delShow:false,
      timer:null,
    };
  },
  methods: {
    //点击完成时触发
    onSearch(key) {
      this.searchHistory.unshift(key);
      this.searchHistory = [...new Set(this.searchHistory)];
      window.localStorage.setItem("search", JSON.stringify(this.searchHistory));
      this.$router.push("/list/" + key);
    },
    onCancel() {
      this.suggestList = [];
    },
    delSearch() {
        this.delShow = true;
    },
    //点击完成
    finished(){
        this.delShow = false;
    },
    //删除单条
    delOneItem(index){
        this.searchHistory.splice(index,1);
          window.localStorage.setItem("search", JSON.stringify(this.searchHistory));
    },
    //全部删除
    delAll(){
        this.searchHistory = []
        window.localStorage.removeItem('search');
    }
  },
  watch: {
     key(newVal,oldVal) {
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(async ()=>{
            if (newVal.trim() == "") {
              this.suggestList = [];
              return;
            } else {
              let res = await suggestion(newVal);
              this.suggestList = res.data.data.options;
              this.suggestList = this.suggestList.map((item,index)=>{
                 return  item.split(newVal).join('<span style="color:#f00">'+newVal+'</span>')
              })
            }
        },500)
    }
  }
};
</script>

<style lang="less">
.van-field {
  background: #eee;
}
.search_wrap {
  display: flex;
}
</style>