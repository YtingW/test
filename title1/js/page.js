$(function(){
	function Page(url,selector){
	this.url=url;
	this.ele=$(selector);
	if(!(this.url&&this.ele)) return;
	this.init();
}
Page.prototype={
	constructor:Page,
	init(){
		this.loadData()
		.then(function(res){
			this.json=res.data.list;
			this.renderPage();
		}.bind(this));
	},
	loadData(){
		 var opt = {
                url:this.url,
                dataType:"jsonp",
                data:{page:this.page}
            }
        return $.ajax(opt);
	},
	renderPage(){
		var html="";
		this.json.forEach(function(item){
			html+=`
		<li>
			<img src="${item.image}"/>
			<p>${item.title.substring(0,10)}</p>
			<button data-id=${item.item_id}>加入购物车</button>
		</li>`
		});	
		this.ele.html(html);
	}
}
new Page("http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=106888&_=1526528205879","#list-ul");
})
