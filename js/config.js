	/*
	Miniport 2.5 by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// window._skel_config = {
// 	preset: 'standard',
// 	prefix: 'css/style',
// 	resetCSS: true,
// 	breakpoints: {
// 		'desktop': {
// 			grid: {
// 				gutters: 50
// 			}
// 		}, 
// 		'1000px': {
// 			containers: "80%"
// 		}
// 	}
// };

jQuery(function() {

	jQuery.fn.n33_formerize = function() {
		var _fakes = new Array(),
			_form = jQuery(this);
		_form.find('input[type=text],textarea').each(function() {
			var e = jQuery(this);
			if (e.val() == '' || e.val() == e.attr('placeholder')) {
				e.addClass('formerize-placeholder');
				e.val(e.attr('placeholder'));
			}
		}).blur(function() {
			var e = jQuery(this);
			if (e.attr('name').match(/_fakeformerizefield$/)) return;
			if (e.val() == '') {
				e.addClass('formerize-placeholder');
				e.val(e.attr('placeholder'));
			}
		}).focus(function() {
			var e = jQuery(this);
			if (e.attr('name').match(/_fakeformerizefield$/)) return;
			if (e.val() == e.attr('placeholder')) {
				e.removeClass('formerize-placeholder');
				e.val('');
			}
		});
		_form.find('input[type=password]').each(function() {
			var e = jQuery(this);
			var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
			if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield');
			if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield');
			x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e);
			if (e.val() == '') e.hide();
			else x.hide();
			e.blur(function(event) {
				event.preventDefault();
				var e = jQuery(this);
				var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
				if (e.val() == '') {
					e.hide();
					x.show();
				}
			});
			x.focus(function(event) {
				event.preventDefault();
				var x = jQuery(this);
				var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']');
				x.hide();
				e.show().focus();
			});
			x.keypress(function(event) {
				event.preventDefault();
				x.val('');
			});
		});
		_form.submit(function() {
			jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) {
				var e = jQuery(this);
				if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', '');
				if (e.val() == e.attr('placeholder')) {
					e.removeClass('formerize-placeholder');
					e.val('');
				}
			});
		}).bind("reset", function(event) {
			event.preventDefault();
			jQuery(this).find('select').val(jQuery('option:first').val());
			jQuery(this).find('input,textarea').each(function() {
				var e = jQuery(this);
				var x;
				e.removeClass('formerize-placeholder');
				switch (this.type) {
					case 'submit':
					case 'reset':
						break;
					case 'password':
						e.val(e.attr('defaultValue'));
						x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
						if (e.val() == '') {
							e.hide();
							x.show();
						} else {
							e.show();
							x.hide();
						}
						break;
					case 'checkbox':
					case 'radio':
						e.attr('checked', e.attr('defaultValue'));
						break;
					case 'text':
					case 'textarea':
						e.val(e.attr('defaultValue'));
						if (e.val() == '') {
							e.addClass('formerize-placeholder');
							e.val(e.attr('placeholder'));
						}
						break;
					default:
						e.val(e.attr('defaultValue'));
						break;
				}
			});
			window.setTimeout(function() {
				for (x in _fakes) _fakes[x].trigger('formerize_sync');
			}, 10);
		});
		return _form;
	};
	jQuery.browser = {};
	(function() {
		jQuery.browser.msie = false;
		jQuery.browser.version = 0;
		if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
			jQuery.browser.msie = true;
			jQuery.browser.version = RegExp.$1;
		}
	})();
	var	_bh = jQuery('body, html'),
		_window = jQuery(window),
		_nav = jQuery('#nav');

	// Forms
		if (jQuery.browser.msie && jQuery.browser.version <= 9)
			jQuery('form').n33_formerize();

	jQuery('form .form-button-submit').click(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'post',
			url: 'contactform/contactscript.php',
			data: $('form').serialize(),
			success: function() {
				$(".formconfirmation").height($(".formcontainer").height());
				$(".formconfirmation").width($(".formcontainer").width());
				$(".formcontainer").addClass("transparent");
				$(".formconfirmation").removeClass("transparent");
				window.setTimeout(function() {
					$('form')[0].reset();
					$(".formcontainer").removeClass("transparent");
					$(".formconfirmation").addClass("transparent");
				}, 2000)
			}
		});
		// jQuery(this).closest('form').submit();

	});
		jQuery('form .form-button-reset').click(function(e) { e.preventDefault(); jQuery(this).closest('form')[0].reset(); });
	
	// Links
		var navItems = $("nav li").children();
		var arrNav = [];
		for (var i = 0, l = navItems.length; i < l; i++) {
			arrNav.push($(navItems[i]).attr('href'));
		}
		var scrollThreshold = $(window).height()/3;

		jQuery('a').click(function(e) {
			var t = jQuery(this), h = t.attr('href'), article;

			if (h && h.charAt(0) == '#' && h.length > 1 && (article = jQuery('article#' + h.substring(1))).length > 0)
			{
				var pos = Math.max(article.parent().offset().top - _nav.height() + 15, 0);
				e.preventDefault();
				if (jQuery(".toggle-topbar").hasClass("expanded")) jQuery(".toggle-topbar, .top-bar-section, .logo").removeClass("expanded");
				_bh.animate({ scrollTop: pos }, 'slow', 'swing');
			}
		});

		jQuery(".toggle-topbar").click(function(e) {
			// jQuery(this).toggleClass("expanded");
			jQuery(".toggle-topbar, .top-bar-section, .logo").toggleClass("expanded");
		})

		jQuery(window).scroll(function() {
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();
			var curActive = $(".nav-active");
			var logo = $("#nav .logo");
			var logoThreshold = $(".intro").offset().top - $("#nav").height() * 2;

			if(windowPos > logoThreshold) {
				if (logo.hasClass("big") || !logo.hasClass("small")) {
					logo.removeClass("big").addClass("small");
				}
			} else {
				logo.removeClass("small").addClass("big");
			}

			for (var i = 0, l = arrNav.length; i < l; i++) {
				var theID = arrNav[i];
				var divPos = $(theID).offset().top; // get the offset of the div from the top of page
				var divHeight = $(theID).height(); // get the height of the div in question
				if (windowPos >= divPos - scrollThreshold && windowPos < (divPos + divHeight) - scrollThreshold) {
					var cur = $("a[href='" + theID + "']");
					if (theID != curActive.attr("href")) {
						curActive.removeClass("nav-active");
						cur.addClass("nav-active");
						break;
					}
					// $("a[href='" + theID + "']").addClass("nav-active");
				} 
				// else {
				// 	$("a[href='" + theID + "']").removeClass("nav-active");
				// }
			}

			if (windowPos + windowHeight == docHeight) {
				if (!$("nav li:last-child a").hasClass("nav-active")) {
					var navActiveCurrent = $(".nav-active").attr("href");
					$("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
					$("nav li:last-child a").addClass("nav-active");
				}
			}
		});
	$(window).scroll();

	// $('.flexslider').flexslider({
	// 	animation: "slide",
	// 	directionNav: true,
	// 	controlNav: false,
	// 	pauseOnAction: true,
	// 	pauseOnHover: true,
	// 	direction: "horizontal",
	// 	slideshowSpeed: 5500
	// });
});

