<template>
  <div class="head">
      <p v-if="step">项目管理</p>
      
      <p v-if="!step">
      	<!--<span @click="back" class="current">项目管理</span>-->
      	<router-link to="/index" class="current">项目管理</router-link>
      	<i class="el-icon-arrow-right"></i>
      	<span>{{name}}</span>
      </p>
  </div>
</template>

<script>

	export default{
		data(){
			return{
				step:true,
				name:''
			}
		},
		methods:{
			back(){
				this.step=true;
				this.$router.go(-1);
			},
		},
    watch: {
      '$route' (to, from) {
      	this.name = this.$route.params.pname;
      	if(from.path=='/index'){
      		this.step=false;
      	}else if(to.path=='/index'){
      		this.step=true;
      	}
    	}
    }
	}
	
</script>


<style scoped lang="scss">
  .head{
	  width:100%;
	  height:60px;
	  font:17px/60px "微软雅黑";
	  color: white;
	  background-color: #0085B5;
	 	text-indent: 24px;
	 	.current{
	 		cursor: pointer;
	 		color: white; 
	 		&:hover{
	 			color: #E6F2F7;
	 		}
	 	}
  }
  [class*=" el-icon-"], [class^=el-icon-]{
  	display: inline;
  }
  
</style>
