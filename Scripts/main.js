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
		// email signup
		var $fm = $(".cmp-newsletterSignup"), 
			$a = $fm.find("a"),
			$i = $fm.find("input");

		$a.on("click", function(){
			if ($i.val()==""){
				$i.removeClass("invalid");
				return;
			}
			if (!validateEmail($i.val())){
				$i.addClass("invalid");
				return;	
			}
			$i.removeClass("invalid");
			$fm.addClass("invisible");
			$.ajax(
				{
					"url": "?altTemplate=NewsletterSignup",
					"dataType": "json",
					"type": "post",
					"data": { "email": $i.val() },
					"error": function(){
						alert("Sorry, there was an error submitting your email address.");
						$fm.removeClass("invisible");
					},
					"success": function(data){
						alert(data.message);
						$fm.removeClass("invisible");
						if (data.success){
							$i.removeClass("invalid").val("");
						}
					}
				})


		});

		function validateEmail(email) { 
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
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
