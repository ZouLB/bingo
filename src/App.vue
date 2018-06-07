<template>
  <div id="app">
    <v-header></v-header>
    <div class="content">
    	<transition name='fade' mode="out-in">
    		<router-view class="child-view"></router-view>
    	</transition>
    </div>
   </div>
</template>

<script>
	import vheader from './components/common/header.vue'
	
	export default {
	  name: 'App',
	  components: {
	    'v-header': vheader
	  }
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/animation.scss";
	
	.content{
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 0;
		right: 0;
	} 
</style>
