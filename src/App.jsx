import { useRef, useState } from "react";
import { evaluate } from "mathjs";
import "./App.scss";
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  FaPercentage,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function CalculatorPage() {
  const inputRef = useRef();
  const resultRef = useRef();

  let inputEl, resultEl;

  let inputValue = "0";
  let resultValue = "0";
  let answer = null;

  function syncDisplay() {
    inputEl = inputRef.current;
    resultEl = resultRef.current;
    inputEl.innerHTML = inputValue;
    resultEl.innerHTML = resultValue;
  }

  function reset() {
    inputEl = inputRef.current;
    resultEl = resultRef.current;

    inputEl.classList.add("highlight");
    resultEl.classList.remove("highlight");
  }

  function input(val) {
    reset();

    if (inputValue === "0") {
      if (val === ".") {
        inputValue = "0.";
        // resultValue = "0.";
      } else {
        inputValue = val;
        // resultValue = val;
      }
      syncDisplay();
    } else {
      inputValue = inputValue.concat(val);
      if (val !== "+" && val !== "-" && val !== "*" && val !== "/") {
        // resultValue = resultValue.concat(val);
      }
      syncDisplay();
    }

    console.log({
      value: val,
      inputValue: inputValue,
      resultValue: resultValue,
    });
  }

  function backspace() {
    if (inputValue !== "0") {
      inputValue = inputValue.slice(0, -1);
      resultValue = resultValue.slice(0, -1);
      if (inputValue === "") {
        clr();
        return;
      }
      syncDisplay();
    }
  }

  function clr() {
    reset();

    inputValue = "0";
    resultValue = "0";
    syncDisplay();
  }

  function calculate() {
    answer = evaluate(inputValue);
    resultValue = answer;
    syncDisplay();
  }

  function showResult() {
    inputEl = inputRef.current;
    resultEl = resultRef.current;

    inputEl.classList.remove("highlight");
    resultEl.classList.add("highlight");

    calculate();
    syncDisplay();
    
    // Reset value
    inputValue = "0";
    resultValue = "0";
  }

  console.log("javascript loaded");

  return (
    <>
      <main id="Calculator">
        <div className="container">
          <div id="Display">
            <div ref={inputRef} className="row highlight">
              {inputValue}
            </div>
            <div ref={resultRef} className="row grey">
              {resultValue}
            </div>
          </div>
          <div id="Keypad">
            <button onClick={() => clr()}>C</button>
            <button onClick={() => backspace()}>
              <FaBackspace />
            </button>
            <button className="no-hover">
              <FaPercentage />
            </button>
            <button onClick={() => input("/")}>
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
            <button onClick={() => input("*")}>
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
            <button onClick={() => input("-")}>
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
            <button onClick={() => input("+")}>
              <FaPlus />
            </button>
            <button className="no-hover"></button>
            <button onClick={() => input("0")}>
              <span className="primary-color">0</span>
            </button>
            <button onClick={() => input(".")}>
              <span className="primary-color">.</span>
            </button>
            <button onClick={() => showResult()}>
              <FaEquals />
            </button>
          </div>
          <div id="Info">
            <button id="Info-Button" className="" onClick={() => toggleInfo()}>
              ?
            </button>
            <div id="Info-Content" className="">
              <div className="text-container v-hidden">
                <div className="header">
                  <span className="title">Calculator</span>
                  <span className="description">by Irvin Widyastanto</span>
                </div>
                <div>
                  <cite>
                    *Not a fully complete calculator. Any bug is to be expected*
                  </cite>
                </div>
                <ul>
                  <span className="version">v0.0.1</span>
                  <li>Can only do basic calculation</li>
                  <li>Result is calculated and displayed on real time</li>
                  <cite>Limitation:</cite>
                  <li>Decimal number input not supported</li>
                  <li>Can't remember last result to do next calculation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
