class Post857107 extends PostContent {
	constructor() {
		super();
	}
	main() {
		this.innerHTML=`<audio style='width:100%' src='${this.content}' controls></audio>`;
	}
}
window.customElements.define("post-857107", Post857107);