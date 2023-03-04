// Background script to access Web APIs


browser.runtime.onInstalled.addListener(() => {
    console.log("Thank you for installing 'The Door'.");
});

browser.tabs.onUpdated.addListener(() => {
    console.log("loaded page");

    //TODO: communicate with content script to modify DOM
});


function listenForClicks() {
    document.addEventListener("click", (e) => {
  
        /**
         * Insert the page-hiding CSS into the active tab,
         * then get the beast URL and
         * send a "beastify" message to the content script in the active tab.
         */
        function showTheDoor(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "blockterfs",
                msg: "fuck them terfs"
            });
        }
    
        /**
         * Remove the page-hiding CSS from the active tab,
         * send a "reset" message to the content script in the active tab.
         */
        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            });
        }
    
        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not block terfs: ${error}`);
        }
    
        /**
         * Get the active tab and run function
         */
        if (e.target.type === "reset") {
            browser.tabs
            .query({ active: true, currentWindow: true })
            .then(reset)
            .catch(reportError);
        } else {
            browser.tabs
            .query({ active: true, currentWindow: true })
            .then(showTheDoor)
            .catch(reportError);
        }
    });
  }



/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}



/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/main.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);