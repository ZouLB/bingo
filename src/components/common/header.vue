<template>
  <div class="head">
      <h1 v-if="step" style="float: left;">{{title}}</h1>
      
      <h1 v-if="!step">
      	<router-link to="/index" class="current">项目管理</router-link>
      	<i class="el-icon-arrow-right"></i>
      	<span>{{name}}</span>
      </h1>
      
      <div class="exit" v-show="exitShow">
      	<span @click="exitLogin">退出登录</span>
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
				exitShow:true
			}
		},
		methods:{
			exitLogin(){
				this.$confirm('确认退出吗?', '提示')
				.then(() => {
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
      		this.title='项目管理';
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
	   		this.title='项目管理';
	   	}
	  },
   
	}
	
</script>


<style scoped lang="scss">
  .head{
	  width:100%;
	  height:60px;
	  font:17px/60px "微软雅黑";
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
	 	}
	 	.exit{
	 		float: right;
	 		margin-right: 22px;
	 		cursor: pointer;
	 		font-size:16px; 
		 	&:hover{
		 		color: #E6F2F7;
		 	}
	 	}
  }
  [class*=" el-icon-"], [class^=el-icon-]{
  	display: inline;
  }
  
</style>
