class Editor84936 extends EditorHolder {
	constructor() {
		super();
		$(this).on("change","textarea:first-of-type",()=>{
			this.content.description=$(this).find("textarea:first-of-type").val().replace(/\n\r?/g, '<br />');
		});
		$(this).on("change","input:first-of-type",()=>{
			this.content.title=$(this).find("input:first-of-type").val();
		});
		$(this).on("change",()=>{
			var c=this.children;
			var inside=false;
			for (var i = 0; i < c.length; i++) {
				if(c[i].content!=undefined){
					this.content.content={name:c[i].tagName.toLowerCase().split('-')[1],"content":c[i].content};
					if(c[i].links!=undefined)
					this.links=c[i].links;
					i=c.length;
					inside=true;
				}
			}
			if(!inside)
			this.content.content={};
		});
	}
	main() {
		if(this.content=="")
		this.content={description:"",title:"",content:{}};
		this.loadCSS("style.css");
		var c=(this.content.content!={})?JSON.stringify(this.content.content.content):"";
		var h=(Object.entries(this.content.content).length>0)?"<editor-"+this.content.content.name+">"+c+"</editor-"+this.content.content.name+">":"<editor-holder>"+c+"</editor-holder>";
    this.innerHTML=`
		<div>Title:</div><input value="${this.content.title}" type="text" onchange="changert();"/>
		<div>Text:</div><textarea>${this.content.description}</textarea>
		<div>Content:</div>${h}
		`;
		$(this).css("padding","10px");
  }
}
window.customElements.define("editor-84936", Editor84936);
