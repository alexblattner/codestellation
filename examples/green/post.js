class Post84936 extends PostContent {
	constructor() {
		super();
		$(this).on("click",".content",function(){
			if($(this).hasClass("pic"))
			$(this).removeClass("pic");
			else
			$(this).addClass("pic");
		});
	}
	main() {
		this.loadCSS("style.css");
		var arr=this.content.description.split("<br>");
		var f="";
		for(var i=0;i<arr.length;i++){
			if(arr[i].substring(0,4)=="&gt;")
			f+="<span style='color:green;margin-left:20px;'>"+arr[i]+"</span><br/>";
			else
			f+="<span style='color:black;margin-left:20px;'>"+arr[i]+"</span><br/>";
		}
		var c=(Object.entries(this.content.content).length>0)?((Array.isArray(this.content.content.content)||(typeof this.content.content.content === 'object' && this.content.content.content !== null))?JSON.stringify(this.content.content.content):this.content.content.content):"";
		var p=(Object.entries(this.content.content).length>0)?"<post-"+this.content.content.name+" class='pic content'>"+c+"</post-"+this.content.content.name+">":"";
		if(p!="")
		this.loadPost(this.content.content.name);
    this.innerHTML=`
		<p id="title">${(this.content.title)?this.content.title:""}</p>
		${p}
	<blockquote>${f}</blockquote>
		`;
  }
}
window.customElements.define("post-84936", Post84936);
