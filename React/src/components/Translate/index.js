import {MainContainer} from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import {useEffect, useRef, useState} from "react";
import {translateSB, textToSpeech} from "../../API";
import {localLangString} from "../../constants";

const localLangOptions = [
    {
        label: 'Luganda',
        value: 'Luganda'
    },
    {
        label: 'Acholi',
        value: 'Acholi'
    },
    {
        label: 'Ateso',
        value: 'Ateso'
    },
    {
        label: 'Lugbara',
        value: 'Lugbara'
    },
    {
        label: 'Runyankole',
        value: 'Runyankole'
    }
]

const englishOption = {
    label: 'English',
    value: 'English'
}

const sourceOptions = [
    englishOption,
    {
        label: localLangString,
        value: localLangString
    }
];

const getTargetOptions = (sourceLanguage) => {
    return sourceLanguage === localLangString ? [englishOption] : localLangOptions
}


const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [targetLanguage, setTargetLanguage] = useState(localLangOptions[0].value);
    const [sourceText, setSourceText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const prevTarget = useRef();
    const isMounted = useRef(false);

    useEffect(() => {
        if (sourceLanguage === localLangString) setTargetLanguage('English');
        else setTargetLanguage(localLangOptions[0].value);
    }, [sourceLanguage])

    const handleTextToSpeech = async () => {
        setIsLoading(true);
        try {
            await textToSpeech(translation)
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    const translate = async (source) => {
        if (source === '') {
            setTranslation('');
            setIsLoading(false);
            return;
        }
        try {
            const model = sourceLanguage === 'English' ? 'en-mul' : 'mul-en';
            const sentence = model === 'en-mul' ? `${source}` : source;
            const result = await translateSB(sentence, sourceLanguage, targetLanguage);
            setTranslation(result);
        } catch (e) {
            // TODO: Log errors here
            setTranslation('');
        }
        setIsLoading(false);
    }
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        if (prevTarget.current !== targetLanguage) setTranslation('')
        setIsLoading(true);
        prevTarget.current = targetLanguage;
        const timeOutId = setTimeout(() => translate(sourceText), 5000);
        return () => clearTimeout(timeOutId);
    }, [sourceText, targetLanguage]);

    return (
        <MainContainer>
            <TranslateTextArea
                placeholder="Enter text"
                dropDownOptions={sourceOptions}
                setSourceLanguage={setSourceLanguage}
                text={sourceText}
                setText={setSourceText}
            />
            <TranslateTextArea
                placeholder="Translation"
                disabled={true}
                dropDownOptions={getTargetOptions(sourceLanguage)}
                setTargetLanguage={setTargetLanguage}
                translation={translation}
                text={sourceText}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                isLoading={isLoading}
                handleTextToSpeech={handleTextToSpeech}
            />
        </MainContainer>
    );
};

export default Translate;
