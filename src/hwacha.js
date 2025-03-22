// Hello, world
console.debug("Hwacha CIWS Online");

// Empty init
var USER = "";
var USER_AGENT = "";
var USER_URL = "";

// https://www.nationstates.net/page=blank?display=hwacha&template-overall=none
// Will require script generation tags according to NS rules
// window.open("nation=volstrostia", '_blank').focus();

/* 
 * On launch, go to our launch control center
 * Initialize IFF system a-la Brimstone (maybe add config parser just to be a dick)
 * Once at launch control center, subscribe to SSE and poll WA
 * Cross-reference inbound nations with WA global membership
 * Compile list of approved targets
 * Spacebar opens random approved target page
 * Pressing space on target page launches ban and closes tab
 * This allows spamming space to select and ban targets
 * Also,
 * FUCK EVERYONE INVOLVED IN THE MURDER OF HTML-BASED SCRIPTS
 */

// We are on the Hwacha control panel
if (document.location.href.includes("page=blank?program=hwacha")) { 
	// Launch the control panel system
	initialize_control_panel();

	document.addEventListener('keyup', function (event) {
		if (event.code == 'Space') { 
			let target = document.getElementsByTagName("a")[0];
			target.remove();
			window.open(target, "_blank");
		}
	});
}

// We are on a target nation
else if (document.location.href.includes("hwacha-target=true")) { 
	console.debug("Found target nation");
	let ban_button = document.getElementsByName("ban")[0];
	if (ban_button) { 
		let warning = document.createElement('div');
		warning.innerHTML = '<center><b style="color:red">HWACHA HAS LOCKED ONTO THIS TARGET, PRESS SPACE TO FIRE ROCKETS</b></center>';
		document.body.prepend(warning);

		// Install event listener to ban target and return to caller
		document.addEventListener('keyup', function (event) {
			// Click ban button when spacebar is lifted
			if (event.code == 'Space') {
				//ban_button.click();
				console.debug("Boop!");
				// Pass message to background script to shift browser focus
				browser.runtime.sendMessage({
					"hwacha": "radar_view"
				}).then(() => {
					console.log("Focus request sent");
				});
			}
		});
	} else { 
		// No ban button? Useless, close the tab
		//window.close();
	}
}

// We are on a random page
else { 
	// If this isn't a freshly opened target (no sneaky bypasses by setting motto to
	// "is already on the ban list.") and we have a status message from a ban attempt,
	// close the window - we don't need to dwell on the past (ban attempts)
	let textcontent = document.body.textContent;
	if (
		!document.location.href.includes("hwatcha-target")
		&& (textcontent.includes("has been ejected and banned")
		|| textcontent.includes("heavy nation-shifting assets are currently deployed")
		|| textcontent.includes("don't have enough regional influence")
		|| (textcontent.includes("is already on the") && textcontent.includes("ban list."))
		|| textcontent.includes("You are not authorized to handle matters relating to Border Control"))
	) { 
		window.close();
	};

	let warning = document.createElement('div');
	warning.innerHTML = '<center><b>Hwacha is enabled! Click <a href="page=blank?program=hwacha&template-overall=none">here</a> to use it.</b></center>';
	document.body.prepend(warning)
}
