import { useState } from "react";

export default function App() {
    // State variables
    const [Words, setWords] = useState(0);
    const [characters, setCharacters] = useState(0);
    const [sentences, setSentences] = useState(0);
    const [paragraphs, setParagraphs] = useState(0);
    const [areaText, setAreaText] = useState("");

    //variables
    let chars, word, sentence, paragraph;

    // Count number of characters, words, sentences and pharagraphs
    chars = areaText.length;

    areaText === "" ? (word = 0) : (word = areaText.split(" ").length);

    areaText === "" ? (sentence = 0) : (sentence = areaText.split(".").length);

    areaText === ""
        ? (paragraph = 0)
        : (paragraph = areaText.split("\n").length);

    // Calc the biggest word, and the typing average time.

    function onHandleText(value) {
        setAreaText(value);
        setCharacters(chars);
        setWords(word);
        setSentences(sentence);
        setParagraphs(paragraph);
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
                <Statistics>Average Reading Time: </Statistics>
                <Statistics>Longest Word: </Statistics>
            </div>
            <p>{areaText}</p>
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
