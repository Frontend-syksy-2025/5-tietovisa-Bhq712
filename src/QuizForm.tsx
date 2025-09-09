import { useState } from "react";

function QuizForm() {
    // Kysymysolion tyyppi
    type Question = {
        id: number;
        text: string;
        difficulty: "Easy" | "Medium" | "Hard";
    };

    // Tallennetaan kaikki kysymykset
    const [questions, setQuestions] = useState<Question[]>([]);
    // Lomakkeen kentät
    const [questionText, setQuestionText] = useState("");
    const [difficulty, setDifficulty] = useState<Question["difficulty"]>("Easy");
    // Satunnaisesti valittu kysymys
    const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

    const addQuestion = () => {
        if (questionText.trim() === "") return;
        const newQuestion: Question = {
            id: Date.now(),
            text: questionText,
            difficulty: difficulty
        };
        setQuestions([...questions, newQuestion]);
        setQuestionText("");
        setDifficulty("Easy");
    }


    return(

         <div>
            <h2>Quiz</h2>
            <input type="text"
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
            placeholder="Enter a question..." />
            <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            <button onClick={addQuestion}>Add question </button>


            <button
                onClick={() => {
                    if (questions.length < 3) return;
                    const idx = Math.floor(Math.random() * questions.length);
                    setRandomQuestion(questions[idx]);
                }}
                disabled={questions.length < 3}
            >
                Play
            </button>

            {randomQuestion && (
                <div>
                    <p><strong>Question:</strong> {randomQuestion.text}</p>
                    <p><strong>Difficulty:</strong> {randomQuestion.difficulty}</p>
                </div>
            )}

         </div>   

    )

}

export default QuizForm;