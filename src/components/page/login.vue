<template>
	<section class="loginBox">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		    <h3 class="title">系统登录</h3>
		    <el-form-item prop="account">
		      <el-input type="text" prefix-icon="el-icon-cal-account" v-model="ruleForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
		    </el-form-item>
		    <el-form-item prop="checkPass">
		      <el-input type="password" prefix-icon="el-icon-cal-password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
		    <el-form-item >
		      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
		    </el-form-item>
		</el-form>
	</section>
</template>

<script>
//import { requestLogin } from '../../api/api';
  
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
          account: 'admin',
          checkPass: 'admin'
        },
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      };
    },
    methods: {
      handleSubmit(ev) {
      	sessionStorage.setItem('user', 'zlb');
      	this.$router.push({ path: '/index' });
//      var _this = this;
//      this.$refs.ruleForm.validate((valid) => {
//        if (valid) {
//          this.logining = true;
//          var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
//          requestLogin(loginParams).then(data => {
//            this.logining = false;
//            let { msg, code, user } = data;
//            if (code !== 200) {
//              this.$message({
//                message: msg,
//                type: 'error'
//              });
//            } else {
//              sessionStorage.setItem('user', JSON.stringify(user));
//              this.$router.push({ path: '/index' });
//            }
//          });
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
      }
    }
  }

</script>

<style lang="scss" scoped>
	.loginBox {
		width: 400px;
		height: 470px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.login-container {
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    -webkit-border-radius: 5px;
	    width: 340px;
	    padding: 35px 35px 13px 35px;
	    background: #fff;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	    .title {
	      margin: 0px auto 35px auto;
	      text-align: center;
	      font-size: 18px;
	      color: #505458;
	    }
	    .el-button {
	      margin-top: 12px;
	    }
	}
</style>