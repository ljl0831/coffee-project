<template>
  <div class="account">
    <van-nav-bar title="账号管理" left-text="返回" left-arrow @click-left="back" />

    <van-cell-group>
      <van-cell class="v-cell" title="头像">
        <div class="clearfix">
          <div class="fr user-img">
            <img class="auto-img" :src="User.userImg" alt />
            <van-uploader class="upload-box" :after-read="uploadFile" />
          </div>
        </div>
      </van-cell>
      <van-cell class="v-cell" title="用户id" :value="User.userId"></van-cell>
      <van-cell class="v-cell" title="手机号" :value="User.phone"></van-cell>
      <van-cell class="v-cell" title="昵称">
        <div class="clearfix">
          <div class="fr">
            <van-field @blur="updateUser({key: 'nickName', value: User.nickName, url: '/updateNickName'})" class="v-filed" v-model="User.nickName" input-align="right" />
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="clearfix">
          <div class="fl v-cell-text">个性签名</div>
          <div class="fl v-cell-textarea">
            <textarea @change="updateUser({key: 'desc', value: User.desc, url: '/updateDesc'})" class="textarea" v-model="User.desc"></textarea>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import "../assets/css/accounts.less";
export default {
  data() {
    return {
      User: {}
    };
  },

  created() {
    //获取用户信息
    this.getUser();
  },

  methods: {
    //获取用户信息
    getUser() {
      let tokenString = localStorage.getItem("__Tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();
          
          if (result.data.code == "B001") {
            this.User = result.data.result[0];
          }
        })
        .catch(() => {
          this.$toast.clear();
          
        });
    },

    //获取上传文件的base64
    uploadFile(file) {
      

      //获取图片base64
      let serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '');

      //获取图片类型
      let imgType = file.file.type.split('/')[1];

      let tokenString = localStorage.getItem("__Tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "POST",
        url: "/updateAvatar",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType,
          serverBase64Img,
        }
      })
        .then(result => {
          this.$toast.clear();
          

          if (result.data.code == 'H001') {
            this.User.userImg = result.data.userImg;
          } else {
            this.$toast(result.data.msg);
          }
         
        })
        .catch(() => {
          this.$toast.clear();
          
        });
    },

    //修改昵称, 简介
    updateUser(o) {
      let tokenString = localStorage.getItem("__Tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "POST",
        url: o.url,
        data: {
          appkey: this.appkey,
          tokenString,
          [o.key]: o.value
        }
      })
        .then(() => {
          this.$toast.clear();
          
        })
        .catch(() => {
          this.$toast.clear();
          
        });
    },

    back() {
      this.$router.go(-1);
    }
  }
};
</script>