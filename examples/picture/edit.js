class Editor7829 extends EditorHolder {
	constructor() {
		super();
		var th=this;
		var t=$(this);
		t.on("change","#file",function(){
			$(this).attr("name","thth");
			var file= $(this).val();
			var get_ext = file.split('.');
			get_ext = get_ext.reverse()[0].toLowerCase();
			file=$(this).prop("files")[0];
			var fd = new FormData();
			fd.append("file", file);
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/writers/uploadfile.php', true);
			if(t.find("#instructions").length==0)
			t.find("#container").append('<div id="instructions"></div>');
			xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				var percentComplete = parseInt((e.loaded / e.total) * 100);
				t.find("#instructions").empty();
				t.find("#instructions").append(percentComplete + '% uploaded');
			}
			};
			xhr.onload = function() {
				if (this.status == 200) {
					var data=this.response;
					th.content=data;
					th.portrait=data;
					th.links=[data];
						t.find("#instructions").remove();
						t.find('img').attr("src",data);
				}
			};
			xhr.send(fd);
		});
	}
	main() {
		var img='';
		if(this.content!=undefined){
			this.portrait=this.content;
			this.links=this.content;
			img=this.content;
		}
    this.innerHTML=`
		<style>
			editor-7829 #instructions {
			margin-left: -75px;
			margin-top: -70px;
			font-size: 12pt;
			color: rgb(120, 120, 120);
			width: 150px;
			text-align: center;
			font-family: Arial;
			position: absolute;
			pointer-events: none;
			left: 50%;
			top: 50%;
			}
						editor-7829 img{
							position: absolute;width:100%;height: 100%;border-style: none;border-radius:5px;background: rgb(240,240,240);
						}
			editor-7829 #instructions img {
			height: 50px;
			width: auto;
			display: block;
			position: relative;
			left: 50%;
			margin-left: -25px;
			}
			editor-7829 #instructions p{
				display: block;position: relative;
			}
			editor-7829 #file{
				width:100%;height:100%;opacity: 0;position:absolute;
			}
			editor-7829 #container {
	width: 25vw;
	height: 20vw;margin-right:auto;margin-left:auto;
	border: 2px rgb(200, 200, 200) dashed;
	border-radius: 2px;
	position: relative;
}
		</style>
		<div id="container"><img alt=" " src="${img}"/><input name="file" id='file' type="file" />${(img=="")?'<div id="instructions"><img src="'+this.pre+'upload.png"/><p>Drag and drop a picture or click here to upload!</p></div>':''}</div>
		`;
  }
}
window.customElements.define("editor-7829", Editor7829);
