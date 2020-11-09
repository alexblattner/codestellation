class Editor4379 extends EditorHolder {
	constructor() {
		super();
		$(this).on("change","textarea",()=>{
			this.content=$(this).find("textarea").val().replace(/\n\r?/g, '<br />');
		});
	}
	main() {
		var text=this.content.replace('<br />','\n').replace('<br />',"\n");
		this.loadCSS("style.css");
    this.innerHTML=`
		<textarea autofocus placeholder="Write your thoughts here">${text}</textarea>
		`;
  }
}
window.customElements.define("editor-4379", Editor4379);
