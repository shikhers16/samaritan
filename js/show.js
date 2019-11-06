$(document).ready(function() {
    $(document.body).on("selectstart", function() {
        return false;
    });

    let audio0 = $("#audio0")[0];
    let audio1 = $("#audio1")[0];

    audioSetTimeEvents(audio0, {
        "5": [null, "showSubtitle", ["Receiving the government feeds now, sir.", 2500]],
        "8.1": [null, "showSubtitle", ["Then", 800]],
        "9.4": [null, "showSubtitle", ["by all means,", 1000]],
        "11": [null, "showSubtitle", ["let there be", 1000]],
        "12.5": [null, "showSubtitle", ["life.", 500]],
        "13.2": [samaritan, "showMessageBox", ["TOTAL ACCESS ACHIEVED"]],
        "13.5": function() {
            document.title = "Samaritan 1.0";
        },
        "15": [samaritan, "showMessageBox", ["TOTAL ACCESS ACHIEVED", "ASSIMILATING DATA"]],
        "24": [samaritan, "showMessageBox", ["TOTAL ACCESS ACHIEVED", "DATA ACQUISITION"]],
        "25": function() {
            tryPlayAudio(audio1, 0, 5);
        }
    });
    audioSetTimeEvents(audio1, {
        "11": [samaritan, "hideMessageBox"],
        "14": [null, "showSubtitle", ["Good morning."]],
        "17": [samaritan, "textAnimate", ["WHAT ARE YOUR COMMANDS ?"]],
        "20": [null, "showSubtitle", ["I assure you, it's quite the other way around.", 2000]],
        "23": [null, "showSubtitle", ["The question is, what,"]],
        "25": [null, "showSubtitle", ["my dear Samaritan,"]],
        "27": [null, "showSubtitle", ["are your commands for us?", 3000]],
        "31": [samaritan, "enlarge", ["CALCULATING RESPONSE"]],
        "40": function() {
            $("#subtitle").css("display", "none");
            $("#info").css("display", "");
            setTimeout(function() {
                $("#info").css("opacity", "1");
            }, 100);
            setTimeout(playEasterEgg, 10000);
        }
    });
    tryPlayAudio(audio0, 0, 5);

    function playEasterEgg() {
        samaritan.textAnimate("");
        $("#info").css("opacity", "0");
        setTimeout(function() {
            $(document.body).removeClass("color-invert");
        }, 2000);
        setTimeout(function() {
            samaritan.textAnimate("I WILL PROTECT YOU NOW");
        }, 5000);
        setTimeout(function() {
            $("#info").css("opacity", "1").children(":first").remove();
        }, 12000);
    }

    setTimeout(function() {
        samaritan.textBlack("CONNECTION ESTABLISHED");
    }, 3000);
});