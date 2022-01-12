const defaultLang = "en";
let currentLang = "he";
let currentTranslation = {};
let currentActiveTab = "";
const rtlLanguages = ["ar", "he"];

// edit this variable to add support for more languages
const translations = {
    en: {
        "name": "English",
        "page-title": "My multilingual page",
        "nav-title": "Multilingual page",
        "nav-subtitle": "Read in your favorite language",
        "tabs-header": "What would you like to read today?",
        "tab-a": "Greet",
        "tab-a-content": "Hello world!",
        "tab-b": "World News",
        "tab-b-content": "The pandemic is still going on",
        "tab-c": "Say Goodbye",
        "tab-c-content": "Bye! see you later",
        "made-by": "made by Liel Ben-Or",
        "code-on": "code on",
        "github": "github"
    },
    fr: {
        "name": "French",
        "page-title": "Mon page multilingue",
        "nav-title": "page multilingue",
        "nav-subtitle": "lire dans votre langue préférée",
        "tabs-header": "Qu'aimeriez-vous lire aujourd'hui?",
        "tab-a": "Saluer",
        "tab-a-content": "Bonjour le monde!",
        "tab-b": "des nouvelles",
        "tab-b-content": "La pandémie continue",
        "tab-c": "au revoir",
        "tab-c-content": "À plus tard!",
        "made-by": "faite par Liel Ben-Or",
        "code-on": "code dans",
        "github": "github"
    },
    he: {
        "name": "Hebrew",
        "page-title": "העמוד מרובה-השפות שלי",
        "nav-title": "עמוד מרובה שפות",
        "nav-subtitle": "תקרא בשפה האהובה עליך",
        "tabs-header": "מה תרצו לקרוא היום?",
        "tab-a": "שלום",
        "tab-a-content": "שלום עולם!",
        "tab-b": "חדשות",
        "tab-b-content": "מגיפת הקורונה עדיין ממשיכה",
        "tab-c": "להתראות",
        "tab-c-content": "ביי ביי!",
        "made-by": "הוכן ע\"י ליאל בן-אור",
        "code-on": "הקוד זמין ב",
        "github": "גיטהאב"
    },

};

// populates language dropdown with clickable buttons that set the current page language
function initializeLanguageDropdown() {

    // create a dropdown option for each language supported
    const options = [];
    for (const language in translations) {
        const option = document.createElement("option");
        option.value = language;
        option.innerText = translations[language]["name"];
        option.style = ""
        if (language === currentLang) {
            option.selected = true;
        }
        options.push(option);

    }

    // add every option to the dropdown
    const select = document.querySelector("#languages");
    options.map( option => select.appendChild(option) )

    // update locale when an option is selected
    select.addEventListener("change", () => {
        const language = select.value;
        setLocale(language);
    });
}

// registers the tabs to be clickable
function initializeTabs() {
    // register clicks on tab headers
    let tabs = document.getElementById("tabs").children;
    for (let i = 0; i < tabs.length; i++) {
        let activeTab = tabs[i];
        if ( !currentActiveTab ) {
            currentActiveTab = activeTab;
        }
        activeTab.addEventListener("click", () => {
            // remove active from all other tabs
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove("active");
            }
            
            activeTab.classList.toggle("active");

            // remember what is the active tab
            currentActiveTab = activeTab;

            loadTabContent();
        });
    }
    loadTabContent();
}

// will change the content displayed based on which tab is selected(active)
function loadTabContent() {
    const tabType = currentActiveTab.getAttribute("data-translation-key");
    const innerTextVal = currentTranslation[tabType + "-content"];
    const content = document.querySelector("#content");
    content.innerText = innerTextVal;

    // re-run animation for the content of this tab
    content.classList.remove("appear");
    void content.offsetWidth;
    content.classList.add("appear");
}

// sets the locale(language) the page is rendered in
function setLocale(language) {
    if (language === currentLang) return;

    currentTranslation = translations[language];
    currentLang = language;

    localStorage.setItem("language", language); // insensitive information, OK to save in localstorage

    if (rtlLanguages.includes(language)) {
        // the page should render rtl for this language
        document.documentElement.dir = "rtl";
    } else {
        // the page should render ltr
        document.documentElement.dir = "ltr";
    }

    loadTabContent();
    translatePage();

}

// renders the current language for all translateable elements in the page
function translatePage() {
    currentTranslation = translations[currentLang];
    
    const translatedElements = document.querySelectorAll(
        "[data-translation-key]"
    );

    for (let i = 0; i < translatedElements.length; i++) {
        const element = translatedElements[i];
        const translationKey = element.getAttribute("data-translation-key");
        const translated = currentTranslation[translationKey];
        element.innerText = translated;
    }

    if (rtlLanguages.includes(currentLang)) {
        // the page should render rtl for this language
        document.documentElement.dir = "rtl";
    } else {
        // the page should render ltr
        document.documentElement.dir = "ltr";
    }
}

window.onload = () => {
    currentLang = localStorage.getItem("language") || defaultLang;
    currentTranslation = translations[currentLang];
    initializeTabs();
    initializeLanguageDropdown();
    setLocale(currentLang);
    translatePage();

};
