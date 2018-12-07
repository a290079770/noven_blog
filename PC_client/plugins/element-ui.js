import Vue from 'vue'
// import Element from 'element-ui/lib/element-ui.common'
// 按需引入
import { 
  Carousel , 
  CarouselItem,
  Tooltip,
  Pagination,
  Form,
  Input,
  Button,
  Checkbox,
  Upload, 
  Row,
  Col,
  Message,
  MessageBox,
  Popover,
} from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  // Vue.use(Element)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Tooltip)
  Vue.use(Pagination)
  Vue.use(Form)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Checkbox)
  Vue.use(Upload)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Popover)

  Vue.prototype.$message = Message;
  Vue.prototype.$alert = MessageBox.alert;

  Vue.prototype.$confirm = function(msg,notice,option = {}) {
    let custom = {
      showClose:false,
      lockScroll:true,
    }
    return MessageBox.confirm(msg,notice,Object.assign(custom,option))
  }
  Vue.prototype.$confirm = MessageBox.confirm;
}
