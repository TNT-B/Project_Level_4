import "../Question/style.css";
import { useState, useEffect } from "react";

function TestQuestion() {
  const [time, setTime] = useState(5);
  const [question, setQuestion] = useState(3);

  const DecTime = () => {
    setTime(time - 1);
    console.log(`day la time : ${time}`);
  };

  const DecQuestion = () => {
    setQuestion(question - 1);
  };

  useEffect(() => {
    if (time === 0) return;
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="container">
      <div className="header">
        <div className="header-title">
          <h1>This is your test</h1>
        </div>
      </div>
      <div className="notification">
        <h3>Time Left : {time}</h3>
        <h4>The remaining questions : {question}</h4>
      </div>
      {/* ------------------------------------------ */}
      <fieldset id={1} className="form">
        <div className="form-test">
          <div>
            <p className="number">1</p>
          </div>
          <p className="question">Cau Hoi</p>
        </div>
        <div
          className="check"
          onChange={(e) => {
            let i1 = 0;
            DecQuestion();
            // onChangeChoice(e.target.value, id);
          }}
        >
          <div className="choice">
            <input
              type="radio"
              id={1}
              className="box"
              name={"name1"}
              value={1}
            />
            <label className="answer" htmlFor={1}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name1"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name1"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name1"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
        </div>
      </fieldset>
      {/* --------------------------------------- */}
      <fieldset id={2} className="form">
        <div className="form-test">
          <div>
            <p className="number">2</p>
          </div>
          <p className="question">Cau Hoi</p>
        </div>
        <div
          className="check"
          onChange={(e) => {
            // onChangeChoice(e.target.value, id);
          }}
        >
          <div className="choice">
            <input
              type="radio"
              id={2}
              className="box"
              name={"name"}
              value={2}
            />
            <label className="answer" htmlFor={2}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
        </div>
      </fieldset>
      {/* --------------------------------------- */}
      <fieldset id={3} className="form">
        <div className="form-test">
          <div>
            <p className="number">3</p>
          </div>
          <p className="question">Cau Hoi</p>
        </div>
        <div
          className="check"
          onChange={(e) => {
            // onChangeChoice(e.target.value, id);
          }}
        >
          <div className="choice">
            <input
              type="radio"
              id={3}
              className="box"
              name={"name3"}
              value={3}
            />
            <label className="answer" htmlFor={2}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name3"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name3"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
          <div className="choice">
            <input
              type="radio"
              id={"item.idInput"}
              className="box"
              name={"name3"}
              value={"item.value"}
            />
            <label className="answer" htmlFor={"item.idInput"}>
              Cau tra loi
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
export default TestQuestion;
