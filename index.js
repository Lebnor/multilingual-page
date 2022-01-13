(function() {

    let currentLang = localStorage.getItem("language") || navigator.language;
    let currentTab = "";
    
    // edit this constant to set more languages as rtl direction
    const rtlLanguages = ["ar", "he"];

    // edit this constant to add support for more languages
    const translations = {
        en: {
            name: "English",
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
            github: "github",
        },
        fr: {
            name: "French",
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
            github: "github",
        },
        he: {
            name: "Hebrew",
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
            github: "גיטהאב",
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
            option.style = "";
            if (language === currentLang) {
                option.selected = true;
            }
            options.push(option);
        }

        // add every option to the dropdown
        const select = document.querySelector("#languages");
        options.map((option) => select.appendChild(option));

        // update locale when an option is selected
        select.addEventListener("change", () => {
            const language = select.value;
            setPageLanguage(language);
        });
    }

    // registers the tabs to be clickable
    function initializeTabs() {
        // register clicks on tab headers
        let tabs = document.getElementById("tabs").children;
        for (let i = 0; i < tabs.length; i++) {
            let activeTab = tabs[i];
            activeTab.addEventListener("click", () => {
                // remove active from all other tabs
                for (let j = 0; j < tabs.length; j++) {
                    tabs[j].classList.remove("active");
                }

                activeTab.classList.toggle("active");

                // remember what is the current tab
                currentTab = activeTab;

                loadCurrentTabContent();
            });
        }
        loadCurrentTabContent();
    }

    // will change the content displayed based on which tab is selected(active)
    function loadCurrentTabContent() {
        if (!currentTab) {
            currentTab = document.querySelector("#tabs").children[0];
        }
        const tabType = currentTab.getAttribute("data-translation-key");
        const currentTranslation = translations[currentLang];
        const innerTextVal = currentTranslation[tabType + "-content"];
        const content = document.querySelector("#content");
        content.innerText = innerTextVal;

        // re-run animation for the content of this tab
        content.classList.remove("appear");
        void content.offsetWidth;
        content.classList.add("appear");
    }

    // sets the locale(language) the page is rendered in
    function setPageLanguage(language) {
        currentLang = language;
        const currentTranslation = translations[language];

        localStorage.setItem("language", language); // insensitive information, OK to save in localstorage

        if (rtlLanguages.includes(language)) {
            // the page should render rtl for this language
            document.documentElement.dir = "rtl";
        } else {
            // the page should render ltr
            document.documentElement.dir = "ltr";
        }

        loadCurrentTabContent();

        const translatedElements = document.querySelectorAll(
            "[data-translation-key]"
        );

        for (let i = 0; i < translatedElements.length; i++) {
            const element = translatedElements[i];
            const translationKey = element.getAttribute("data-translation-key");
            const translated = currentTranslation[translationKey];
            element.innerText = translated;
        }

        if (rtlLanguages.includes(language)) {
            // the page should render rtl for this language
            document.documentElement.dir = "rtl";
        } else {
            // the page should render ltr
            document.documentElement.dir = "ltr";
        }

    }

    window.onload = () => {
        const currentLang = localStorage.getItem("language") || navigator.language;
        initializeTabs();
        initializeLanguageDropdown();
        setPageLanguage(currentLang);
    };
})();
