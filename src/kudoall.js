// Internationalization support
let _intl;

try {
    _intl = window.chrome !== undefined ? chrome.i18n : browser.i18n;
} catch (err) {
    _intl = {
        getMessage: function (messageName, substitutions) {
            return substitutions || messageName;
        }
    };
}

function getMessage(messageName, substitutions) {
    return _intl.getMessage(messageName, substitutions);
}

// Retrieve or create the container for the Kudo All button
function getContainer() {
    let container = document.querySelector(".feed-header");

    if (!container) {
        container = document.querySelector(".feed-ui").parentElement.querySelector('form');
        container.style.justifyContent = "space-between";
        container.style.maxWidth = "100%";

        const el = document.createElement("div");
        el.classList.add("feed-header");
        el.style.cssText = "height: 40px; display: flex; justify-content: end;";
        container.append(el);
    } else {
        container.style.cssText = "display: flex; justify-content: space-between;";
    }

    return document.querySelector(".feed-header");
}

// Find all Kudos buttons within the specified container
function findKudosButtons(container) {
    const selector = "button[data-testid='kudos_button'] > svg[data-testid='unfilled_kudos']";
    return Array.from((container || document).querySelectorAll(selector));
}

// Create a filter to exclude activities from the current athlete
function createFilter(athleteLink) {
    const href = athleteLink.href.replace(/https:\/\/(www\.)?strava\.com/, "");
    return item => !item.querySelector(`a[href^="${href}"]`);
}

// Retrieve all Kudos buttons, excluding those for the current athlete's activities
function getKudosButtons() {
    const athleteLink = document.querySelector("#athlete-profile a[href^='/athletes']");
    if (!athleteLink) {
        return findKudosButtons();
    }

    let activities = document.querySelectorAll("div[data-testid='web-feed-entry']");
    if (activities.length === 0) {
        return findKudosButtons();
    }

    activities = Array.from(activities).filter(createFilter(athleteLink));
    return activities.length > 0 ? activities.flatMap(findKudosButtons).filter(Boolean) : [];
}

// Create the Kudo All button element
function createButton() {
    const label = getMessage("kudo_all", "Kudo All");
    const navItem = document.createElement("div");
    navItem.style.display = "flex";

    const style = `
        margin-top: 0;
        padding: 0.75rem 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        max-width: 200px;
        float: right;
    `;

    navItem.innerHTML = `
        <button type="button" class="btn btn-default btn-sm empty" style="${style}">
            <div class="app-icon icon-kudo" style="margin-right: 10px;">${label}</div>
            <div class="ka-progress text-caption1">${label}</div>
        </button>
    `;

    return navItem;
}

// Handle the Kudo All button click event
function kudoAllHandler(event) {
    event.preventDefault();

    const icons = getKudosButtons();
    icons.forEach(icon => {
        const parentButton = icon.parentElement;
        if (parentButton) {
            parentButton.click();
        }
    });
}

// Initialize the script after the window loads
window.onload = function () {
    const container = getContainer();
    if (container) {
        const button = createButton();
        container.append(button);
        button.addEventListener("click", kudoAllHandler);
    }
};

