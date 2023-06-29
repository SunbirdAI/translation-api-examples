const fetch = require("node-fetch");
const apiBaseUrl = process.env.SB_API_URL;
const preferences = require("./preferences");
require("dotenv").config();

const translation = async (user, text) => {

    // Get user preferences
    let prefs = await preferences.getPreferences(user);
    let sourceLanguage = prefs["source_language"];
    let targetLanguage = prefs["target_language"];

    let responseToUser = "";

    // When a user sends "menu", show them translation options to choose from,
    // store/update their preferences, or use them to translate the text they sent in
    if (text.toLowerCase() == "menu") {
        responseToUser = 
        `Hi. \n\nPlease choose which languages to translate to and from:
        1: English to Luganda
        2: Luganda to English`;
    // Option 1
    } else if (text == "1") {
        preferences.updatePreferences(user, sourceLanguage="English", targetLanguage="Luganda");
    // Option 2
    } else if (text == "2") {
        preferences.updatePreferences(user, sourceLanguage="Luganda", targetLanguage="English");
    // Any other text gets translated
    } else {
        responseToUser = await fetchTranslation(apiBaseUrl, text, sourceLanguage, targetLanguage);
    }

    console.log(responseToUser);
    return responseToUser;
}

async function fetchTranslation(apiBaseUrl, text, sourceLang, targetLang) {
    // Setting up the required parameters for the API request
    let modelEndpointUrl = `${apiBaseUrl}/tasks/translate`;
    let requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.SB_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "source_language": sourceLang,
            "target_language": targetLang,
            "text": text
        })
    };

    // Calling the API
    try {
        let response = await fetch(modelEndpointUrl, requestOptions);
        if (response.status == 200) {
            responseJson = await response.json();
            translatedText = responseJson["text"];
        }
        else {
            let errorMsg = `${response.status} ${response.statusText}`;
            console.log(errorMsg);
            throw new Error(errorMsg);
        };
    } catch (err) {
        console.log(err);
        return "Translation error";
    };

    return translatedText;
}

translation("user", "Add your text here")
// Random values have been set above for the "user" and "text" 
// parameters that the translation function takes in.
// They will be overidden if you pass in arguments to the function.