import {http,baseUrl}  from  './http.js'
//获取导航
const getNav=()=>{
	return http({
		url:'/api/getcate',
	})
}
//录播图
const getBanner=()=>{
	return http({
		url:'/api/getbanner',
	})
}
//图片路径
const  imgUrl=(data)=>{
	data.forEach(item=>{
		let index=item.img.indexOf(baseUrl)
		if(index==-1){
			item.img=baseUrl+item.img
		}
	})
	return data
}
//秒杀
const getSkill=()=>{
	return http({
		url:'/api/getseckill'
	})
}
const getIndexGoods=()=>{
	return http({
		url:'/api/getindexgoods',
	})
}

const getCates=()=>{
	return http({
		url:'/api/getcates'
	})
}
const getGoodsByCateId=(data={})=>{
	return http({
		url:'/api/getcategoodPage',
		data
	})
}
const getSearch=(data)=>{
	return http({
		url:"/api/search",
		data
	})
}
const getGoodsById=(data)=>{
	return http({
		url:'/api/getgoodsinfo',
		data
	})
}
const getToken=(data)=>{
	return http({
		url:"/api/auth",
		data
	})
}
export default {
	getNav,
	getBanner,
	imgUrl,
	getSkill,
	getIndexGoods,
	getCates,
	getGoodsByCateId,
	getSearch,
	getGoodsById,
	getToken
}