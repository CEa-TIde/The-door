// Background script to access Web APIs

browser.runtime.onInstalled.addListener(() => {
    console.log("Thank you for installing 'The Door'.");
});

browser.tabs.onUpdated.addListener(() => {
    console.log("loaded page");

    //TODO: communicate with content script to modify DOM
});