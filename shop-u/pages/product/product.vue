<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" @focus="_goSearch" placeholder="搜索商品" placeholder-class="placeholder" />
		</view>
		<view class="list">
			<view class="row" v-for="(item,index) in goods" :key="index" @click="_goDetail(item.id)">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>￥{{item.market_price}}</text>	
				</view>
			</view>
		</view>
		<!-- <view class="api">
			暂无商品数据！
		</view> -->
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				fid:0,
				goods:[],
				page:1,
				pageCount:0
			}
		},
		onLoad(options){
			this.fid=options.id
			this._getGoodsByCateId(1)
		},
		onReachBottom(){
			this.page++
			if(this.page<=this.pageCount){
				this._getGoodsByCateId(this.page)
			}else{
				uni.showToast({
					title:"我们是有底线的",
					icon:'none'
				})
			}
			
		},
		methods: {
			//搜索
			_goSearch:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			_goDetail:function(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			_getGoodsByCateId:async function(page){
				uni.showLoading({
					title:'加载中'
				})
				let res=await Api.getGoodsByCateId({
					fid:this.fid,
					page:page,
					size:6
				})
				if(res.data.code==200){	
					this.goods=this.goods.concat(Api.imgUrl(res.data.list[1]))
					this.pageCount=res.data.list[0]
					console.log(this.goods)
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
	.search{
		margin: 65rpx;
		height: 75rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.api{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
