import Vue from 'vue'
import { 
	Toast , 
	Lazyload ,
	Swipe, 
	SwipeItem,
	MessageBox,
	Tabbar, 
	TabItem,
 } from 'mint-ui';


Vue.use(Lazyload)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.prototype.$message = Toast;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;

