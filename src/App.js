import { useState } from "react";

export default function App() {
    // State variables
    const [Words, setWords] = useState(0);
    const [characters, setCharacters] = useState(0);
    const [sentences, setSentences] = useState(0);
    const [paragraphs, setParagraphs] = useState(0);
    const [areaText, setAreaText] = useState("");
    const [bigWord, setBigWord] = useState("");
    const [averageTime, setAverageTime] = useState(0);

    // variables
    let chars, word, sentence, paragraph, biggestWord;

    // Count number of characters, words, sentences and pharagraphs
    chars = areaText.length;

    word = text_analizer(areaText, " ");

    sentence = text_analizer(areaText, ".");

    paragraph = text_analizer(areaText, "\n");

    biggestWord = the_biggest_word(areaText);

    // Function to analize the text given
    function text_analizer(text, limiter) {
        let tmp = [];
        text.slice()
            .split(limiter)
            .forEach((el) => {
                if (!(el === " " || el === "")) {
                    tmp.push(el);
                }
            });

        return tmp.length;
    }

    // Calc the biggest word, and the typing average time.
    function the_biggest_word(text) {
        let tmp = "";
        text.slice()
            .split(/[" "\n]+/)
            .forEach((element) => {
                if (element.length > tmp.length) tmp = element;
            });
        return tmp;
    }

    function onHandleText(value) {
        //get time execution
        const start = performance.now();

        //update state variables
        setAreaText(value);
        setCharacters(chars);
        setWords(word);
        setSentences(sentence);
        setParagraphs(paragraph);
        setBigWord(biggestWord);

        const end = performance.now();
        const time = Math.round(end - start, 2);
        setAverageTime((prevValue) => (prevValue += time));
    }

    return (
        <div className="app">
            <div className="header">
                <Statistics>
                    Words: <span>{Words}</span>
                </Statistics>
                <Statistics>
                    Characters: <span>{characters}</span>
                </Statistics>
                <Statistics>
                    Sentences: <span>{sentences}</span>
                </Statistics>
                <Statistics>
                    Paragraphs: <span>{paragraphs}</span>
                </Statistics>
            </div>
            <Areatext onTextChange={onHandleText} />
            <div className="footer">
                <Statistics>
                    Average Reading Time:{" "}
                    {areaText === "" ? "" : `~ ${averageTime} ms`}
                </Statistics>
                <Statistics>Longest Word: {bigWord}</Statistics>
            </div>
        </div>
    );
}

function Statistics({ children }) {
    return <p className="stats">{children}</p>;
}

function Areatext({ onTextChange }) {
    const [text, setText] = useState("");

    onTextChange(text);

    return (
        <div>
            <textarea
                rows="24"
                cols="100"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="type text here..."
            ></textarea>
        </div>
    );
}
