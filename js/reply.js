send = (text, wait, timeout) => {
    if(wait>0){
    setTimeout(function() {
        calculatingResponse(text)
        }, timeout);
    }
    else{
        setTimeout(function() {
            samaritan.textAnimate(text)
        }, timeout);
    }
}
reply = (text) => {
	text = text.toUpperCase();
	if (text.startsWith("HELLO") || text.startsWith("HI")){
		console.log('before');
		samaritan.textAnimate("HELLO! I AM SAMARITAN.");
            setTimeout(function() {
                console.log('here')
                samaritan.textAnimate("IDENTIFY YOURSELF.")
            }, 2500);
		console.log('after');
	}
	else if (text.includes("I AM")) {
		if(text.includes("SHEKHAR") || text.includes("SHIKHAR") || text.includes("SHIKHER")){
		setTimeout(function() {
			samaritan.textAnimate("WHAT ARE YOUR COMMANDS ?")
			, 1500});
		}
		else{
			setTimeout(function() {
				calculatingResponse("YOU ARE NOT AUTHORIZED.")
			, 1500});
		}
    }
    else if (text.includes("I AM")){

    }
	else{
		setTimeout(function() {
			calculatingResponse("STOP IT NOW!")
		}, 1500);
	}
}

export default reply, send ;