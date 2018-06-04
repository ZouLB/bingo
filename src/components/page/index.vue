<template>
	<section>
		<div class="main">
			<el-row :gutter="12">
				<el-col :xs="12" :sm="8" :md="6" v-for="(v,i) in proData">
					<div class="card">
						<router-link :to="'/project/'+v[0]+'/'+v[1]">
							<el-card>
								{{v[1]}}
							</el-card>
						</router-link>
					</div>
				</el-col>
				
				<el-col :xs="12" :sm="8" :md="6">
					<div class="card addCard" @click="addFormVisible=true">
						<el-card >
							<i class="el-icon-circle-plus"></i>
							<span>创建项目</span>
						</el-card>
					</div>
				</el-col>
			</el-row>
		</div>
		
		<!--创建项目-->
		<el-dialog title="创建项目" :visible.sync="addFormVisible" :close-on-click-modal="false" width="350px">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="项目名称" prop="projectName">
					<el-input v-model="addForm.projectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="项目描述">
					<el-input type="textarea" v-model="addForm.desc"></el-input>
				</el-form-item>
				<el-form-item style="margin-bottom: 0;"> 
					<el-button type="primary" :loading="addLoading" @click="addSubmit">确定</el-button>
					<el-button @click.native="addFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>

	import util from '../../assets/js/util';
	import { getProject , addProject} from '../../api/api';
	 
	export default{
		data(){
			return{
				addFormVisible:false,
				addLoading:false,
				proData:[],
				addForm: {
					projectId:'',
					projectName:'',
		            desc: '',
		            creator:'',
		            createTime:''
				},
				addFormRules: {
		        	projectName: [
		        		{ required: true, message: '请输入项目名称', trigger: 'blur' }
		        	]
		        },
			}
		},
		methods:{
			getProData(){
				getProject().then((res) => {
					this.proData=res.data.rows;
				})
			},
			addSubmit(){
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						para.projectId=(Math.random() * (999999 - 100000 + 1) | 0) + 100000;//生成随机id
						para.createTime =util.formatDate.format(new Date(), 'yyyy-MM-dd');
						//判断项目是否已存在
						let arr=[];
						this.proData.forEach((val) =>{
			        		arr.push(val[1]);
			        	})
			        	if(arr.indexOf(para.projectName)==-1){
			        		addProject(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
							});
							this.getProData();
			        	}else{
			        		this.addLoading = false;
			        		this.$message({
					          type: 'warning',
					          message:'项目已存在'
					        });
			        	}
			        	this.$refs['addForm'].resetFields();
						this.addFormVisible=false;
					}
				});
			},
		},
		mounted(){
			this.getProData();
		}
	}
	
</script>

<style scoped="scoped" lang="scss">
	.main{
		margin: 50px auto;
		.card .el-card{
			width: 254px;
			height: 128px;
			margin: 12px auto;
			cursor: pointer;
			color: white;
			font: 20px "微软雅黑";
			overflow: hidden;
			background: url(../../assets/img/project_bg.png) no-repeat 100%;
			i{
				display: block;
				font-size: 35px;
				margin: 9px 0;
			}
			&:hover{
				transform: translateY(-6px);
			}
			
		}
		.addCard{
			text-align: center;
			.el-card{
				color: darkgrey;
				background-image: none;
				background-color: #fff;
			}
			&:hover .el-card{
				color: #0085B5;
			}
		}
		.el-dialog{
			width: 26%;
			.el-form-item:nth-last-of-type(1){
				margin-bottom: 0;
			}
		}
	}
	@media only screen and (min-width: 1196px) {
		.main{
			width: 1100px;
		}
	}
	
	
</style>