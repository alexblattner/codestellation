class PostContent extends HTMLElement {
	constructor() {
		super();
		this.type=this.tagName.split("-")[1];
		if(IsJsonString($(this).html())){
			this.content=JSON.parse($(this).html());
		}else{
			this.content=$(this).html();
		}
		var type=this.type;
		this.pre="";//the start of directory of post type
	}
	preSet(key){
		return (document.querySelector("main-container").env=="dev")?"/post-types/dev-"+key+"/":((document.querySelector("main-container").env=="approve")?"/post-types/new-"+key+"/":"/post-types/"+key+"/");
	}
	connectedCallback(){
		$(this).empty();
			this.main();
	}
	loadPost(name){
		var pre=(document.querySelector("main-container").env=="dev")?"/post-types/dev-"+name+"/":((document.querySelector("main-container").env=="approve")?"/post-types/new-"+name+"/":"/post-types/"+name+"/");
		loadJS(pre+"post.js");
	}
	main(){

	}
	loadJS(url,exec){
		loadJS(this.pre+url,exec);
	}
	loadCSS(url){
		if(!($("link[href='"+this.pre+url+"']").lenght))
		$("head").append('<link rel="stylesheet" href="'+this.pre+url+'">');
	}
	loadImg(name){
		if(!Array.isArray(name)){
			var img=new Image();
			img.src=this.pre+name;
		}else {
			for (var i = 0; i < name.length; i++) {
				var img=new Image();
				img.src=this.pre+name[i];
			}
		}
	}
	getURL(name){
		return this.pre+name;
	}
}
window.customElements.define("post-content",PostContent);