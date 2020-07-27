import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

//导入用于设置 rem基准值模块
import 'lib-flexible';
//导入vant框架
import { Uploader, Form,Field, NavBar, Button,Icon,NumberKeyboard,Toast,Tabbar, TabbarItem,Search,Swipe, SwipeItem,Grid, GridItem,Image,GoodsActionIcon,Stepper,GoodsAction,GoodsActionButton,Lazyload,AddressEdit,Empty,AddressList,SwipeCell,Cell,Checkbox,List,SubmitBar,Image as VanImage,CellGroup,Popup,Tab,Tabs,Card,PullRefresh,Dialog
 
} from 'vant';

import "font-awesome/css/font-awesome.min.css"


Vue
  .use(NavBar)
  .use(Form)
  .use(Uploader)
  .use(Button)
  .use(Field)
  .use(Icon)
  .use(NumberKeyboard)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(GoodsActionIcon)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(Lazyload)
  .use(AddressEdit)
  .use(AddressList)
  .use(Empty)
  .use(SwipeCell)
  .use(Cell)
  .use(Checkbox)
  .use(List)
  .use(SubmitBar)
  .use(VanImage)
  .use(Image)
  .use(CellGroup)
  .use(Popup)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(PullRefresh)
  .use(Dialog)
  
  
  //注册axios
  Vue.use(VueAxios, axios)

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

//发起请求之前处理
axios.interceptors.request.use(config => {
  // 

  if (config.method == 'post') {
    let paramsString = '';
    //post请求参数序列化，转成一个字符串
    for (let key in config.data) {
      paramsString += key + '=' + config.data[key] + '&'
    }

    // 

    config.data = paramsString.slice(0, -1);

    // 
  }

  return config;
})

//全局过滤器
Vue.filter('formatDate', (value, format) => {
  //value: 2020-07-08T02:40:51.000Z
  //format: yyyy-MM-dd hh:mm:ss
  let current = new Date(value);

  //获取年份
  let year= current.getFullYear();
  // 
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    let yearContent = RegExp.$1;
    // 

    format = format.replace(yearContent, year);
  }

  //处理月日时分秒
  let dateObject = {
    M: current.getMonth() + 1,
    d: current.getDate(),
    h: current.getHours(),
    m: current.getMinutes(),
    s: current.getSeconds()
  };

  for (let key in dateObject) {
    //创建动态正则表达式
    let reg = new RegExp(`(${key}+)`)
    // 
    if (reg.test(format)) {
      //获取匹配组的内容, RegExp.$n必须需要test验证通过可以获取
      let content = RegExp.$1;
      // 

      //控制补零
      let value = dateObject[key] >= 10 ? dateObject[key] : content.length == 2 ? '0' + dateObject[key] : dateObject[key];
      format = format.replace(content, value);
    }
  }

  return format;
})

Vue.config.productionTip = false

//添加appkey属性保存appkey
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';


new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
