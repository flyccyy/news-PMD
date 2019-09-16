<template>
  <div class="login-wrap">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-validate="'required'"
        name="mobile"
        v-model="mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errors.first('mobile')"
      />

      <van-field
        v-validate="'required'"
        name="code"
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
        required
        :error-message="errors.first('code')"
      />
    </van-cell-group>
    <div class="login_btn">
      <van-button type="info" size="large" @click="login" :loading="loginLoading"  loading-text="登录中">登录</van-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user.js";
export default {
  name: "login",
  data() {
    return {
      mobile: "18888888888",
      code: "246810",
      loginLoading: false
    };
  },
  methods: {
    async login() {
      let valid = this.$validator.validate();
      if (valid) {
        try {
          this.loginLoading = true;
          let res = await userLogin({
            mobile: this.mobile,
            code: this.code
          });
          this.loginLoading = false;
          this.$store.commit("setUser", res.data.data);
          this.$router.push("/home");
        } catch (error) {
          this.$toast.fail("登录失败");
        }
      }
    }
  },
  //页面结构加载完的时候验证规则就生效
  mounted() {
    const dict = {
      custom: {
        mobile: {
          required: "手机号不能为空"
        },
        code: {
          required: "验证码不能为空"
        }
      }
    };
    this.$validator.localize("zh_CN", dict);
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3396fc;
  .van-nav-bar__title {
    color: #fff;
  }
}
.login-wrap /deep/ .login_btn {
  margin: 10px;
}
</style>