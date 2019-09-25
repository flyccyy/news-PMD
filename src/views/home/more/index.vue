<template>
  <div>
    <van-dialog
      :value="value"
      :show-cancel-button="false"
      :show-confirm-button="false"
      @input="$emit('input',$event)"
      close-on-click-overlay
    >
      <van-cell-group>
        <van-cell title="隐藏此信息" icon="location-o" @click="hideMsg" />
        <van-cell title="举报" icon="location-o" is-link @click="reports" />
        <van-cell title="拉黑" icon="location-o" @click="userBlacklist" />
      </van-cell-group>
    </van-dialog>
    <van-dialog
      :value="subDialog"
      :show-cancel-button="false"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <van-cell-group>
        <van-cell>
          <template slot="icon">
            <van-icon name="arrow-left" @click="subDialog=false" />
          </template>
        </van-cell>
        <van-cell
          :title="item.name"
          icon="location-o"
          v-for="(item,index) in articleList"
          :key="index"
          @click="report(item)"
        ></van-cell>
        <!-- <van-cell title="标题夸张" icon="location-o"></van-cell>
        <van-cell title="低俗色情" icon="location-o"></van-cell>
        <van-cell title="错别字多" icon="location-o"></van-cell>
        <van-cell title="旧闻重复" icon="location-o"></van-cell>
        <van-cell title="广告软文" icon="location-o"></van-cell>
        <van-cell title="内容不实" icon="location-o"></van-cell>
        <van-cell title="涉嫌违法犯罪" icon="location-o"></van-cell>
        <van-cell title="侵权" icon="location-o"></van-cell>-->
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { dislikeArticle, userBlacklist, reportArticle } from "@/api/article.js";
export default {
  props: ["value", "art_id", "aut_id"],
  data() {
    return {
      articleList: [
        { value: 0, name: "其他问题" },
        { value: 1, name: "标题夸张" },
        { value: 2, name: "低俗色情" },
        { value: 3, name: "错别字多" },
        { value: 4, name: "旧闻重复" },
        { value: 5, name: "广告软文" },
        { value: 6, name: "内容不实" },
        { value: 7, name: "涉嫌违法犯罪" },
        { value: 8, name: "侵权" }
      ],
      subDialog: false
    };
  },
  methods: {
    //隐藏文章
    async hideMsg() {
      try {
        this.$emit("hideMsg", this.art_id);
        await dislikeArticle(this.art_id);
        this.$toast.success("取关成功");
      } catch (error) {
        this.$toast.fail("取关失败");
      } finally {
        this.$emit("input", false);
      }
    },
    //拉黑用户
    async userBlacklist() {
      try {
        await userBlacklist(this.aut_id);
        this.$toast.success("拉黑成功");
      } catch (error) {
        this.$toast.fail("拉黑失败");
      } finally {
        this.$emit("input", false);
      }
    },
    //显示举报类型
    reports() {
      this.subDialog = true;
    },
    //举报文章
    async report(item) {
      try {
        let res = await reportArticle({
          target: this.art_id,
          type: item.value
        });
        this.$toast.success(
          "您的举报信息我们已经收到，感谢您为网络净化作出的贡献"
        );
      } catch (error) {
        if (error.response.status == 409) {
          this.$toast.fail("当前文章已经被举报了");
        }
      } finally {
        this.subDialog = false;
        this.$emit("input", false);
      }
    }
  }
};
</script>

<style>
</style>