<template>
	<section>
		<div class="left">
	    	<v-nav></v-nav>
	    </div>
	    <div class="right">
	    	<transition name='fade'>
		    	<router-view class="child-view"></router-view>
		    </transition>
		</div>
	</section>
	
</template>

<script>
	import vnav from '../common/nav.vue'
	
	export default {
	  name: 'App',
	  components: {
	    'v-nav': vnav
	  }
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/animation.scss";
	
	$comcolor:rgb(238, 241, 246);
	.left{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 250px;
		background-color: $comcolor;
		overflow: auto;
		&::-webkit-scrollbar{
			width: 11px;
			height: 16px;
			background-color:$comcolor;
			cursor: pointer;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 11px;
			background-color: #aaa;
			cursor: pointer;
		}
	}
	.right{
		position: absolute;
		top: 0;
		left: 250px;
		bottom: 0;
		right: 0;
	}
</style>