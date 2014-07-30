require.config({
  paths: {
	"jquery": "vendor/jquery-1.10.1.min",//"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
  }
});

require(["jquery"], function() {
	$(function(){

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

		// content tiles
		if ($(".cmp-tile").length){
			require(["jquery","vendor/enquire.min"], function(){

				enquire.register("screen and (max-width:767px)", {
					match: function(){ 
						positionContentTiles(1);
					}
				});
				enquire.register("screen and (min-width:768px) and (max-width:1023px)", {
					match: function(){ 
						positionContentTiles(2);
					}
				});
				enquire.register("screen and (min-width:1024px)", {
					match: function(){ 
						positionContentTiles(3);
					}
				});
			});
		}



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

		function positionContentTiles(wd){
console.log(wd);
			var $el = $(".cmp-tile");
			var dbl = $el.is(".cmp-tile-smallTiles");
			if (dbl){
				wd*= 2;
			}
console.log(wd);
			var $li = $el.find("li"), gd = [], rw = 0;

			// add empty initial rows
			for (var i=0; i<=rw; i++){
				addGridRowData(i);	
			}

			for (var i=0;i<$li.length;i++){
				addToGrid( $li.eq(i) );
			}

			function addToGrid($liEl){
				var added = false;
				for (var y=0; y<=rw; y++){
					for (var x=0; x<wd; x++){
						//console.log(x+"<"+y+"<"+rw+"<"+(rw>y).toString());

						if (gd[y][x]==0 && (!$liEl.is(".cmp-tile-portrait") || ($liEl.is(".cmp-tile-portrait") && rw>y && gd[y+1][x]==0))){
							console.log(x+"<"+y);
							gd[y][x]=1;
							// if portrait fill row below
							if ($liEl.is(".cmp-tile-portrait")){
								if (y==rw){
									addGridRowData(++rw);
								}
								gd[y+1][x]=2;
							}

							$liEl.addClass("cmp-tile-x"+x).addClass("cmp-tile-y"+y).show();
							// break
							added = true;
							x = 1000;
							y = 1000;
						} 
					}
				}
				// add another row if not added
				if (!added){
					addGridRowData(++rw);
					addToGrid($liEl);
				}
			}

			function addGridRowData(y){
				gd[y] = [];
				for (var x=0; x<wd; x++){
					gd[y].push(0);
				}
			}
		}


	});
});

