<template>
  <div class="register">
    <van-nav-bar
      title="登录"
      left-text="注册"
      right-text="关闭"
      @click-left="goPage('Register')"
      @click-right="goPage('Menu')"
    />
    <div class="logo">
      <img class="auto-img" src="../assets/images/coffee.png" alt="">
    </div>

    <van-form @submit="login">
      <van-field
        v-model="myUser.phone"
        type="text"
        label="手机号"
        placeholder="请输入11位手机号"
        left-icon="phone-o"
        maxlength="11"
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
        <van-button round block type="info" native-type="submit">立即登录</van-button>

        <div class="forgot">
          <span class="fr"  @click="got">忘记密码？</span>
        </div>
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
          password: ''
        },

        //false: 闭合，true：睁开
        flag: false

      }
    },

    methods: {
       //找回密码
      got() {
        this.$router.push({name: 'Forgot'});
      },

      //跳转页面
      goPage(name) {
        this.$router.push({name});
      },

      //切换密码的格式
      viewPassword() {
        this.flag = !this.flag;
      },

      //登录
      login() {

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
            url: '/login',

            //post传递参数需要写在data
            data
          }).then(result => {
            //关闭加载提示
            this.$toast.clear();
            
            if (result.data.code == 200) {
              //跳转到菜单
              

              //存储token，用于后面登录验证
              localStorage.setItem('__Tk', result.data.token);
                this.$router.push({name:'Menu'})
              
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

<style lang="less" scoped>
  .forgot{
    margin-top: 20px;
  }
</style>