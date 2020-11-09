function loadJS(url, implementationCode){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element
    if(document.querySelector('script[src="'+url+'"]')==undefined){
      var scriptTag = document.createElement('script');
      scriptTag.src = url;
      document.head.appendChild(scriptTag);
      $('script[src="'+url+'"]').load(function(){
        document.querySelector('script[src="'+url+'"]').className="done";
        implementationCode();
      });
    }else if(document.querySelector('script[src="'+url+'"]').className!='done'){
      $('script[src="'+url+'"]').load(function(){
        implementationCode();
      });
    }else {
        implementationCode;
    }
}