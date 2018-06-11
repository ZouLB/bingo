<template>
  <div class="nav">
  	<ul>
  		<li @click="show(0)" class="all">
  			<router-link to="main" :class="{current:0==showindex}">
			    <span><i class="el-icon-cal-all"></i>所有</span>
		    </router-link>
  		</li>
  		<li v-for='(v,i) in mytag' @click="show(i+1)">
		    <router-link :to="{path:'main',query: {tagName:v[1]}}" :class="{current:i+1==showindex}">
			    <span><i class="el-icon-cal-discount"></i>{{v[1]}}</span>
			    <el-button type="text" @click="delTag(v[1])" class="wrapBtn">
			    	<i class="el-icon-delete" title="删除"></i>
			    </el-button>
		    </router-link>
		  </li>
  		<li @click="open" class="add">
			  <span><i class="el-icon-circle-plus-outline"></i>新增标签</span>
  		</li>
		</ul>
  </div>
</template>

<script>
	import util from '../../assets/js/util';
	import { getTag, addTag, removeTag, removeTagRela} from '../../api/api';
	
	export default {
		data() {
			return {
				mytag:[],
				project_id:null,
				showindex:0
			}
		},
    methods: {
    	//获取标签
      getTagData(){
      	getTag({projectId:this.project_id}).then((res) => {
      		this.mytag=res.data.rows; 
      	})
      },
      //删除标签
      delTag(msg){
      	this.$confirm('确认删除'+msg+'标签吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						tag:msg,
						projectId:this.project_id
					}
					removeTag(para).then((res) => {	//删除标签
						removeTagRela(para).then((res) => {	//删除标签关系
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getTagData();
						});
					});
					
				}).catch(() => {
					
				});
      },
      //新增标签
      open(){
      	this.$prompt('请输入标签', '新增标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '标签不能为空'
        }).then(({ value }) => {
        	let para = {
        		projectId:this.project_id,
        		tag:value,
        		creator:'',
        		createTime:util.formatDate.format(new Date(), 'yyyy-MM-dd')
        	}
        	//判断标签是否已存在
        	let arr=[];
        	this.mytag.forEach((tagVal) =>{
        		arr.push(tagVal[1])
        	})
        	if(arr.indexOf(value)==-1){
        		addTag(para).then((res) => {
	        		this.$message({
		            type: 'success',
		            message: '新增成功'
		          });
		          this.getTagData();
        		});
        	}else{
        		this.$message({
		          type: 'warning',
		          message: value+'标签已存在'
		        });
        	}
        	
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消新增标签'
          });       
        });
      },
      show(n){
      	this.showindex=n;
      }
   	},
   	mounted(){
   		this.project_id = this.$route.params.pid;
   		this.getTagData();
   	},
   	watch:{
	   		'$route' (to, from){
	    		this.getTagData();
	   		},
	   		getTagData(){
	   			this.getTagData();
	   		}
	  }
}
</script>

<style scoped="scoped" lang="scss">
	$maincolor:#0085B5;
	li{
		height: 47px;
		width: 100%;
		text-indent: 1em;
		font: 14px/47px "微软雅黑";
		cursor: pointer;
		box-sizing: border-box;
		span{
			display: inline-block;
			width: 165px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			i{
				position: relative;
				/*top: -17px;*/
				left: -14px;
				top: 1px;
				margin-right: 5px;
				font: 17px "微软雅黑";
			}
		}
		a{
			display: block;
			width: 100%;
			height: 100%;
			color: #606266;
			border-left: 3px solid transparent;
			box-sizing: border-box;
			.wrapBtn{
				padding: 0;
				border: none;
				.el-icon-delete{
					float: right;
					font: 16px/47px "微软雅黑";
					color: #909399;
					display: none;
					text-indent: 10px;
					top: 0;
					margin-left: 17px; 
					&:hover{
						color: #F56C6C;
					}
				}
			}
		}
		
		&:hover,&:hover a{
			color: $maincolor;
			background-color: #E4E7ED;
			.el-icon-delete{
				display: block;
			}
		}
	}
	.current{
		color: $maincolor;
		background-color:#E4E7ED;
		border-left: 3px solid $maincolor;
	}
	.add{
		color: #303133;
		border-left: 3px solid transparent;
	}
</style>
