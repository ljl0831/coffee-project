<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-text="登录"
      right-text="关闭"
      @click-left="goPage('Login')"
      @click-right="goPage('Menu')"
    />
    <div class="logo">
      <img class="auto-img" src="../assets/images/coffee.png" alt="">
    </div>

    <van-form @submit="register">
      <van-field
        v-model="myUser.phone"
        type="text"
        label="手机号"
        placeholder="请输入11位手机号"
        left-icon="phone-o"
        maxlength="11"
      />
      <van-field
        v-model="myUser.nickName"
        type="text"
        label="昵称"
        placeholder="请输入字母数字_组合(1-10位)"
        left-icon="contact"
        maxlength="10"
      />
      <van-field
        v-model="myUser.password"
        :type="flag ? 'text' : 'password'"
        label="密码"
        placeholder="请输入字母数字_组合(6-16位)"
        left-icon="lock"
        :right-icon="flag ? 'eye-o' : 'closed-eye'"

        @click-right-icon="viewPassword"
        maxlength="16"
      />
      <div class="register-btn">
        <van-button round block type="info" native-type="submit">立即注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

  //导入样式
  import '../assets/css/register.less'

  //导入验证表单模块
  import validForm from '../assets/js/validForm'

  export default {
    data() {
      return {

        //用户注册信息
        myUser: {
          phone: '',
          nickName: '',
          password: ''
        },

        //false: 闭合，true：睁开
        flag: false

      }
    },

    methods: {

      //跳转页面
      goPage(name) {
        this.$router.push({name});
      },

      //切换密码的格式
      viewPassword() {
        this.flag = !this.flag;
      },

      //注册
      register() {

        //进行验证表单
        if (validForm.validUserForm(this.myUser)) {

          //复制对象
          let data = Object.assign({}, this.myUser);

          //请求密钥
          data.appkey = this.appkey;

          //开启加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,

            //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
            duration:0
          });

          //发起注册请求
          this.axios({
            method: 'POST',
            url: '/register',

            //post传递参数需要写在data
            data
          }).then(result => {
            //关闭加载提示
            this.$toast.clear();
            
            if (result.data.code == 100) {
              //跳转到登录页面
              this.$router.push({name: 'Login'});
            } else {
              this.$toast(result.data.msg);
            }
          }).catch(() => {
            //关闭加载提示
            this.$toast.clear();
            
          })
        }

      }
    }
  }
</script>