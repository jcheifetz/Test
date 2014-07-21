require.config({
  paths: {
	"jquery": "vendor/jquery-1.10.1.min",//"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
  }
});

require(["jquery"], function() {
	$(function(){

		// lazy load images
		wrO.unveil();

		// menu
		$("a.cmp-show-nav").on("click", function(){
			var $a = $(this);
			var $m = $(".nav-1");
			$a.toggleClass("active");
			if ($a.hasClass("active")){
				$m.parent().show();
				$m.animate({left: "0"}, 250 
				);

			} else {

				$m.animate({left: "-260px"}, 250,
					function(){
						$m.parent().hide();
					});

			}


		});

		// if 2nd level nav add top padding to content
		if ($(".nav-2").length!=-1){
			$(".section-content").addClass("nav2Padding");
		}
	});
});

// window ready functionality / reusable in case of dynamic content loaded into page
var wrO = {
	unveil: function(){
		if ($("img.unveil").length!=0){
			require(["vendor/jquery.unveil.min"], function(){
				// don't load retina images for mobile
				// to conserve bandwidth
				// logo bg images still retina
				if (window.innerWidth<768){
					$("img.unveil:not(.allowMobileRetina)").each(function(i,e){
						e.setAttribute("data-src-retina","");
					});
				}
				$("img.unveil").removeClass("unveil").unveil();
			});	
		}
	}
}



// delay loading this functionality until window.load
var wlFn = function(){

}

if (document.readyState!="complete"){
	window.onload = function(){
		//wlFn();
	}
} else {
	//wlFn();
}
