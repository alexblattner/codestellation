class Editor287487 extends EditorHolder {
	constructor() {
		super();
		this.content={};
		var t=this;
		var th=$(this);
		$(this).on("click","#rvid",function(){
			var pic=(th.find("#smallcontainer .file").length)?`<input name="file" accept="image/*" class="file" type="file" /><div class="instructions"><img src="${t.pre}upload.png"/><p>Drag and drop a picture or click here to upload!</p></div>`:"<img src='"+th.find("#smallcontainer img").attr('src')+"'/>";
			th.find("#container").empty();
			var text=`<input name="file" id='videofile' class='file' type="file" accept="video/mp4,video/x-m4v,video/*"/><div class="instructions"><img src="${t.pre}upload_vid.png"/><p>Drag and drop a video or click here to upload!</p></div>
			<div id="right"><div id="smallcontainer">${pic}</div></div>`;
			th.find("#container").append(text);
			var json=t.content;
			var l=t.links;
			var index = l.indexOf(json['video']);
			if (index > -1) {
				l.splice(index, 1);
			}
			t.links=l;
			delete json['video'];
			t.content=json;
		});
		$(this).on("click","#rpic",function(){
			th.find("#smallcontainer").empty();
			th.find("#smallcontainer").append('<input name="file" accept="image/*" class="file" type="file" /><div class="instructions"><img src="'+t.pre+'upload.png"/><p>Drag and drop a picture or click here to upload!</p></div>');
			var json=t.content;
			var l=t.links;
			var index = l.indexOf(json['picture']);
			if (index > -1) {
				l.splice(index, 1);
			}
			t.links=l;
			delete json['picture'];
			t.content=json;
			t.portrait='';
		});
		$(this).on("change","#smallcontainer .file",function(){
			$(this).attr("name","thth");
			var file= $(this).val();
			var exts = ['jpeg','gif','bmp','png','jpg'];
			if ( file ) {
					var get_ext = file.split('.');
					get_ext = get_ext.reverse();
					if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
						file=$(this).prop("files")[0];
						var fd = new FormData();
						fd.append("file", file);
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/writers/uploadfile.php', true);
						xhr.upload.onprogress = function(e) {
						if (e.lengthComputable) {
						var percentComplete = parseInt((e.loaded / e.total) * 100);
						th.find("#smallcontainer").empty();
						th.find("#smallcontainer").append(percentComplete + '% uploaded');
						}
						};
						xhr.onerror = function () {
							console.log("** An error occurred during the transaction");
						};
						xhr.onload = function() {
						if (this.status == 200) {
							var data=this.response;
							t.portrait=data;
							t.content.image=data;
							th.find("#smallcontainer").empty();
							th.find("#smallcontainer").append("<img src='"+data+"'/>");
							var arr=[];
							arr.push(data);
							if(t.content['video']!=undefined)
							arr.push(json['video']);
							t.links=arr;
							if(t.content['video']!=undefined){
								th.find("#container video").attr("poster",json['image']);
							}
						}
						};
						xhr.send(fd);
					} else {
							$(this).val('');
					}
			}
		});
		$(this).on("change","#videofile",function(){
				$(this).attr("name","thth");
				var file= $(this).val();
					if ( file ) {
						var get_ext = file.split('.');
						get_ext = get_ext.reverse()[0].toLowerCase();
						file=$(this).prop("files")[0];
						var fd = new FormData();
						fd.append("file", file);
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/writers/uploadfile.php', true);
						var small=th.find("#smallcontainer").clone();
						xhr.upload.onprogress = function(e) {
						if (e.lengthComputable) {
							var percentComplete = parseInt((e.loaded / e.total) * 100);
							th.find("#container").empty();
							th.find("#container").append(percentComplete + '% uploaded');
						}
						};
						xhr.onload = function() {
						if (this.status == 200) {
							var data=this.response;
							var json=t.content;
							json['video']=data;
							t.content=json;
								var arr=[];
								arr.push(json['video']);
								if(json['image']!=undefined)
								arr.push(json['image']);
								t.links=arr;
								th.find("#container").empty();
								th.find("#container").append('<video controls><source src="'+data+'" type="video/'+get_ext+'"></video>');
								small.appendTo(th.find('#container'));
								if(json['image']!=undefined){
									th.find("#container video").attr("poster",json['image']);
								}
						}
						};
						xhr.send(fd)
					}
		});
	}
	main() {
    this.innerHTML=`
		<style>
editor-287487 .file{
	width:100%;height:100%;opacity: 0;position:absolute;
}
editor-287487 #container {
	width: 25vw;
	height: 20vw;
	border: 2px rgb(200, 200, 200) dashed;
	border-radius: 2px;
	position: relative;
	display: block;
	margin-right: auto;
	margin-left: auto;
}
editor-287487 textarea {
	width: 38vw;
	height: 17vw;
	resize: none;
	color: rgb(100, 100, 100);
	border: 1px solid rgb(200, 200, 200);
	border-radius: 2px;
	margin-top: 6vw;
	font-size: 10pt;
	position: absolute;
	font-family: Arial;
}
editor-287487 #title {
	width: 38vw;
	height: 4vw;
	border-radius: 2px;
	border: 1px rgb(200, 200, 200) solid;
	color: rgb(100, 100, 100);font-size: 10pt;
	position: absolute;font-family: Arial;
}
editor-287487 #right {
	position: absolute;
	left: 25vw;
	top: 0;
}
editor-287487 .instructions {
	margin-left: -75px;
	margin-top: -58px;
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
editor-287487 img{
	position: absolute;width:100%;height: 100%;border-style: none;border-radius:5px;background: rgb(240,240,240);
}
editor-287487 .instructions img {
height: 50px;
width: auto;
display: block;
position: relative;
left: 50%;
margin-left: -25px;
}
editor-287487 .instructions p{
	display: block;position: relative;
}
editor-287487 #smallcontainer {
	height: 10vw;
	position: absolute;
	width: 10vw;
	top:0;
	border: 2px rgb(200, 200, 200) dashed;
	right: 0;
}
editor-287487 video{
	width: 100%;height: 100%;
}
editor-287487 #bottom{
	position: relative;
	display: table;
	margin-right: auto;
	margin-left: auto;
}
		</style>
		<div id="container"><input name="file" id='videofile' class='file' type="file" accept="video/mp4,video/x-m4v,video/*"/><div class="instructions"><img src="${this.pre}upload_vid.png"/><p>Drag and drop a video or click here to upload!</p></div>
		<div id="right"><div id="smallcontainer"><input name="file" accept="image/*" class="file" type="file" /><div class="instructions"><img src="${this.pre}upload.png"/><p>Drag and drop a picture or click here to upload!</p></div></div></div></div>
		<div id='bottom'><button id="rvid" class="btn danger">Remove video</button><button id="rpic" class="btn danger">Remove portrait</button></div>
		`;
		if(this.content!=undefined){
			this.portrait=this.content.image;
			this.links=[];
			if(this.content.image!=undefined)
			this.links.push(this.content.image);
			if(this.content.video!=undefined)
			this.links.push(this.content.video);
			if(this.content.video!=undefined&&this.content.video!=""){
				var get_ext = this.content.video.split('.');
				get_ext = get_ext.reverse()[0].toLowerCase();
				$(this).find("#container").empty();
				$(this).find("#container").append('<video controls><source src="'+this.content.video+'" type="video/'+get_ext+'"></video>');
				if(this.content.image!=undefined&&this.content.image!=""){
					$(this).find("#smallcontainer").empty();
					$(this).find("#smallcontainer").append("<img src='"+this.content.image+"'/>")
					$(this).find("#container video").attr("poster",this.content.image);
				}
			}
		}
  }
}
window.customElements.define("editor-287487", Editor287487);
