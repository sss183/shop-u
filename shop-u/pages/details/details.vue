<template>
	<view class="container" style="margin-bottom:50px;">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goods.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{goods.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{goods.price}}</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label class="jian" @click="_decr">-</label>
				  <label class="zhi">{{number}}</label>
				  <label class="jia" @click="_incr">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label></label>
					<view class="bg" >{{goods.specsattr}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<rich-text :nodes="goods.description" />
		</view>
		
		
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="_addCart">加入购物车</button>
			<button class="footbtn2" >立即购买</button>
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				id:'',
				goods:{},
				number:1,
				bg:'threed3i1',//商品属性背景色
				
				
			}
		},
		onLoad: function (options) {
			this.id=options.id
			this._getGoodsById(this.id)
		},
		methods: {
			_addCart:function(){
				let token=uni.getStorageSync("token")||""
				if(token==""){
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url:'../login/login'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url:'../send/send'
					})
					// #endif
					return
				}
			},
			_decr:function(){
				if(this.number>1){
					this.number--
				}
			},
			_incr:function(){
				if(this.number<this.goods.number){
					this.number++
				}
			},
			async _getGoodsById(id){
				uni.showLoading({
					title:'加载中'
				})
				let res=await Api.getGoodsById({
					id
				})
				if(res.data.code==200){
					let goods=Api.imgUrl(res.data.list)
					this.goods=goods[0]
					
				}
				uni.hideLoading()
				if(res.data.code==500){
					uni.showToast({
						title:"网络开小差了",
						icon:'none'
					})
				}
			}
		}
		
	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
