<template>
	<view class="container">
		<!-- left左侧一级分类列表 -->
		<scroll-view scroll-y class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" @click="_switchTab(index)" :class="activeIndex == index ? 'activeList' : ''" v-for="(item,index) in classify" :key="index" >
				<label for="">{{ item.catename }}</label>
			</view>
		</scroll-view>
		<!-- right右侧二级分类详情 -->
		<scroll-view scroll-y class="right">
			<view class="row">
				<view @click="_goGoodList(item.id)" class="row_list" v-for="(item,index) in children" :key="index">
					<image :src="item.img" mode="widthFix"></image>
					<text>{{item.catename}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data(){
			return {
				activeIndex:0,
				classify:[
					
				]
			}
		},
		onLoad() {
			this._getCates()
		},
		computed:{
			children:function(){
				let index=this.activeIndex
				if(this.classify.length==0) return []
				if(this.classify[index].children){
					return Api.imgUrl(this.classify[index].children) 
				}else{
					return []
				}
			}
		},
		methods:{
			_goGoodList:function(id){
				uni.navigateTo({
					url:'../product/product?id='+id
				})
			},
			_switchTab:function(index){
				this.activeIndex=index
			},
			_getCates:async function(){
				let res=await Api.getCates()
				if(res.data.code==200){
					this.classify=res.data.list
					console.log(this.classify)
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
