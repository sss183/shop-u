<template>
	<view class="">
		<!-- 搜索框区域 -->
		<view class="head">
			<image src="../../static/index/logo.jpg" mode="widthFix"></image>
			<view class="searchview">
				<input type="text" value="" placeholder="寻找商品" @focus="_goSearch" />
			</view>
		</view>
		<!-- 快速分类导航 滚动视图 -->
		<scroll-view scroll-x class="quicknav">
			<view v-for="(item,index) in quicknav" :key="index" @click="_goGoodsList(index)">
				<text :class="index == topindex ? 'navactive' : '' ">{{item.catename}}</text>
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.img" mode=widthFix></image>
			</swiper-item>
		</swiper>
		<!-- 功能导航 -->
		<view class="funnav">
			<view class="funnavrow" v-for="(item,index) in funNavList" :key="index" @click="_goCateList(index)">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 秒杀商品推荐区域 -->
		<view class="seckill">
			<!-- 秒杀左侧区域 -->
			<view class="leftseckill" v-if="skill.length!=0">
				<view class="title">
					<image src="../../static/index/xianshi.jpg" mode="widthFix"></image>
					<text>限时秒杀</text>
				</view>
				<view class="info">
					<text>{{skill[0].title}}</text>
				</view>
				<view class="time" v-if="time.status">
					<view>正</view>
					<view>在</view>
					<view>秒</view>
					<view>杀</view>
				</view>
				<view class="time" v-else>
					<view>{{time.h}}</view>:
					<view>{{time.m}}</view>:
					<view>{{time.s}}</view>
					<view>秒杀</view>
				</view>
				<image :src="skill[0].img" mode="widthFix" class="goodimg"></image>
			</view>
			<!-- 秒杀右侧区域 -->
			<view class="rightseckill">
				<view class="top">
					<view class="topinfo">
						<text>品牌上新 <text style="background: #f33182;font-size: 28rpx;color: white;">折</text></text>
						<text>每天九点，抢大牌</text>
					</view>
					<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
				</view>
				<view class="bottom">
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 广告图片推送区域 -->
		<view class="gg">
			<image src="../../static/index/swiper1.jpg" mode="widthFix"></image>
		</view>
		<!-- 推荐商品区域 -->
		<view class="recommendgood">
			<!-- 推荐导航 -->
			<view class="recommendnav">
				<view @click="_switchTab(0)" :class="switchIndex==0?'recommendactive':''">
					<text>热门推荐</text>
				</view>
				<view @click="_switchTab(1)" :class="switchIndex==1?'recommendactive':''">
					<text>上新推荐</text>
				</view>
				<view @click="_switchTab(2)" :class="switchIndex==2?'recommendactive':''">
					<text>所有商品</text>
				</view>
			</view>
			<view class="recommendlist">
				<view class="recommendrow" v-for="(item,index) in indexGoods">
					<image :src="item.img" mode="widthFix"></image>
					<view class="recommendrowinfo">
						<text>{{item.goodsname}}</text>
						<text>现价格： ￥{{item.price}}</text>
						<text>原价格：￥{{item.market_price}}</text>
						<text @click="_goDetail(item.id)">
							立即抢购
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				quicknav: [], //快速分类导航,
				topindex: 0,
				swipers: [],
				products: [], //热销、上新、所有商品数据
				skill:[],
				time:{
					status:true,
					h:'00',
					m:'00',
					s:'00'
				},
				funNavList: [{ //功能导航数据
						name: "限时抢购",
						icon: require("../../static/index/xiaohuoban.png")
					},
					{
						name: "积分商城",
						icon: require("../../static/index/jifentixicopy.png")
					},
					{
						name: "联系我们",
						icon: require("../../static/index/lianxiwomen.png")
					},
					{
						name: "商品分类",
						icon: require("../../static/index/-shangpinfenlei-gai.png")
					}
				],
				switchIndex:0
			}
		},
		onLoad() {
			//获取一级导航
			this._getNav()
			this._getBanner()
			this._getSkill()
			this._getIndexGoods()
		},
		computed:{
			indexGoods:function(){
				let index=this.switchIndex
				if(this.products.length==0){
					return []
				}else{
					return Api.imgUrl(this.products[index].content)
				}
				
			}
		},
		methods: {
			_goDetail:function(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			_switchTab:function(index){
				this.switchIndex=index
			},
			_getIndexGoods:async function(){
				let res=await Api.getIndexGoods()
				if(res.data.code==200){
					this.products=res.data.list
					console.log(this.products)
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			},
			_getSkill:async  function(){
				let res=await Api.getSkill()
				console.log(res)
				if(res.data.code==200){
					this.skill=Api.imgUrl(res.data.list)
					console.log(this.skill)
					this._getTime(this.skill[0].begintime)
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			},
			_getTime:function(starttime){
				setInterval(()=>{
					let nowtime=(new Date).getTime()
					let time=Math.ceil((starttime-nowtime)/1000)
					if(time<=0){
						this.time.status=true
					}else{
						this.time.status=false
						let h=Math.floor(time/3600)
						if(h<10) h="0"+h
						time=time%3600
						let m =Math.floor(time/60)
						if(m<10)  m="0"+m
						let s =time%60
						if(s<10) s="0"+s
						this.time.h=h
						this.time.m=m
						this.time.s=s
 					}
				},1000)
			},
			//分类列表
			_goCateList:function(index){
				if(index==3){
					uni.navigateTo({
						url:'../classify/classify'
					})
				}
			},
			//商品列表
			_goGoodsList:function(index){
				this.topindex=index
				uni.navigateTo({
					url:'../product/product?id='+this.quicknav[index].id
				})
			},
			//搜索
			_goSearch:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			//湖区轮播图
			_getBanner:async function(){
				let res=await Api.getBanner()
				console.log(res)
				if(res.data.code==200){
					this.swipers=Api.imgUrl(res.data.list)
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			},
			//或导航
			_getNav:async function(){
				let res=await Api.getNav()
				if(res.data.code==200){
					this.quicknav=res.data.list
				}else{
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
@import url("../../common/css/index.css");
</style>
