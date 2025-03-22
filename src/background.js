console.log("Hwacha background script online");

browser.runtime.onMessage.addListener(notify);

function switch_view(tabs) { 
	console.log("Switching focus to radar");
	for (const tab of tabs) { 
		if (tab.url.includes("page=blank?program=hwacha")) { 
			// Set focus
			browser.tabs.update(
				tab.id,
				{"active": true}
			);

			console.log(tab);
		}
	}
}

function on_error(error) { 
	console.warn(error);
}

function notify(message) {
	console.debug(message);
	if (message["hwacha"] == "radar_view") { 
		console.log("Got radar focus request");
		let tabs = browser.tabs.query({});
		tabs.then(switch_view, on_error);
	}
}
