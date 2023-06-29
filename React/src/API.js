import pRetry from "p-retry";

const apiUrl = process.env.REACT_APP_SB_API_URL;

// Text translation
export const getTranslation = async (sentence, sourceLanguage, targetLanguage) => {
    let modelEndpoint = `${apiUrl}/tasks/translate`;
    let translatedText = "";

    console.log(sourceLanguage, targetLanguage);

    console.log(`API URL: ${apiUrl}`);

    let requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_SB_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "source_language": sourceLanguage,
            "target_language": targetLanguage,
            "text": sentence
        })
    };

    try {
        let response = await fetch(modelEndpoint, requestOptions);
        if (response.status === 200) {
            let responseJson = await response.json();
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

export const translateSB = async (sentence, sourceLanguage, targetLanguage) => {
    return await pRetry(() => getTranslation(sentence, sourceLanguage, targetLanguage), {
        onFailedAttempt: error => {
            console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
        },
        retries: 7
    })
};

// Text to speech
const getSpeech = async (text) => {
    console.log("Speech");
}

export const textToSpeech = async (sentence, model) => {
    return await pRetry(() => getSpeech(sentence, model), {
        onFailedAttempt: error => {
            console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
        },
        retries: 7
    })
};
