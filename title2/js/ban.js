//$.banner({
//				animate:”slide|fade”,
//				autoPlay:true,
//				nextBtn:$(“#next”),
//				prevBtn:$(“#prev”)
//			})
+function($){
	$.fn.banner=function(selector,option){
		new Banner(selector,option);	//调用Banner
	}
	function Banner(selector,option){
		this.init(selector,option);
	}
	Banner.prototype={
		constructor:Banner,
		init:function(selector,option){
			this.ele=$(selector);
			this.nextBtn=option.nextBtn;
			this.prevBtn=option.prevBtn;
			this.animate=option.animate;
			this.auto=option.autoPlay;
			this.index=0;
			this.prevIndex=0;
			this.nextBtn.on("click",$.proxy(function(){this.changeIndex("next");}.bind(this),this))
			.on("click",$.proxy(this.animation,this));
			this.prevBtn.on("click",$.proxy(function(){this.changeIndex("prev");}.bind(this),this))
			.on("click",$.proxy(this.animation,this));
			
			if(this.auto){
				this.autoPlay();
				console.log(1);
			}
		},
		changeIndex:function(action){
            var turnList = {
                "prev":function(){
                	this.prevIndex=this.index;
                    if(this.index==0){
						this.index=this.ele.length-1;
					}else{
						this.index--;
					}
                }.bind(this),
                "next":function(){
                    this.prevIndex=this.index;
                   if(this.index==this.ele.length-1){
						this.index=0;
					}else{
						this.index++;
					}
                }.bind(this),
            }
            if(!(typeof turnList[action] == "function")) return 0;
            turnList[action]();
        },
		animation:function(){
            var animateList = {
                "slide":function(action){
                	this.ele
                	.css("z-index",1)
                	.end()
                	.eq(this.prevIndex)
                	.css("z-index",1)
                	.end()
					.eq(this.index)
					.css("z-index",2);
					if(this.prevIndex>this.index){
						this.ele.eq(this.index).slideUp("slow");
					}else{
						this.ele.eq(this.index).slideDown("slow");
					}
                }.bind(this),
                "fade":function(){
	                  this.ele
	                	.css("z-index",0)
	                	.end()
	                	.eq(this.prevIndex)
	                	.css("z-index",1)
	                	.end()
						.eq(this.index)
						.css("z-index",2);
						if(this.prevIndex>this.index){
							this.ele.eq(this.index).fadeOut("slow");
						}else{
							this.ele.eq(this.index).fadeIn("slow");
						}
                }.bind(this),
            }
            if(!(typeof animateList[this.animate] == "function")) return 0;
            animateList[this.animate]();
        },
        autoPlay:function(){
        	this.timer=setInterval(function(){
        		this.changeIndex("next");
			    this.animation();
        	}.bind(this),1000);
        }
	}
}(jQuery)
