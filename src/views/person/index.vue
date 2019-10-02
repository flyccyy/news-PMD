<template>
  <div>
    <van-cell class="person_wrap">
      <van-nav-bar title="个人信息" @click-left="$router.back()">
        <template slot="left">
          <div class="left">
            <van-icon name="arrow-left" />
          </div>
        </template>
        <template slot="right">
          <div class="save" @click="saveProfile">保存</div>
        </template>
      </van-nav-bar>
      <van-cell-group>
        <van-cell title="头像" is-link @click="showUpfile">
          <template slot="default">
            <div>
              <van-image width="30" height="30" :src="userObj.photo" />
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称" :value="userObj.name" is-link @click="setNickname" />
        <van-cell title="介绍" is-link>
          <!-- <template slot="label">
            {{userObj.intro}}
          </template>-->
        </van-cell>
        <van-cell title="性别" :value="userObj.gender===0?'男':'女'" is-link />
        <van-cell title="生日" :value="userObj.birthday" is-link />
      </van-cell-group>

      <!-- 弹出层：设置昵称 -->
      <van-popup v-model="nicknameShow" position="bottom" :style="{ height: '20%' }">
        <van-cell>
          <template slot="title">
            <div class="setMsg">
              <h3>设置用户昵称</h3>
              <van-field v-model="userObj.name" />
            </div>
          </template>
        </van-cell>
      </van-popup>
    </van-cell>

    <!-- 弹出框：上传头像 -->
    <upfile v-model="isShowUpfile" @changeImg="changeImg"></upfile>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile } from "@/api/user.js";
import upfile from "@/views/person/components/upfile.vue";
export default {
  components: {
    upfile
  },
  data() {
    return {
      userObj: {},
      nicknameShow: false,
      isShowUpfile: false
    };
  },
  methods: {
    //获取用户的个人信息
    async getUserProfile() {
      let res = await getUserProfile();
      this.userObj = res.data.data;
    },
    //显示修改昵称的弹出层
    setNickname() {
      this.nicknameShow = true;
    },
    //显示修改头像的弹出框
    showUpfile() {
      this.isShowUpfile = true;
    },
    changeImg(obj) {
      this.userObj.photo = obj.photo;
    },
    async saveProfile() {
      //编辑用户个人信息
      await setUserProfile({
        name: this.userObj.name,
        gender: this.userObj.gender,
        birthday: this.userObj.birthday
      });
    }
  },
  mounted() {
    this.getUserProfile();
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
  color: #fff;
  .van-nav-bar__title {
    color: #fff;
  }
}
.left {
  .van-icon {
    color: #fff;
  }
}
.person_wrap {
  margin-top: 46px;
  .setMsg {
    .van-field {
      border: 1px solid #ccc;
    }
  }
  .save {
    color: #fff;
  }
}
</style>