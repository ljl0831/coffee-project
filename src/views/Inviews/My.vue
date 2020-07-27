<template>
  <div class="my">
    <div class="box" :style="{backgroundImage:'url('+ myUser.userBg+')'}">
      <div class="bg clearfix">
        <div class="fr com" v-if="flag">
          <div class="fr">更换背景</div>
          <van-uploader class="fr loader" :max-size="maxSize" :after-read="uploadFile" />
        </div>
        <div class="goto" v-else @click="goPage('Login')">您还未登录呢,点我去登录</div>
        <div class="bottom-box">
          <div class="img fl">
            <img class="auto-img" :src="myUser.userImg" alt />
          </div>
         
          <div class="my-name">{{myUser.nickName}}</div>
          <div class="my-use">{{myUser.desc=='' ? '这个人很懒,啥也不写': myUser.desc}}</div>
        </div>
      </div>
    </div>
     
    <van-cell-group>
      <van-cell
        @click="goPage(item.routeName)"
        :title="item.title"
        is-link
        v-for="(item,index) in myData"
        :key="index"
      />
    </van-cell-group>
  </div>
</template>


<script>
import "../../assets/css/my.less";
export default {
  data() {
    return {
      //上传文件1MB
      maxSize: 1 * 1024 * 1024,

      myData: [
        { title: "帐号管理", routeName: "Accounts" },
        { title: "地址管理", routeName: "MyAddress" },
        { title: "我的收藏", routeName: "Like" },
        { title: "安全中心", routeName: "Secure" }
      ],
      tabName: 0,

      myUser: {},
      flag: false
    };
  },
  created() {
    this.getuse();
    if (localStorage.getItem("__Tk")) {
      this.flag = true;
    }
  },

  methods: {
    //跳转
    goPage(name) {
      if (name === "Login") {
        this.$router.push({ name });
      } else {
        if (!this.flag) {
          this.$toast("请先登录");
        } else {
          this.$router.push({ name });
        }
      }
    },

    getuse() {
      let tokenString = localStorage.getItem("__Tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();
          

          if (result.data.code === "A001") {
            this.myUser = result.data.result[0];
          }
        })
        .catch(() => {
          this.$toast.clear();
          
        });
    },

    //上传背景
    uploadFile(file) {
      

      //获取图片base64
      let serverBase64Img = file.content.replace(
        /^data:image\/[A-Za-z]+;base64,/,
        ""
      );

      //获取图片类型
      let imgType = file.file.type.split("/")[1];

      let tokenString = localStorage.getItem("__Tk");

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType,
          serverBase64Img
        }
      })
        .then(result => {
          this.$toast.clear();
          
          if (result.data.code == "I001") {
            this.myUser.userBg = result.data.userBg;
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch(() => {
          this.$toast.clear();
          
        });
    }
  }
};
</script>

