import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index'
import project from '@/components/page/project'
import main from '@/components/page/main'
import edit from '@/components/page/edit'
import add from '@/components/page/add'
import login from '@/components/page/login'
Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:'/login'},
		{path:'/login',component:login},
		{path:'/index',component:index},
		{
			path:'/project/:pid/:pname',
			component:project,
			children: [
        {path: '/project/:pid/:pname', redirect: '/project/:pid/:pname/main' },
        {path:'main',name:'main',component:main},
				{path:'edit',name:'edit',component:edit},
				{path:'add',component:add}
			]
		},
  ]
})
