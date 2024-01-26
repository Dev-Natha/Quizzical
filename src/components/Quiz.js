import "../App.css"
import React from "react";
import axios from "axios";
const Quiz = () => {
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [examDone, setExamDone] = React.useState(false)
    React.useEffect(() => {
        getQuestions()
    }, [])

    function getQuestions(){
        axios.get("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy")
            .then((data) => {
                setQuestions(data.data.results.map((quest) => {
                    const new_incorrect = quest.incorrect_answers.map(ans => {
                        return {
                            option: ans,
                            active: false,
                            correct: false
                        }
                    })
                    const new_correct = {
                        option: quest.correct_answer,
                        active: false,
                        correct: true
                    }
                    const totalAnswers = [...new_incorrect, new_correct]
                    shuffle(totalAnswers)

                    return {
                        ...quest,
                        totalAnswers: totalAnswers
                    }
                    
                }))
                setExamDone(false)
                setScore(0)
            })
            .catch((err) => alert(err))
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5)
    }

    function chooseOptions(ans, ind, queAns, indd) {
        queAns.active = !queAns.active
        const new_ans = ans.map((opt, id) => {
            return (
                {...opt, active:false}
                )
        })
        const updated_ans = new_ans.map((opt, id) => {
            return id === ind ? queAns : opt
        })
        const newQue = questions.map((prevQue, index) => {
            return index === indd ? {...prevQue, totalAnswers:updated_ans} : prevQue
        })
        setQuestions(newQue)
    }

    function endExam(){
        questions.map(quest => {
            quest.totalAnswers.map(queAns => {
                if (queAns.active && queAns.correct){
                    setScore((prevScore) => prevScore + 1) 
                }
            })
        })
        setExamDone(true)
    }

    const displayQuestion = questions.map((quest, indexx) => {
        return <div key={indexx}>
            <h4>{quest.question}</h4>
            <div className="options-cont">
                {quest.totalAnswers.map((queAns, index) => {
                    return <div key={index}>
                        <button onClick={() => chooseOptions(quest.totalAnswers, index, queAns, indexx)} style={queAns.active ? {backgroundColor:"rgb(213, 215, 242)"} : {background:"none"}}>{queAns.option}</button>
                    </div>
                })}
            </div>
        </div>
    })

    const displayResult =  questions.map((quest, indexx) => {
        return <div key={indexx}>
            <h4>{quest.question}</h4>
            <div className="options-cont">
                {quest.totalAnswers.map((queAns, index) => {
                    return <div key={index}>
                        <button style={queAns.active ? queAns.correct ? {backgroundColor:"rgb(141, 207, 160)"} :{backgroundColor:"rgb(240, 212, 219)"} : queAns.correct ? {backgroundColor:"rgb(141, 207, 160)"} : {background:"none"}}>{queAns.option}</button>
                    </div>
                })}
            </div>
        </div>
    })
    return (
        <>
            <div className="home-cont">
                <div className="top-cont"></div>
                <div className="btm-cont"></div>
                <div className="quiz-cont">
                    {
                        examDone 
                        ? 
                        <div>
                            {displayResult}
                            <div className="ans-btn">
                                <h4>You scored {score} / {questions.length}</h4>
                                <button className="home-btn" onClick={getQuestions}>Play again</button>
                            </div>
                        </div>
                        :
                        <div>
                            {displayQuestion}
                            {displayQuestion && <div className="ans-btn"><button className="home-btn" onClick={endExam}>Check Answers</button></div>}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Quiz;