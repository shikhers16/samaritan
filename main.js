/*
 * Copyright (c) 2014, 2016 Gonçalo Baltazar <me@goncalomb.com>
 * Samaritan is released under the terms of the MIT License,
 * check the file LICENSE.txt.
 */

$(document).ready(function() {
	// samaritan
	let $samaritan = $("#samaritan");
	let $samaritan_text = $("#samaritan .text");
	let $samaritan_line = $("#samaritan .line");
	let $samaritan_arrow = $("#samaritan .arrow");
	let $samaritan_message_box = $("#samaritan .message-box");
	let start = document.getElementById("typing-start");
	let mid = document.getElementById("vibrate");
	let end = document.getElementById("finish");
	start.load();
	mid.load();
	end.load();
	let samaritan = window.samaritan = { }
	let timeout = 0;
	let chance = 0.5;
	let completeMax = 7;
	let thinkTime = 1050;

	calculatingResponse = (text) => {
		$('#spinner').removeClass('hidden');
		samaritan.clear();
		$samaritan_text.text("Calculating Response");
		$samaritan_text.removeClass('hidden');
		setTimeout(function(){
			$('#spinner').addClass('hidden');
			samaritan.textAnimate(text);
		} , thinkTime);
	}
	//what are your commands ?
	function blink() {
		$('.blink').fadeOut(750).fadeIn(750);
	}
	
	function blink2() {
		$('.blink2').fadeOut(750).fadeIn(750);
	}
	
	function blink3() {
		$('.blink3').fadeOut(750).fadeIn(750);
	}
	function randomText(length){
		let text = "";
	
		for( let i=0; i < length; i++)
			text += String.fromCharCode(35 + Math.random()*91);
	
		return text;
	}
	function setScrambled(originalText){
		let complete = 0;
		let tmpText = randomText(originalText.length);
		let first = true;
		let id = setInterval(function () {
			for(let i = 0; i < originalText.length ; i++){
				if(originalText.charAt(i) != tmpText.charAt(i)){
					if(Math.random() < chance && complete > completeMax){
						tmpText = tmpText.substring(0 , i)+originalText.charAt(i)+tmpText.substring(i+1);
						complete = 0;
					} else {
						tmpText = tmpText.substring(0 , i)+randomText(1)+tmpText.substring(i+1);
						complete++;
					}
				}
				$samaritan_text.text(tmpText.replace(/_+/g, " "));
			}
			//setWord(tmpText , changeOffset , first , first);
			first = false;
			if(tmpText == originalText){
				clearInterval(id);
				//$samaritan_line.width($samaritan_text.width() + 10);
				//timeout = setTimeout(textAnimate_loop1, 100);
			}
	
		} , 15);
	}

	samaritan.clear = function(mode) {
		clearTimeout(timeout);
		$samaritan.removeClass("mode-text mode-text-black mode-message-box");
		$samaritan_text.text("-");
		$samaritan_line.css("width", "");
		$samaritan_arrow.removeClass("arrow-animation");
		$samaritan.addClass("mode-" + (mode ? mode : "text"))
	}

	samaritan.textAnimate = function(text) {
		this.clear("text");
		start.play();
		let parts = text.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ").split(" ");
		if (parts.length == 0 || (parts.length == 1 && parts[0] === "")) {
			console.log('loop');
			$samaritan_text.addClass("hidden").text("-");
			$samaritan_line.css("width", "");
			$samaritan_arrow.addClass("arrow-animation");
			return;
		}
		let i = 0;
		if(i == 0){
			if(i==0){
				console.log('start');
				setScrambled(parts[0])
				console.log('set');
			}
		}
		function textAnimate_loop0() {
			console.log('loop0');
				//playonpromis(start.play());
			$samaritan_text.addClass("hidden").text(parts[i].replace(/_+/g, " "));
			$samaritan_line.width($samaritan_text.width() + 10);
			timeout = setTimeout(textAnimate_loop1, 100);
			if (i%2 == 0 ) mid.play();
		}
		function textAnimate_loop1() {
			console.log('loop1');
			$samaritan_text.removeClass("hidden");
			if (++i < parts.length) {
				timeout = setTimeout(textAnimate_loop0, 400);
			} else {
				timeout = setTimeout(function() {
					$samaritan_text.addClass("hidden").text("-");
					$samaritan_line.css("width", "");
					$samaritan_arrow.addClass("arrow-animation");
				}, 400);
				end.play();
			}
		}
		timeout = setTimeout(textAnimate_loop0);
	}

	samaritan.textBlack = function(text) {
		this.clear("text-black");
		$samaritan_text.removeClass("hidden").text(text);
	}

	samaritan.showMessageBox = function(title, message) {
		this.clear("message-box");
		$samaritan_message_box.addClass("hidden");
		$(".message-box-title", $samaritan_message_box).text(title);
		$(".message-box-text", $samaritan_message_box).text(message ? message : "").append($("<span>").addClass("fast-flash").text("_"));
		setTimeout(function() {
			$samaritan_message_box.removeClass("hidden");
		}, 10);
	}

	samaritan.hideMessageBox = function(title, message) {
		if ($samaritan.hasClass("mode-message-box")) {
			$samaritan_message_box.addClass("hidden");
		}
		let self = this;
		setTimeout(function() {
			self.textAnimate("");
		}, 300);
	}

	samaritan.enlarge = function(text) {
		this.clear("text");
		$samaritan_text.addClass("hidden").text(text);
		$samaritan_line.width($samaritan_text.width() + 80);
		setTimeout(function() {
			$samaritan_text.removeClass("hidden");
		}, 200);
	}

	// other

	window.audioSetTimeEvents = function(audio, events) {
		$(audio).on("timeupdate", function() {
			for (let key in events) {
				if (this.currentTime > key) {
					if (typeof events[key] === "function") {
						events[key]();
					} else {
						let obj = (events[key][0] || window);
						obj[events[key][1]].apply(obj, events[key][2]);
					}
					delete events[key];
				}
			}
		});
	}

	window.audioStart = function(audio, time, fadein_time) {
		audio.currentTime = time;
		if (fadein_time) {
			audio.volume = 0;
			$(audio).on("timeupdate", function fn() {
				let dt = this.currentTime - time;
				if (dt < fadein_time) {
					this.volume = dt/fadein_time;
				} else {
					this.volume = 1;
					$(audio).off("timeupdate", fn);
				}
			});
		} else {
			audio.volume = 1;
		}
		audio.play();
	}

	window.tryPlayAudio = function(audio, time, fadein_time) {
		function doPlayAudio() {
			audioStart(audio, time, fadein_time);
			setTimeout(function() {
				if (audio.paused) {
					// mobile browser? we need user interaction
					$(document).click(function fn() {
						$(this).off("click", fn);
						showSubtitle(null);
						audio.play();
					});
					showSubtitle("(tap the screen)", -1);
				}
			}, 100);
		}
		if (audio.readyState == 4) {
			doPlayAudio()
		} else {
			$(audio).on("canplay", function fn() {
				$(this).off("canplay", fn);
				doPlayAudio();
			});
		}
	}

	window.showSubtitle = function(text, time) {
		let $subtitle = $("#subtitle");
		if (!text) {
			$subtitle.css("opacity", "0")
			return;
		}
		$subtitle.text("\"" + text + "\"");
		$subtitle.css("opacity", "");
		if (!time || time >= 0) {
			setTimeout(function() {
				showSubtitle(null);
			}, time || 1500);
		}
	}

});

/*
$(document).ready(function(){
	showSubtitle("(tap the screen)", -1);
	setTimeout(function() {
	showSubtitle('Hello Samaritan!')
	, 2000});
	setTimeout(function() {
	samaritan.textAnimate("HELLO SHIKHER, WHAT ARE YOUR COMMANDS?");
	}, 1500);
});
*/
reply = (text) => {
	text = text.toUpperCase();
	if (text.startsWith("HELLO") || text.startsWith("HI")){
		console.log('before');
		samaritan.textAnimate("HELLO! I AM SAMARITAN.");
		setTimeout(function() {
			samaritan.textAnimate("IDENTIFY YOURSELF.")
		}, 2500);
		console.log('after');
	}
	else if (text.includes("I AM")) {
		if(text.includes("SHEKHAR") || text.includes("SHIKHAR") || text.includes("SHIKHER")){
		setTimeout(function() {
			calculatingResponse("WHAT ARE YOUR COMMANDS ?")
			, 1500});
		}
		else{
			setTimeout(function() {
				calculatingResponse("YOU ARE NOT AUTHORIZED.")
			, 1500});
		}
	}
	else{
		setTimeout(function() {
			calculatingResponse("STOP IT NOW!")
		}, 2500);
	}
}

$( document ).ready(function (){
	setInterval(blink,500);
	setTimeout(function(){setInterval(blink2, 500)}, 500);
	setTimeout(function(){setInterval(blink3, 500)}, 1000);
	//setText(getParameter("msg"));
});

$(document).ready(function () {
	$(document).keypress("input", function(e){
        if(e.which == 13){
			let input = $("#say").val();
			console.log(input);
			document.getElementById('say').value = '';
			showSubtitle(input);
			reply(input);
		}
		else{
			$("#say").val(function() {
				console.log(e.key);
				return this.value + e.key;
			});
		}
		})
	});