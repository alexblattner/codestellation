class EditorHolder extends HTMLElement {
	constructor(){
		super();
		this.links;
		this.portrait;
		this.content="";
		this.json={};
		this.locked=($(this).attr("lock")!=undefined)?true:false;
		this.type=(this.tagName.split("-").length==2&&!isNaN(this.tagName.split("-")[1]))?parseInt(this.tagName.split("-")[1]):'';
			if(IsJsonString($(this).html())){
			this.json=JSON.parse($(this).html());
			if(this.isTag()){
				this.content=this.json;
			}else{
				this.content=this.json.content;
				this.type=this.json.type;
			}
		}else if ($(this).html()!="") {
			this.content=$(this).html();
		}
		this.pre="";//you post type directory start here
		$(this).on("mouseenter",()=>{
			if($(this).find(".editor-holder-switcher").length==0&&this.tagName!='EDITOR-HOLDER'&&!this.locked){
				$(this).append('<div class="editor-holder-switcher">switch post type</div>');
			}
		});
		$(this).on("click",".editor-holder-switcher",()=>{
			this.outerHTML='<editor-holder></editor-holder>';
			$(this).trigger("change");
		});
	}
	connectedCallback() {
		if(this.tagName=='EDITOR-HOLDER'){
			//post selection here
		}
		this.style.display="block";
		this.style.position='relative';
		this.main();
	}
	main(){
	}
	isTag(){
		var name=this.tagName.toLowerCase();
		var s=name.split("-");
		if(s.length==2&&Number.isInteger(s[1])){
			this.type=parseInt(s[1]);
			return true;
		}else{
			return false;
		}
	}
	empty(){
		$(this).empty();
		if(this.locked){
			this.outerHTML="<editor-"+this.type+"></editor-"+this.type+">";
		}else{
			this.outerHTML="<editor-holder></editor-holder>";
		}
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
	loadJS(url,code){
		loadJS(this.pre+url,code);
	}
	loadCSS(url){
		if(!($("link[href='"+this.pre+url+"']").lenght))
		$("head").append('<link rel="stylesheet" href="'+this.pre+url+'">');
	}
	getURL(name){
		return this.pre+name;
	}
}
window.customElements.define("editor-holder", EditorHolder);