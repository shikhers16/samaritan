// $(document).ready(function () {
//   send = (finalTranscript) => {
//     if (finalTranscript.length > 0) {
//       showSubtitle(finalTranscript);
//       reply(finalTranscript);
//       console.log(finalTranscript);
//     }

//   }
//   window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//   let finalTranscript = '';
//   let recognition = new window.SpeechRecognition();
//   recognition.interimResults = true;
//   recognition.maxAlternatives = 10;
//   recognition.continuous = true;
//   recognition.onresult = (event) => {
//     let interimTranscript = '';
//     for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
//       let transcript = event.results[i][0].transcript;
//       if (event.results[i].isFinal) {
//         finalTranscript += transcript;
//       } else {
//         interimTranscript += transcript;
//       }
//     }
//     //document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
//     recognition.stop();
//     $("#voice").html('<img src="images/microphone-32.png" alt="microphone">');
//     console.log('mic off');
//     send(finalTranscript);
//     finalTranscript = '';
//   }
//   $("#voice").click(() => {
//     console.log('mic on');
//     $("#voice").html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
//     recognition.start();
//   });
// });
// $.ajaxSetup({
//   cache: false
// });
$(document).ready(() => {
	send = (finalTranscript) => {
		if (finalTranscript.length > 0) {
			showSubtitle(finalTranscript);
			talk(finalTranscript);
			console.log(finalTranscript);
		}

	}
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	let finalTranscript = '';
	let recognition = new window.SpeechRecognition();
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	recognition.continuous = false;
	recognition.onresult = (event) => {
		let last = event.results.length - 1;
		let finalTranscript = event.results[last][0].transcript;
		// recognition.stop();
		send(finalTranscript);
		finalTranscript = '';
	}
	recognition.onerror = function (event) {
		diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
	}
	recognition.onspeechend = function stopit() {
		recognition.stop();
		console.log('mic off');
		$("#voice").html('<img src="images/microphone-32.png" alt="microphone">');
	}
	$("#voice").click(() => {
		console.log('mic on');
		// $("#voice").html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
		recognition.start();
		setTimeout(() => {
			$("#voice").html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>')
		}
			, 1000);
	});
});
$.ajaxSetup({
	cache: false
});

$(document).ready(() => {
	let synth = window.speechSynthesis;
	const speak = (text, pitch, rate) => {
		let utterThis = new SpeechSynthesisUtterance(text);
		utterThis.pitch = pitch;
		utterThis.rate = rate;
		synth.speak(utterThis);
		utterThis.onpause = function (event) {
			let char = event.utterance.text.charAt(event.charIndex);
			console.log('Speech paused at character ' + event.charIndex + ' of "' +
				event.utterance.text + '", which is "' + char + '".');
		}
		text.blur();
	}
})