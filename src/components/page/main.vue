<template>
	<section>
		<!--操作栏-->
		<div class="head clearfix">
			<span>业务口径</span>
			<router-link to="add"><el-button type="primary" size="small" plain>新增</el-button></router-link>
			<el-button type="primary" size="small" @click="getData()" class='search' plain>查询</el-button>
			<!--<el-input placeholder="口径名称" clearable size="small" v-model="filters.name"></el-input>-->
			<input type="text" placeholder="搜索口径主题" v-model="filters.name" @keyup="getData()"/>
		</div>
		
		<!--表格-->
		<div class="content">
			<el-table
			    ref="singleTable"
			    :data="tableData"
			    highlight-current-row
			    v-loading="listLoading"
			    stripe
			    border
			    size="mini"
			    tooltip-effect="dark"
			    @current-change="handleCurrentChange"
			    style="width: 100%;">
			    <el-table-column property="name" label="口径主题" width="170" show-overflow-tooltip sortable></el-table-column>
			    <el-table-column property="desc" label="口径内容" show-overflow-tooltip></el-table-column>
			    <el-table-column property="creator" label="填写人" width="130" sortable></el-table-column>
			    <el-table-column property="create_time" label="填写时间" width="130" sortable></el-table-column>
			    <el-table-column property="operation" label="操作" width="80">
			    	<template scope="scope" >
			    		<router-link :to="{path:'edit',query: {id:scope.row.id}}"><i class="el-icon-edit-outline" title="编辑"></i></router-link>
			    		<!--<router-link :to="'edit/'+scope.row.id"><i class="el-icon-edit" title="编辑"></i></router-link>-->
			    		<i class="el-icon-delete" title="删除" @click="del(scope.$index, scope.row)"></i>
					</template>
			    </el-table-column>
			</el-table>
			<!--<el-pagination
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>-->
		</div>
	</section>
</template>

<script>
	import { getKnowledge , removeKnowledge, getKnowledgeByTag, removeTRbyCid} from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	filters:{
	      		name:''
	      	},
	        tableData: [],
	        project_id:'',
	        listLoading:false,
	        currentRow: null,
	        searchTag:''
	      }
	    },
	    methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    //判断获取数据
		    getData(){
		    	this.project_id = this.$route.params.pid;
		    	this.searchTag=this.$route.query.tagName;
		    	if(this.searchTag==undefined){
		   			this.getAllData();
		   		}else{
		   			this.getPartData();
		   		}
		    },
		    //获取所有口径
	    	getAllData(){
	    		let para = {
	    			projectId:this.project_id,
					name: this.filters.name
				};
				this.listLoading = true;
				getKnowledge(para).then((res) => {
					//数据处理
					let a=res.data.columnNames;
					let b=res.data.rows;
					let data = b.map((bb,i) =>{
						let temp = {};
						bb.forEach((bbb,j) =>{
							temp = {
								...temp,
								[a[j]]:bbb
							}
						})
						return temp
					})
					this.tableData = data;
					this.listLoading = false;
				});
		    },
		    //获取部分口径
		    getPartData(){
		    	let para = {
	    			projectId:this.project_id,
					tag: this.searchTag,
					name: this.filters.name
				};
				this.listLoading = true;
				getKnowledgeByTag(para).then((res) => {
					//数据处理
					let a=res.data.columnNames;
					let b=res.data.rows;
					let data = b.map((bb,i) =>{
						let temp = {};
						bb.forEach((bbb,j) =>{
							temp = {
								...temp,
								[a[j]]:bbb
							}
						})
						return temp
					})
					this.tableData = data;
					this.listLoading = false;
				});
		    },
	    	//删除
	    	del:function(index,row){
	    		this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					
					removeTRbyCid({calId:row.id,projectId:this.project_id}).then((res) => {	//删除标签关系
						removeKnowledge({id:row.id}).then((res) => {
							this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
							this.getData();
						});	//删除口径
//						this.getData();
					})
					
				}).catch(() => {
					
				});
	    	},
	    	
	    },
	    mounted(){
	    	this.getData();
		},
		watch:{
	   		'$route' (to, from){
	    		this.getData();
	   		},
	   		getData(){
	   			this.getData();
	   		}
	   }
	}
</script>

<style scoped="scoped" lang="scss">
	$maincolor:#0085B5;
	section{
		width: 100%;
		height: 100%;
		background-color: white;
		box-sizing: border-box;
	}
	.head{
		padding: 7px 11px;
		border-bottom: 1px solid gainsboro;
		span{
			font: 16px/32px "微软雅黑";
        	color: #666;
		}
		[type=text]{
			float: right;
			width: 200px;
			height: 30px;
			border-radius: 5px;
			border: 1px solid gainsboro;
			font: 14px "微软雅黑";
			text-indent: 10px;
			outline: none;
			&:focus{
				border-color:$maincolor;
			}
		}
		.el-button{
			float: right;
		}
		.search{
			margin:0 11px;
		}
	}
	.content{
		position: absolute;
		top: 59px;
		left: 11px;
		bottom: 11px;
		right: 11px;
		border: 1px solid gainsboro;
		overflow: auto;
		&::-webkit-scrollbar{
			width: 8px;
			height: 16px;
			background-color: #fff;
			cursor: pointer;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 8px;
			background-color: #aaa;
			cursor: pointer;
		}
		[class*=" el-icon-"], [class^=el-icon-]{
			font-size: 18px;
			cursor: pointer;
		}
		.el-icon-edit-outline{
			margin-right: 15px;
			&:hover{
				color: $maincolor;
			}
		}
		.el-icon-delete:hover{
			color: #F56C6C;
		}
		a{
			color: #666;
		}
		.el-table--border, .el-table--group{
			border: none;
		}
		.el-table--mini, .el-table--small, .el-table__expand-icon{
			font-size: 14px;
		}
		.el-table_72_column_359{
			text-align: center;
		}
	}
	
</style>