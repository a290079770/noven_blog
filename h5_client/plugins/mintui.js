import Vue from 'vue'
import { 
	Toast , 
	InfiniteScroll , 
	Lazyload ,
	Swipe, 
	SwipeItem,
	MessageBox,
	Tabbar, 
	TabItem,
 } from 'mint-ui';


Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.prototype.$message = Toast;
Vue.prototype.$confirm = MessageBox.confirm;

