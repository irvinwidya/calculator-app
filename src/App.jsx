import { useRef } from "react"
import { evaluate } from "mathjs"
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  // FaPercentage,
  FaPlus,
  FaTimes,
} from "react-icons/fa"
import "./App.scss"
// import Info from "./components/Info";

export default function App() {
  const inputDisplayRef = useRef()
  const resultDisplayRef = useRef()

  const operator = ["+", "-", "*", "/"]
  const operand = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  let inputDisplayEl = null
  let resultDisplayEl = null

  let lastDigitValue = null
  let lastDigitType = null
  let lastTwoDigitValue = null

  let buttonPressed = ""

  let inputValue = "0"
  let resultValue = "0"

  let isOperatorUsed = false

  let answer = null

  // let lastInput = "";
  // let inputValue_lastDigit = "";

  function focusToInput() {
    handleDisplayValue()

    inputDisplayEl.classList.add("focus")
    resultDisplayEl.classList.remove("focus")
  }

  function handleDisplayValue() {
    // Get the value of displayed input and result
    inputDisplayEl = inputDisplayRef.current
    resultDisplayEl = resultDisplayRef.current
    // Update the value
    inputDisplayEl.innerHTML = inputValue
    resultDisplayEl.innerHTML = resultValue
  }

  function checkLastDigit() {
    // Get the last digit of displayed input
    lastDigitValue = inputValue.slice(-1)

    // Check the last digit type between operand and operator
    if (operator.includes(lastDigitValue)) {
      lastDigitType = "operator"
    } else {
      lastDigitType = "operand"
    }
  }

  function checkLastTwoDigit() {
    // Get the last two digit of displayed input
    lastTwoDigitValue = inputValue.slice(-2)
    const firstDigit = lastTwoDigitValue.slice(0, 1)
    const secondDigit = lastTwoDigitValue.slice(-1)

    return { firstDigit, secondDigit }
  }

  function initialInput(val) {
    if (val === "0") {
      return
    }

    if (operator.includes(val)) {
      inputValue = "0" + val
      return
    }
    inputValue = val
  }

  function nextInput(val) {
    if (lastDigitType === "operand") {
      // could add another operand
      // could add an operator
      // could just show result

      // To avoid leading zeros after an operator is being used
      if (isOperatorUsed) {
        let firstDigit = checkLastTwoDigit().firstDigit
        let secondDigit = checkLastTwoDigit().secondDigit
        // Ignore any operand key, if there is an operator followed with number 0
        if (
          operator.includes(firstDigit) &&
          secondDigit === "0" &&
          operand.includes(val)
        ) {
          return
        }
      }

      inputValue = inputValue.concat(val)
      return
    }
    if (lastDigitType === "operator") {
      // cannot add another operator
      // could add operand
      // could just show result

      if (operator.includes(val)) {
        inputValue = inputValue.slice(0, -1)
      }
      inputValue = inputValue.concat(val)
      return
    }
  }

  function input(val) {
    focusToInput() // Focus back to input row after showing result

    checkLastDigit()

    // Check if at least one operator is being used
    if (operator.includes(val)) {
      isOperatorUsed = true
    }

    // Check state
    if (inputValue === "0") {
      // Initial state
      initialInput(val)
    } else {
      // After initial state
      nextInput(val)
    }

    handleDisplayValue()
  }

  function backspace() {
    if (inputValue.length !== 1) {
      inputValue = inputValue.slice(0, -1)
    } else if (inputValue.length === 1) {
      inputValue = "0"
    }

    focusToInput()
    handleDisplayValue()
  }

  function clr() {
    focusToInput()
    resetAllValue()
    handleDisplayValue()
  }

  function calculate() {
    answer = evaluate(inputValue)
    resultValue = parseFloat(answer.toFixed(8))
  }

  function showResult() {
    // When result is shown and the equal button is pressed, do nothing
    if (inputValue === "0" && answer !== null) {
      return
    }

    inputDisplayEl = inputDisplayRef.current
    resultDisplayEl = resultDisplayRef.current

    inputDisplayEl.classList.remove("focus")
    resultDisplayEl.classList.add("focus")

    try {
      calculate()
    } catch (error) {
      console.log(error)
      resultValue = "Error"
    } finally {
      handleDisplayValue()
    }

    resetAllValue()
  }

  function resetAllValue() {
    inputValue = "0"
    resultValue = "0"
    isOperatorUsed = false
  }

  console.log("Welcome to console!")

  return (
    <>
      <main id="Calculator" className="">
        <div id="Display">
          <div ref={inputDisplayRef} id="Display__Input" className="row focus">
            {inputValue}
          </div>
          <div
            ref={resultDisplayRef}
            id="Display__Result"
            className="row inactive-color"
          >
            {resultValue}
          </div>
        </div>
        <div id="Keypad" className="">
          <button className="hover" onClick={() => clr()}>
            <span className="theme-color">C</span>
          </button>
          <button className="hover" onClick={() => backspace()}>
            <span className="theme-color">
              <FaBackspace />
            </span>
          </button>
          <button className="">{/* <FaPercentage /> */}</button>
          <button className="hover" onClick={() => input("/")}>
            <span className="theme-color">
              <FaDivide />
            </span>
          </button>
          <button className="hover" onClick={() => input("7")}>
            <span className="primary-color">7</span>
          </button>
          <button className="hover" onClick={() => input("8")}>
            <span className="primary-color">8</span>
          </button>
          <button className="hover" onClick={() => input("9")}>
            <span className="primary-color">9</span>
          </button>
          <button className="hover" onClick={() => input("*")}>
            <span className="theme-color">
              <FaTimes />
            </span>
          </button>
          <button className="hover" onClick={() => input("4")}>
            <span className="primary-color">4</span>
          </button>
          <button className="hover" onClick={() => input("5")}>
            <span className="primary-color">5</span>
          </button>
          <button className="hover" onClick={() => input("6")}>
            <span className="primary-color">6</span>
          </button>
          <button className="hover" onClick={() => input("-")}>
            <span className="theme-color">
              <FaMinus />
            </span>
          </button>
          <button className="hover" onClick={() => input("1")}>
            <span className="primary-color">1</span>
          </button>
          <button className="hover" onClick={() => input("2")}>
            <span className="primary-color">2</span>
          </button>
          <button className="hover" onClick={() => input("3")}>
            <span className="primary-color">3</span>
          </button>
          <button className="hover" onClick={() => input("+")}>
            <span className="theme-color">
              <FaPlus />
            </span>
          </button>
          <button className=""></button>
          <button className="hover" onClick={() => input("0")}>
            <span className="primary-color">0</span>
          </button>
          <button className="">
            {/* <span className="primary-color">.</span> */}
          </button>
          <button className="hover" onClick={() => showResult()}>
            <span className="theme-color">
              <FaEquals />
            </span>
          </button>
        </div>
      </main>
      {/* <Info /> */}
    </>
  )
}
