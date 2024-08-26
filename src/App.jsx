import { useRef } from "react";
import { evaluate } from "mathjs";
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  // FaPercentage,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "./App.scss";
import Info from "./Info";

export default function App() {
  const inputDisplayRef = useRef();
  const resultDisplayRef = useRef();

  let inputDisplayEl, resultDisplayEl;

  // let isOperandHasComma = false;
  let currentOperator = "";
  let inputValue = "0";
  let resultValue = "0";
  let answer = null;

  // let lastInput = "";
  // let inputValue_lastDigit = "";

  function syncDisplayedValue() {
    inputDisplayEl = inputDisplayRef.current;
    resultDisplayEl = resultDisplayRef.current;
    inputDisplayEl.innerHTML = inputValue;
    resultDisplayEl.innerHTML = resultValue;
  }

  function resetHighlight() {
    inputDisplayEl = inputDisplayRef.current;
    resultDisplayEl = resultDisplayRef.current;

    inputDisplayEl.classList.add("highlight");
    resultDisplayEl.classList.remove("highlight");
  }

  function inputInitialDigit(val) {
    if (val === "+" || val === "-" || val === "*" || val === "/") {
      currentOperator = val;
      inputValue = "0" + val;
      return;
    }
    // if (val === ".") {
    //   isOperandHasComma = true;
    //   inputValue = "0" + val;
    //   return;
    // }
    inputValue = val;
  }

  function inputNextDigit(val) {
    if (val === "+" || val === "-" || val === "*" || val === "/") {
      if (currentOperator !== "") {
        inputValue = inputValue.slice(0, -1);
      }
      currentOperator = val;
    }
    if (!isNaN(val)) {
      currentOperator = "";
    }
    inputValue = inputValue.concat(val);
  }

  function input(val) {
    // lastInput = val;

    if (answer !== null) {
      resetHighlight();
    }

    if (inputValue === "0") {
      inputInitialDigit(val);
      syncDisplayedValue();
    } else {
      inputNextDigit(val);
      syncDisplayedValue();
    }

    syncDisplayedValue();

    // console.table({
    //   val,
    //   currentOperator,
    //   inputValue,
    //   answer,
    // });
  }

  // function checkLastDigitOfInputValue() {
  //   inputValue_lastDigit = inputValue.slice(-1);
  //   if (
  //     inputValue_lastDigit === "+" ||
  //     inputValue_lastDigit === "-" ||
  //     inputValue_lastDigit === "*" ||
  //     inputValue_lastDigit === "/"
  //   ) {
  //     currentOperator = lastInput;
  //   }
  //   if (!isNaN(inputValue_lastDigit)) {
  //     currentOperator = "";
  //   }
  // }

  function backspace() {
    if (inputValue !== "0") {
      inputValue = inputValue.slice(0, -1);
      if (inputValue === "") {
        clr();
        return;
      }
    }
    syncDisplayedValue();
  }

  function clr() {
    resetHighlight();

    inputValue = "0";
    resultValue = "0";
    currentOperator = "";
    // isOperandHasComma = false;

    syncDisplayedValue();
  }

  function calculate() {
    answer = evaluate(inputValue);
    resultValue = parseFloat(answer.toFixed(8));
    syncDisplayedValue();
  }

  function showResult() {
    inputDisplayEl = inputDisplayRef.current;
    resultDisplayEl = resultDisplayRef.current;

    inputDisplayEl.classList.remove("highlight");
    resultDisplayEl.classList.add("highlight");

    calculate();
    syncDisplayedValue();

    // Reset value
    inputValue = "0";
    resultValue = "0";
  }

  console.log("Welcome to console!");

  return (
    <>
      <main id="Calculator">
        <Info />
        <div id="Display">
          <div ref={inputDisplayRef} id="InputRow" className="row highlight">
            {inputValue}
          </div>
          <div ref={resultDisplayRef} id="ResultRow" className="row grey">
            {resultValue}
          </div>
        </div>
        <div id="Keypad">
          <button className="theme-color" onClick={() => clr()}>
            C
          </button>
          <button className="theme-color" onClick={() => backspace()}>
            <FaBackspace />
          </button>
          <button className="theme-color no-hover">
            {/* <FaPercentage /> */}
          </button>
          <button className="theme-color" onClick={() => input("/")}>
            <FaDivide />
          </button>
          <button onClick={() => input("7")}>
            <span className="primary-color">7</span>
          </button>
          <button onClick={() => input("8")}>
            <span className="primary-color">8</span>
          </button>
          <button onClick={() => input("9")}>
            <span className="primary-color">9</span>
          </button>
          <button className="theme-color" onClick={() => input("*")}>
            <FaTimes />
          </button>
          <button onClick={() => input("4")}>
            <span className="primary-color">4</span>
          </button>
          <button onClick={() => input("5")}>
            <span className="primary-color">5</span>
          </button>
          <button onClick={() => input("6")}>
            <span className="primary-color">6</span>
          </button>
          <button className="theme-color" onClick={() => input("-")}>
            <FaMinus />
          </button>
          <button onClick={() => input("1")}>
            <span className="primary-color">1</span>
          </button>
          <button onClick={() => input("2")}>
            <span className="primary-color">2</span>
          </button>
          <button onClick={() => input("3")}>
            <span className="primary-color">3</span>
          </button>
          <button className="theme-color" onClick={() => input("+")}>
            <FaPlus />
          </button>
          <button className="no-hover"></button>
          <button onClick={() => input("0")}>
            <span className="primary-color">0</span>
          </button>
          <button className="no-hover">
            {/* <span className="primary-color">.</span> */}
          </button>
          <button className="theme-color" onClick={() => showResult()}>
            <FaEquals />
          </button>
        </div>
      </main>
    </>
  );
}
