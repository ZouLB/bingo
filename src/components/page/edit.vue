<template>
	<section>
		<div class="head">
			<i class="el-icon-arrow-left" @click='back()'>编辑业务口径</i>
		</div>
		<div class="content">
			<div class="btnG"><el-button type="primary" size="small" @click="cancelSql" plain v-if="sqlBtn=='clear'&&both">清空sql</el-button>
				<el-button type="primary" size="small" @click="addSql" plain v-if="sqlBtn=='add'">添加sql</el-button>
				<el-button type="primary" size="small" @click.native="editSubmit" :loading="editLoading" class="sure">确定</el-button>
				<el-button type="primary" size="small" @click="cancel" plain>取消</el-button>
			</div>
			<el-tabs v-model="activeName" type="card">
			    <el-tab-pane label="口径信息" name="msg" >
			    	<el-form :model="editForm" label-width="80px" ref="editForm" :rules="rules">
						<el-form-item label="口径主题" prop="name">
							<el-input v-model="editForm.name" auto-complete="off" placeholder="请输入口径主题"></el-input>
						</el-form-item>
						<el-form-item label="分类标签" prop="tag">
							<el-select
							    v-model="tagForm"
							    multiple
							    filterable
							    allow-create
							    default-first-option
							    placeholder="请选择或输入标签">
							    <el-option
							      v-for="(item,index) in selectTag"
							      :key="index"
							      :label="item[1]"
							      :value="item[1]">
							    </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="口径内容" prop="desc">
							<el-input type="textarea" :rows="5" v-model="editForm.desc" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="公式" prop="formula">
							<el-input type="textarea" :rows="5" v-model="editForm.formula" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="SQL" name="sql" v-if="sqlShow" v-show="sqlShow">
			    	<div class="sql_code">
						<div class="top">sql</div>
						<codemirror  
						    ref="myCm"  
						    v-model="editForm.sql"
						    :value="editForm.sql"  
						    :options="cmOptions"
						    id="code" 
						></codemirror>
					</div>
			    </el-tab-pane>
			 </el-tabs>
		</div>
	</section>
</template>

<script>
	import util from '../../assets/js/util';
	import { getKnowledge, getEditKnowledge, editKnowledge, getTag, getEditTag, addTag, addTagRela, removeTRbyAll} from '../../api/api'
	import { codemirror } from 'vue-codemirror'  
	require("codemirror/mode/sql/sql.js")			
	require("codemirror/addon/hint/show-hint.js")	
	require("codemirror/addon/hint/sql-hint.js")
	require("codemirror/addon/hint/show-hint.css")
	
	export default{
		data(){
			return{
				id:null,
				project_id:null,
				editLoading:false,
				editForm: {
					id:'',
					name: '',
					projectId:'',
		            desc: '',
		            sql:'',
		            formula:'',
		            creator:'',
		            createTime:'',
				},
				rules: {
		        	name: [
		        		{ required: true, message: '请输入口径主题', trigger: 'blur' }
		        	]
		        },
		        tagForm:[],
		        oldTag:[],
		        selectTag: [],
		        cmOptions: {
		        	lineNumbers:true,
		        	mode: {name: "text/x-mysql"},//关键字变色
		        	extraKeys: {"Ctrl": "autocomplete"},//自动提示
		        },
		        sqlShow:false,
		        sqlBtn:'add',
		        both:true,
		        activeName:'msg'
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			//获取编辑数据
			getEditData(){
				//口径数据
				getEditKnowledge({projectId:this.project_id,id: this.id}).then((res) => {
					let a=Object.keys(this.editForm);
					let b=res.data.rows;
					let data ={};
					b.map((bb,i) =>{
						bb.forEach((bbb,j) =>{
							data = {
								...data,
								[a[j]]:bbb
							}
						})
					})
					this.editForm = data;
					if(this.editForm.sql!=''){
						this.sqlShow=true;
						this.sqlBtn='clear';
						this.both=false;
					}
				});
//				//口径数据
//				getKnowledge({projectId:this.project_id,name: ''}).then((res) => {
//					let a=Object.keys(this.editForm);
//					let b=res.data.rows;
//					let data ={};
//					b.map((bb,i) =>{
//						if(bb[0]==this.id){		//判断id
//							bb.forEach((bbb,j) =>{
//								data = {
//									...data,
//									[a[j]]:bbb
//								}
//							})
//						}
//					})
//				});
				//标签数据
				getTag({projectId:this.project_id}).then((res) => {
					this.selectTag=res.data.rows;    		
		      	})
				getEditTag({calId:this.id,projectId:this.project_id}).then((res) => {
					let a=res.data.rows;
					a.forEach((val) => {
						this.tagForm.push(val[1]);
						this.oldTag.push(val[1]);
					})
				})
		   },
			editSubmit(){
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						para.id=this.id;
						para.projectId=this.project_id;
//						para.creator='lisi';//获取登录用户
						para.createTime =util.formatDate.format(new Date(), 'yyyy-MM-dd');
						editKnowledge(para).then((res) => {
							//新增不存在的标签和关系
							this.tagForm.forEach((val) => {
								let temp=[]
								this.selectTag.forEach((tagVal) =>{
									temp.push(tagVal[1])
								})
								//所有标签中都不存在时
								if(temp.indexOf(val)==-1){
									addTag({projectId:this.project_id,tag:val,creator:para.creator,createTime:para.createTime}).then((res) => {})
									addTagRela({calId:para.id,tag:val,projectId:this.project_id}).then((res) => {});
								}else if(this.oldTag.indexOf(val)==-1){
									addTagRela({calId:para.id,tag:val,projectId:this.project_id}).then((res) => {});
								}
							})
							//删除标签关系
							this.oldTag.forEach((oldval) => {
								if(this.tagForm.indexOf(oldval)==-1){
									removeTRbyAll({calId:para.id,tag:oldval,projectId:this.project_id}).then((res) => {});
								}
							})
							
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();//重置
							this.back();
						});
					}
				});
			},
			cancel(){
				this.$confirm('确认取消吗?', '提示')
				.then(() => {
					this.back();
				})
				.catch(() => {

				});
			},
			cancelSql(){
				this.$confirm('此操作会清空SQL,是否继续？', '提示')
				.then(() => {
					this.editForm.sql='';
					this.sqlShow=false;
					this.activeName="msg";
					this.sqlBtn="add";
				})
				.catch(() => {

				});
			},
			addSql(){
				this.sqlShow=true;
				this.sqlBtn="clear";
				this.activeName="sql";
			}
		},
		mounted() {
			this.project_id = this.$route.params.pid;
			this.id = this.$route.query.id;
			this.getEditData()
        },
        watch: {
            '$route' (to, from) {
                this.id = this.$route.query.id;
            },
            activeName(){
	   			if(this.activeName=='msg'||this.sqlShow=='clear'){
	   				this.both=false;
	   			}else{
	   				this.both=true;
	   			}
	   		}
        },
        components:{
        	codemirror  
     	}
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/_common.scss";
	
</style>