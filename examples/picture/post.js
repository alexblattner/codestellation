class Post7829 extends PostContent {
	constructor() {
		super();
	}
	main() {
	    this.innerHTML=`
			<style>
			post-7829 img{
				max-width:100%;margin-left:auto;margin-right:auto;display:block;
			}
			</style>
			<img alt=" " src="${this.content}"/>
			`;
  }
}
window.customElements.define("post-7829", Post7829);
