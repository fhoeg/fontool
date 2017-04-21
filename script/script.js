//Start function which runs when DOM is loaded ////////////////////////////////////////////////////
var fbInit = "Enter fallback fonts";
var fInit = "Enter your font here";
var infTgl = 1;
var newFont;
var fallbackFont;
var tContent;
var curLang;

$(document).ready(function(){
	tContent = "info.html";
	var getVal;
	$(".info").hide();
	$(".textarea").load(tContent);
	$(".fb_wrapper").hide();
	$(".langDrop").hide();
	$(".fb_toggle").hide();
	$("input.textfield").val(fInit);
	$(".fallback_input").val(fbInit);
	curLang = "English";
	$(window).scroll(function() {
    if ($(document).scrollTop() > 60) {
      //$("header").addClass("inDocked");
	    //$(".font_wrapper").addClass("fnDocked");
    } else {
      //$("header").removeClass("inDocked");
	    //$(".font_wrapper").removeClass("fnDocked");
    }
  });
	$("input.textfield").click(function(event) {
		getVal = $("input.textfield").val();
		if (getVal == fInit) {
			$(this).val("");
		}
	});
	$("input.textfield").focusout(function(event){
		getVal = $("input.textfield").val();
		if (getVal == "") {
			$(this).val(fInit);
		}
	});
	$("input.textfield").keypress(function(event) {
		if ( event.which == 13 ) {
			getVal = $("input.textfield").val();
			if(getVal == "") {
				//alert("true");
				$(this).val(fInit);
			} else {
				$(".toggle_btn").addClass("tgg_inactive");
				$(".toggle_btn").removeClass("tgg_active");
				tContent = curLang;
				$(".textarea").load(tContent + ".html");
				bState = 0;
				update(event, 0);
			}
		}
	});
	$("input.textfield").keyup(function(event) {
		if (event.which == 27) {
			$(this).val("");
		}
	});
	var bState = 0;
	$(".toggle_btn").click(function(event) {

		if(bState == 0) {
			bState = 1;
			$(".toggle_btn").addClass("tgg_active");
			$(".toggle_btn").removeClass("tgg_inactive");
			$(".font_wrapper").hide();
			$(".fb_wrapper").show();
			fallback(event, 1);

		} else if (bState == 1) {
			bState = 0;
			$(".toggle_btn").addClass("tgg_inactive");
			$(".toggle_btn").removeClass("tgg_active");
			$(".font_wrapper").show();
			$(".fb_wrapper").hide();
			fallback(event, 0);
		}
	});

	$(".info").click(function(event){
		var info = "info.html";
		if(infTgl == 0) {
			$(".textarea").load(info);
			$(".info").text("x");
			infTgl = 1;
		} else if (infTgl = 1) {
			$(".textarea").load(tContent);
			$(".info").text("?");
			infTgl = 0;
		}
	});
	$(".fallback_input").keypress(function(event) {
		if ( event.which == 13 ) {
			getVal = $(".fallback_input").val();
			if(getVal == "") {
				//alert("true");
				$(this).val(fbInit);
				bState = 1;
				update(event, 1);
			} else {
				$(".toggle_btn").addClass("tgg_active");
				$(".toggle_btn").removeClass("tgg_inactive");
				bState = 1;
				$(this).blur();
				update(event, 1);
			}
		}
	});
	$(".fallback_input").click(function(event) {
		$(this).val("");
	});
	$(".fallback_input").focusout(function(event){
		getVal = $(".fallback_input").val();
		if (getVal == "") {
			$(this).val(fInit);
		}
	});
	$(".fallback_input").keyup(function(event) {
		if (event.which == 27) {
			$(this).val("");
		}
	});
	$(".lang_button").click(function(event) {
		langSet();
	});
	$("section.settings ul li.active").click(function(){
		langSet();
	});
});

function update(event, fallback) {
	//var thisFb = fb;
	/*getPos = $("input.textfield").position();
	if (getPos.top >= 0) {*/
	$("html").removeClass();
	$("input.textfield").blur();
	event.preventDefault();
	$(".fb_toggle").show(100);
	$(".langDrop").show(100);
	/*} else {
		event.preventDefault();
	}*/

	newFont = $("input.textfield").val();
	//alert(newFont);

// GOOGLE WEBFONTS CODE ///////////////////////////////////////////////////////////////////////////

	WebFontConfig = {
        google: { families: [

					newFont + ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic'

				]//,
				//urls: ['/fonts.css']
			},
        //typekit: { id: 'xxxxxx' }
        //Google API Documentation: https://developers.google.com/webfonts/docs/webfont_loader
				loading: function() {
					$(".feedback").css('color', "#ffffff");
					$(".feedback").text("loading…");
					$(".feedback").animate({opacity: 1}, 100);
				},
				active: function() {
					$(".feedback").css('color', "#99D948");
					$(".feedback").text(newFont + " successfully loaded");
					$(".feedback").animate({opacity: 0}, 2500);
				},
				inactive: function() {
					$(".feedback").css('color', "#8E1229");
					$(".feedback").text("loading of " + newFont + " failed");
					$(".feedback").animate({opacity: 0}, 2500);
				//	alert("nope");
			}
    };

    (function() {
    	var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

///////////////////////////////////////////////////////////////////////////////////////////////////

	$(".textarea").fadeTo(0, 0, function() {
		fallbackFont = $(".fallback_input").val();
		if(fallback == 0) {
			$(".textarea").css('font-family', newFont);
			$(".textarea").fadeTo(0, 1);
		} else if (fallback == 1) {

			if (fallbackFont == fbInit || fallbackFont == "") {
				$(".textarea").css('font-family', "sans-serif");
			} else {
				$(".textarea").css('font-family', fallbackFont);
			}
			$(".textarea").fadeTo(0, 1);
		}
	});
};

function fallback(event, fallback) {
	$(".textarea").fadeTo(0, 0, function() {
		//fallbackFont = $(".fallback_input").val();
		if(fallback == 0) {
			$(".textarea").css('font-family', newFont);
			$(".textarea").fadeTo(0, 1);
		} else if (fallback == 1) {

			if (fallbackFont == fbInit || fallbackFont == "") {
				$(".textarea").css('font-family', "sans-serif");
			} else {
				$(".textarea").css('font-family', fallbackFont);
			}
			$(".textarea").fadeTo(0, 1);
		}
	});
}

var infoState = 0;

var langListToggle = 0;
function langSet() {
	if (langListToggle == 0){
		langListToggle = 1;
		$(".language").css("overflow", "visible");
		$(".lang_button").removeClass("lang_closed");
		$(".lang_button").addClass("lang_open");
		$(".langDrop").addClass("open");

		$(".language li.item").click(function(){
			var newSample = $(this).html();
			curLang = newSample;
			var indicator = $(this).html().split("",3);
			$(".textarea").load(newSample + ".html");
			//alert(indicator[0] + indicator[1]);
			//$("section.settings ul.language li.active").html(newSample);
			$("ul.language li.active").text(indicator[0] + indicator[1] + indicator[2]);
			$(".language").css("overflow", "hidden");
			$(".lang_button").removeClass("lang_open");
			$(".lang_button").addClass("lang_closed");
			$(".langDrop").removeClass("open");
			langListToggle = 0;
		});
	} else {
		langListToggle = 0;
		$(".language").css("overflow", "hidden");
		$(".lang_button").removeClass("lang_open");
		$(".langDrop").removeClass("open");
		$(".lang_button").addClass("lang_closed");
	}
}

//AUTOCOMPLETE AND LOADING OF FONT LIST//

var googleApiKey = 'AIzaSyBdCYVLJ6nQoeXWzc3dxdI-5XGf4rP0kC8';

$(function() {
	var selectList = [];
	$.getJSON( "https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=" + googleApiKey, function( data ) {
			googleFontList = data.items;

			for (var i = 0 ; i <= data.items.length - 1; i++) {
				selectList.push(data.items[i].family);
			};

			return { id: 'google', text: 'Google Fonts' , children: selectList, disabled: true };
	})

  $( "input.textfield" ).autocomplete({
		minLength: 1,
		source: selectList,
		/*autoFocus: true,*/
		/*focus: function( event, ui ) {
			//Fix for bug on mouse select in autocomplete plugin//
			$(this).val(ui.item.value);
			$(this).on("click", valCheck );


			function valCheck() {
				$(".toggle_btn").addClass("tgg_inactive");
				$(".toggle_btn").removeClass("tgg_active");
				tContent = curLang;
				$(".textarea").load(tContent + ".html");
				bState = 0;
				update(event, 0);
			};
		},*/
		select: function( event, ui ) {
			//Fix for bug on mouse select in autocomplete plugin//
			$(this).val(ui.item.value);
			valCheck();

			function valCheck() {
				$(".toggle_btn").addClass("tgg_inactive");
				$(".toggle_btn").removeClass("tgg_active");
				tContent = curLang;
				$(".textarea").load(tContent + ".html");
				bState = 0;
				update(event, 0);
			};
		}
  });
});
