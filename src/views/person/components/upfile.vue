<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false"
      close-on-click-overlay
    >
      <van-cell-group>
        <van-cell title="从相册中选择" is-link @click="showFile">
          <template slot="label">
            <div>
              <input type="file" id="file" ref="iconfile" />
            </div>
          </template>
        </van-cell>
        <van-cell title="拍照" is-link />
        <van-cell title="取消" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { setUserIcon } from "@/api/user.js";
export default {
  props: ["value"],
  data() {
    return {};
  },
  methods: {
    showFile() {
      this.$refs["iconfile"].click();
      this.$refs["iconfile"].onchange = () => {
        let myfile = this.$refs["iconfile"].files[0];
        let reader = new FileReader();
        reader.addEventListener("load", res => {
          ImagePreview({
            images: [res.target.result],
            onClose: () => {
              this.$dialog
                .confirm({
                  title: "注意",
                  message: "是否将当前图片保存为头像"
                })
               
                .then(async () => {
                  let res = await setUserIcon(this.$refs["iconfile"].files[0]);
                  this.$emit('changeImg',res.data.data)
                  this.$emit('input',false)
                })
                .catch(() => {
                  this.$emit('input',false)
                });
            }
          });
        });
        //需要加上这句才能预览
        reader.readAsDataURL(myfile);
      };
    }
  }
};
</script>

<style>
#file {
  width: 100%;
  display: none;
}
</style>