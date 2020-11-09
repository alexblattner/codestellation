class Post4379 extends PostContent {
	constructor() {
		super();
	}
	main() {
		this.loadJS('anchorme.js',()=>{
				var text="";
				var t=this.content.replace('<br />','\n').replace('<br />',"\n");
				t=anchorme({input: t});
				this.innerHTML=`
				<style>
				post-4379 span{
					font-family:IBMPlexSans, Arial, sans-serif;
				}
				@media only screen and (max-device-width: 600px) {
					post-4379 span{font-size: 25pt;}
				}
				</style>
				<span>${t}</span>
				`;
				$(this).find("a").attr("target","_blank");
		});
  }
}
window.customElements.define("post-4379", Post4379);
