class Post287487 extends PostContent {
	constructor() {
		super();
	}
	main() {
    this.innerHTML=`
		<style>
post-287487 video{
width:100%;left:0px;background:black;
}
		</style>
		`;
		if(this.content!=undefined){
			if(this.content.video!=undefined&&this.content.video!=""){
				var get_ext = this.content.video.split('.');
				get_ext = get_ext.reverse()[0].toLowerCase();
				$(this).append(`<video style="width:100%;left:0px;background:black;" controls="">
   <source src="${this.content.video}" type="video/${get_ext}">
</video>`);
        if(this.content.image!=undefined)
        $(this).find("video").attr("poster",this.content.image);
			}
		}
  }
}
window.customElements.define("post-287487", Post287487);
