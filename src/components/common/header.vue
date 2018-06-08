<template>
  <div class="head">
      <h1 v-if="step" style="float: left;"><i class="el-icon-cal-list" v-if="title=='项目列表'"></i>{{title}}</h1>
      
      <h1 v-if="!step">
      	<router-link to="/index" class="current"><i class="el-icon-cal-list"></i>项目列表</router-link>
      	<i class="el-icon-arrow-right"></i>
      	<span>{{name}}</span>
      </h1>
      
      <div class="exit" v-show="exitShow">
      	<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="../../assets/img/img-head.png" />{{userName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="exitLogin"><i class="el-icon-cal-exit"></i>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
      	<!--<p @click="exitLogin">
      		<i class="el-icon-cal-exit"></i>
      		<span>退出登录</span>
      	</p>-->
      </div>
  </div>
</template>

<script>

	export default{
		data(){
			return{
				step:true,
				name:'',
				title:'欢迎登录',
				exitShow:true,
				userName:'admin'
			}
		},
		methods:{
			exitLogin(){
				this.$confirm('确认退出吗?', '提示')
				.then(() => {
//					sessionStorage.removeItem('user');
					this.$router.push({ path: '/login' });
				})
				.catch(() => {

				});
			}
		},
    watch: {
      '$route' (to, from) {
      	this.name = this.$route.params.pname;
      	if(this.$route.path=='/login'){ //登录页
      		this.title='欢迎登录';
      		this.exitShow=false;
      	}else if(to.path=='/index'){ //项目
      		this.step=true;
      		this.title='项目列表';
      		this.exitShow=true;
      	}else if(from.path=='/index'&&this.$route.path!='/login'){ //口径
      		this.step=false;
      		this.exitShow=true;
      	}
    	},
    	//刷新情况
    	name(){
    		if(this.name==undefined){
    			this.step=true;
    		}else{
    			this.step=false;
    		}
    	}
    },
    mounted(){
	   	this.name = this.$route.params.pname;
	   	if(this.$route.path=='/login'){
	   		this.title='欢迎登录';
	   		this.exitShow=false;
	   	}else{
	   		this.title='项目列表';
	   	}
	  },
   
	}
	
</script>


<style scoped lang="scss">
  .head{
	  width:100%;
	  height:60px;
	  font:17px/57px "微软雅黑";
	  color: white;
	  background-color: #0085B5;
	 	text-indent: 22px;
	 	h1{
	 		float: left;
	 		.current{
		 		cursor: pointer;
		 		color: white; 
		 		&:hover{
		 			color: #E6F2F7;
		 		}
		 	}
		 	.el-icon-cal-list{
		 		margin-right: 5px;
		 	}
	 	}
	 	.exit{
	 		float: right;
	 		margin-right: 22px;
	 		cursor: pointer;
	 		.el-dropdown{
		 		font-size:16px; 
	 			color: white;
	 		}
	 		.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 36px;
						height: 36px;
						border-radius: 20px;
						margin: 12px -12px 12px 0;
						float: left;
					}
				}
	 	}
  }
  [class*=" el-icon-"], [class^=el-icon-]{
  	display: inline;
  }
  .el-dropdown-menu__item{
  	&:not(.is-disabled):hover{
  		color: #0085B5;
  		background-color: #eef1f6;
  	}
  	i{
  		margin-right: 5px;
  	}
  }
</style>
