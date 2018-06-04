<template>
	<section class="clearfix">
		<div class="head">
			<i class="el-icon-arrow-left" @click='back()'>新增业务口径</i>
		</div>
		<div class="content">
			<div class="btnG">
				<el-button type="primary" size="small" @click="cancelSql" plain v-if="sqlBtn=='clear'&&both">清空sql</el-button>
				<el-button type="primary" size="small" @click="addSql" plain v-if="sqlBtn=='add'">添加sql</el-button>
				<el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading" class="sure">确定</el-button>
				<el-button type="primary" size="small" @click="cancel" plain>取消</el-button>
			</div>
			
			<el-tabs v-model="activeName" type="card">
			    <el-tab-pane label="口径信息" name="msg">
			    	<el-form :model="addForm" label-width="80px" ref="addForm" :rules="rules">
						<el-form-item label="口径主题" prop="name" >
							<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入口径主题"></el-input>
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
							      v-for="(item,i) in selectTag"
							      :label="item[1]"
							      :value="item[1]">
							    </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="口径内容" prop="desc">
							<el-input type="textarea" :rows="5" v-model="addForm.desc" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="公式" prop="formula">
							<el-input type="textarea" :rows="5" v-model="addForm.formula" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="SQL" name="sql" v-if="sqlShow">
			    	<div class="sql_code">
						<div class="top">sql</div>
						<codemirror  
						    ref="myCm"  
						    v-model="addForm.sql"
						    :value="addForm.sql"  
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
	import { addKnowledge, getTag, addTag, addTagRela} from '../../api/api'
	import { codemirror } from 'vue-codemirror'  
	require("codemirror/mode/sql/sql.js")			
	require("codemirror/addon/hint/show-hint.js")	
	require("codemirror/addon/hint/sql-hint.js")
	require("codemirror/addon/hint/show-hint.css")
	 
	
	export default{
		data(){
			return{
				addLoading:false,
				project_id:null,
				addForm: {
					id:'',
					name: '',
					projectId:'',
		            desc: '',
		            formula:'',
		            sql:'',
		            creator:'张三',
		            createTime:''
				},
				tagForm:[],
				rules: {
		        	name: [
		        		{ required: true, message: '请输入口径主题', trigger: 'blur' }
		        	]
		        },
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
				this.$router.go(-1);
			},
			addSubmit(){
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						para.id=(Math.random() * (999999 - 100000 + 1) | 0) + 100000;//生成随机id
						para.createTime =util.formatDate.format(new Date(), 'yyyy-MM-dd');
						addKnowledge(para).then((res) => {
							//新增标签关系
							this.tagForm.forEach((val) => {
								//判断标签是否存在
								let temp=[]
								this.selectTag.forEach((tagVal) =>{
									temp.push(tagVal[1])
								})
								if(temp.indexOf(val)==-1){
									addTag({projectId:this.project_id,tag:val,creator:para.creator,createTime:para.createTime}).then((res) => {})
								}  
								addTagRela({calId:para.id,tag:val,projectId:this.project_id}).then((res) => {});
							})
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
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
			getTagData(){
				getTag({projectId:this.project_id}).then((res) => {
//		      		let a=res.data.columnNames;
//					let b=res.data.rows;
//					let data = b.map((bb,i) =>{
//						let temp = {};
//						bb.forEach((bbb,j) =>{
//							temp = {
//								...temp,
//								[a[j]]:bbb
//							}
//						})
//						return temp
//					})
//					this.selectTag=data
					this.selectTag=res.data.rows;	
					let temp=[];
					this.selectTag.forEach((val)=>{
						temp.push(val[1]);
					})
		      	})
			},
			cancelSql(){
				this.$confirm('此操作会清空SQL,是否继续？', '提示')
				.then(() => {
					this.addForm.sql='';
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
		mounted(){
	   		this.project_id = this.$route.params.pid;
	   		this.addForm.projectId = this.$route.params.pid;
	   		this.getTagData();
	   	},
	   	components:{
        	codemirror  
	    },
	    watch:{
	   		'$route' (to, from){
	    		this.getTagData();
	   		},
	   		getTagData(){
	   			this.getTagData();
	   		},
	   		activeName(){
	   			if(this.activeName=='msg'||this.sqlShow=='clear'){
	   				this.both=false;
	   			}else{
	   				this.both=true;
	   			}
	   		}
	   	}
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/style.scss";
        
</style>