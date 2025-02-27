// Hello, world
console.debug("Hwacha CIWS Online");

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
	initialize_control_panel();
}

// We are on a target nation
else if (document.location.href.includes("hwacha-target=true")) { 
	console.debug("Found target nation");
}

// We are on a random page
else { 
	let warning = document.createElement('div');
	warning.innerHTML = '<center><b>Hwacha is enabled! Click <a href="page=blank?program=hwacha&template-overall=none">here</a> to use it.</b></center>';
	document.body.prepend(warning)
}
