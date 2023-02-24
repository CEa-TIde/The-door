// Main script file

// Allow for the shinigami eyes add-on to do its work and add the css classes before running the extension
var interval;
window.onload = _ => setTimeout(start, 200);

function start() {
    console.log("Starting blocking...");
    interval = setInterval(main, 5000);

}

function main() {
    console.log(interval);

    document.querySelectorAll("a.assigned-label-transphobic:not(.td-blocked)").forEach(x => {
        console.log(`Blocking url ${x}...`);
        // TODO: Actually block the user by using the tumblr api. (use the windows.tumblr.apiFetch() method?)
        x.classList.add(".td-blocked");
    });
}