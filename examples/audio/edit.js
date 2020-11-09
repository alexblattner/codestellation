class Editor857107 extends EditorHolder {
	constructor() {
		super();
		var th=$(this);
		var t=this;
		$(this).on("change","#file",function(){
			$(this).attr("name","file");
			var ext = $(this).val().split('.').reverse()[0].toLowerCase();//extension
			if(['ogg','mp3','wav'].includes(ext)){
			  var file=$(this).prop("files")[0];
			  var fd = new FormData();
			  fd.append("file", file);
			  var xhr = new XMLHttpRequest();
			  xhr.open('POST', '/writers/uploadfile.php', true);
			  xhr.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					th.find("#container span").remove();
				  th.find("#container").children().hide();
				  var percentComplete = (e.loaded / e.total) * 100;
				  th.find("#container").append('<span>'+percentComplete + '%</span>');
				}
			  };
			  xhr.onload = function() {
				if (this.status == 200) {
				  th.find("#container span").remove();
				  th.find("#container").hide();
				  th.append("<audio controls><source src='"+this.response+"' type='audio/"+ext+"'></audio><button class='btn btn-danger'>remove</button>");
				  t.content=this.response;
				  t.links=[this.response];
				}
			  };
			  xhr.send(fd);
			}
		  });
		  $(this).on("click",".btn",function(){
			th.find("#container").show();
			th.find("#container").children().show();
			th.find("audio").remove();
			$(this).remove();
			delete t.content;
			t.links=[];
		  });
	}
	main() {
		var text=this.content.replace('<br />','\n').replace('<br />',"\n");
		this.loadCSS("style.css");
		this.innerHTML=`
		<div id="container"><input accept=".mp3,audio/*" name="file" id="file" type="file">
		<div id="instructions"><img src="${this.pre}upload.png"><p>Drag and drop an audio file or click here to upload!</p></div></div>
		`;
		if(this.content!=""){
			$(this).find("#container").hide();
			$(this).append("<audio src='"+this.content+"' controls></audio><button class='btn btn-danger'>remove</button>");
		}
  }
}
window.customElements.define("editor-857107", Editor857107);