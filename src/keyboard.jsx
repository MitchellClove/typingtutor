import { useState, useEffect } from 'react'


export function Keyboard() {

  function getKey(key) {
    if(key in lowerKeys) {
      return lowerKeys[key];
    }
    return reversedKeys[key];
  }
  
  const[oldLetters, updateOld] = useState("");
  const[remainingLetters, updateCurrent] = useState("The quick brown fox jumps over the lazy dog.",);
  const[currentSentence, updateSentence] = useState(typingSentences);
  const[isShifted, updateShifted] = useState(false);
  const [keyCharacters, updateDict] = useState(lowerKeys);
  const [keyIsPressed, updatePressed] = useState(pressed);

  useEffect(() => {

    function keyDown(e) {
      if (e.repeat) return;
      updatePressed((oldKeyIsPressed) => {
        let newKeyIsPressed = { ...oldKeyIsPressed };
        if(remainingLetters[1] === undefined && e.key === remainingLetters[0]) {
          updateSentence((oldSentences) => {
            console.log("is array",Array.isArray(oldSentences));
            const placeHolderSentence = oldSentences[0];
            let newSentences = [];
            for(let i = 1; i < oldSentences.length; i++) {
              newSentences.push(oldSentences[i]);
            }
            newSentences.push(placeHolderSentence);
            newKeyIsPressed["Shift"] = "wide-selected";
            return newSentences;
          })
          updateOld(()=>"");
          updateCurrent(()=>currentSentence[0]);
        }
        if(isCapitalized(remainingLetters[0]) && !isShifted) {
          newKeyIsPressed["Shift"] = "wide-selected";
        }
        if (e.key === "Shift") {
          updateShifted(() => true);
          newKeyIsPressed["Shift"] = "wide-pressed";
          updateDict(() => upperKeys);
          if(isCapitalized(remainingLetters[0])) {
            newKeyIsPressed[getKey(remainingLetters[0])] = checkFutureKey(remainingLetters[0]);
          } else {
            if(remainingLetters[0] !== " ") {
              newKeyIsPressed[remainingLetters[0]] = "key";
            }
          }
        }
        if (e.key === remainingLetters[0]) {
          if(remainingLetters[1] !== undefined) {
            updateOld((original) => original + remainingLetters[0]);
            updateCurrent((originalLetters) => originalLetters.slice(1));
          }
          if(isCapitalized(remainingLetters[1])) {
            if(!isShifted) {
              newKeyIsPressed["Shift"] = "wide-selected";
            } else { //the shift key is pressed
              newKeyIsPressed[getKey(remainingLetters[1])] = checkFutureKey(remainingLetters[1]);
            }
          } else if (!isShifted) {
            newKeyIsPressed[remainingLetters[1]] = checkFutureKey(remainingLetters[1]);
          }
        }
        if (e.key === " ") {
          newKeyIsPressed[e.key] = "space-pressed";
        } else {
          newKeyIsPressed[getKey(e.key)] = "key-pressed";
        } 
        return newKeyIsPressed;
      });
    };

    function checkFutureKey(key) {
      if(key === " ") {
        return "space-selected";
      }
      return "key-selected";
    }

    function isCapitalized(letter) {
      if(letter === " ") {
        return false;
      }
      if(letter in reversedKeys) {
        return true;
      }
      return false;
    }

    function keyUp(e) {
      updatePressed((oldKeyIsPressed) =>  {
        let newKeyIsPressed = {...oldKeyIsPressed};
        if(e.key === "Shift") {
          updateShifted(()=>false);
          console.log("this remaining", remainingLetters[0]);
          console.log("this capitalized", isCapitalized(remainingLetters[0]));
          if(isCapitalized(remainingLetters[0])) {
            newKeyIsPressed[getKey(remainingLetters[0])] = "key";
            newKeyIsPressed["Shift"] = "wide-selected";
          } else {
            newKeyIsPressed[remainingLetters[0]] = checkFutureKey(remainingLetters[0]);
            newKeyIsPressed["Shift"] = "wide";
          }
          updateDict(()=>{return lowerKeys});
        }
         else if (e.key === " ") {
          newKeyIsPressed[" "] = "space";
        } else {
          newKeyIsPressed[getKey(e.key)] = "key";
        }
        return(newKeyIsPressed);
      })
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [remainingLetters, isShifted]);


return (
  <span id="content">
    <div id="sentence">
      <span id="past">{oldLetters}</span>
      <span id="current">{remainingLetters[0]}</span>
      <span id="future">{remainingLetters.slice(1)}</span>
    </div>
    <span id="board">
          <span className="newRow">
              <div className={keyIsPressed["`"]}>{keyCharacters["`"]}</div>
              <div className={keyIsPressed["1"]}>{keyCharacters["1"]}</div>
              <div className={keyIsPressed["2"]}>{keyCharacters["2"]}</div>
              <div className={keyIsPressed["3"]}>{keyCharacters["3"]}</div> 
              <div className={keyIsPressed["4"]}>{keyCharacters["4"]}</div>
              <div className={keyIsPressed["5"]}>{keyCharacters["5"]}</div>
              <div className={keyIsPressed["6"]}>{keyCharacters["6"]}</div>
              <div className={keyIsPressed["7"]}>{keyCharacters["7"]}</div>
              <div className={keyIsPressed["8"]}>{keyCharacters["8"]}</div>
              <div className={keyIsPressed["9"]}>{keyCharacters["9"]}</div>
              <div className={keyIsPressed["0"]}>{keyCharacters["0"]}</div>
              <div className={keyIsPressed["-"]}>{keyCharacters["-"]}</div>
              <div className={keyIsPressed["="]}>{keyCharacters["="]}</div>
          </span>
          <span className="newRow">
              <div className={keyIsPressed["q"]}>{keyCharacters["q"]}</div>
              <div className={keyIsPressed["w"]}>{keyCharacters["w"]}</div>
              <div className={keyIsPressed["e"]}>{keyCharacters["e"]}</div>
              <div className={keyIsPressed["r"]}>{keyCharacters["r"]}</div> 
              <div className={keyIsPressed["t"]}>{keyCharacters["t"]}</div>
              <div className={keyIsPressed["y"]}>{keyCharacters["y"]}</div>
              <div className={keyIsPressed["u"]}>{keyCharacters["u"]}</div>
              <div className={keyIsPressed["i"]}>{keyCharacters["i"]}</div>
              <div className={keyIsPressed["o"]}>{keyCharacters["o"]}</div>
              <div className={keyIsPressed["p"]}>{keyCharacters["p"]}</div>
              <div className={keyIsPressed["["]}>{keyCharacters["["]}</div>
              <div className={keyIsPressed["]"]}>{keyCharacters["]"]}</div>
              <div className={keyIsPressed["\\"]}>{keyCharacters["\\"]}</div>
          </span>
          <span className="newRow">
              <div className={keyIsPressed["a"]}>{keyCharacters["a"]}</div>
              <div className={keyIsPressed["s"]}>{keyCharacters["s"]}</div>
              <div className={keyIsPressed["d"]}>{keyCharacters["d"]}</div>
              <div className={keyIsPressed["f"]}>{keyCharacters["f"]}</div> 
              <div className={keyIsPressed["g"]}>{keyCharacters["g"]}</div>
              <div className={keyIsPressed["h"]}>{keyCharacters["h"]}</div>
              <div className={keyIsPressed["j"]}>{keyCharacters["j"]}</div>
              <div className={keyIsPressed["k"]}>{keyCharacters["k"]}</div>
              <div className={keyIsPressed["l"]}>{keyCharacters["l"]}</div>
              <div className={keyIsPressed[";"]}>{keyCharacters[";"]}</div>
              <div className={keyIsPressed["'"]}>{keyCharacters["'"]}</div>
          </span>
          <span className="newRow">
              <div className={keyIsPressed["Shift"]}>Shift</div>
              <div className={keyIsPressed["z"]}>{keyCharacters["z"]}</div>
              <div className={keyIsPressed["x"]}>{keyCharacters["x"]}</div>
              <div className={keyIsPressed["c"]}>{keyCharacters["c"]}</div>
              <div className={keyIsPressed["v"]}>{keyCharacters["v"]}</div> 
              <div className={keyIsPressed["b"]}>{keyCharacters["b"]}</div>
              <div className={keyIsPressed["n"]}>{keyCharacters["n"]}</div>
              <div className={keyIsPressed["m"]}>{keyCharacters["m"]}</div>
              <div className={keyIsPressed[","]}>{keyCharacters[","]}</div>
              <div className={keyIsPressed["."]}>{keyCharacters["."]}</div>
              <div className={keyIsPressed["/"]}>{keyCharacters["/"]}</div>
              <div className={keyIsPressed["Shift"]}>Shift</div>
          </span>
          <span className="newRow">
              <div id={keyIsPressed[" "]}></div>
          </span>
    </span>
  </span>
)};

let lowerKeys = {
  "`": "`",
  "1": '1',
  "2": '2',
  "3": '3',
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
  "-": "-",
  "=": "=",
  "q": "q",
  "w": "w",
  "e": "e",
  "r": "r",
  "t": "t",
  "y": "y",
  "u": "u",
  "i": "i",
  "o": "o",
  "p": "p",
  "[": "[",
  "]": "]",
  "\\": "\\",
  "a": "a",
  "s": "s",
  "d": "d",
  "f": "f",
  "g": "g",
  "h": "h",
  "j": "j",
  "k": "k",
  "l": "l",
  ";": ";",
  "'": "'",
  "z": "z",
  "x": "x",
  "c": "c",
  "v": "v",
  "b": "b",
  "n": "n",
  "m": "m",
  ",": ",",
  ".": ".",
  "/": "/",
  " ": " ",
};

let upperKeys = {
  "`": "~",
  "1": '!',
  "2": '@',
  "3": '#',
  "4": "$",
  "5": "%",
  "6": "^",
  "7": "&",
  "8": "*",
  "9": "(",
  "0": ")",
  "-": "_",
  "=": "+",
  "q": "Q",
  "w": "W",
  "e": "E",
  "r": "R",
  "t": "T",
  "y": "Y",
  "u": "U",
  "i": "I",
  "o": "O",
  "p": "P",
  "[": "{",
  "]": "}",
  "\\": "|",
  "a": "A",
  "s": "S",
  "d": "D",
  "f": "F",
  "g": "G",
  "h": "H",
  "j": "J",
  "k": "K",
  "l": "L",
  ";": ":",
  "'": '"',
  "z": "Z",
  "x": "X",
  "c": "C",
  "v": "V",
  "b": "B",
  "n": "N",
  "m": "M",
  ",": "<",
  ".": ">",
  "/": "?",
  " ": " ",
};

let reversedKeys = {
  "~": "`",
  '!': "1",
  '@': "2",
  '#': "3",
  "$": "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  "_": "-",
  "+": "=",
  "Q": "q",
  "W": "w",
  "E": "e",
  "R": "r",
  "T": "t",
  "Y": "y",
  "U": "u",
  "I": "i",
  "O": "o",
  "P": "p",
  "{": "[",
  "}": "]",
  "|": "\\",
  "A": "a",
  "S": "s",
  "D": "d",
  "F": "f",
  "G": "g",
  "H": "h",
  "J": "j",
  "K": "k",
  "L": "l",
  ":": ";",
  '"': "'",
  "Z": "z",
  "X": "x",
  "C": "c",
  "V": "v",
  "B": "b",
  "N": "n",
  "M": "m",
  "<": ",",
  ">": ".",
  "?": "/",
  " ": " ",
};

let pressed = {
  "`": "key",
  "1": "key",
  "2": "key",
  "3": "key",
  "4": "key",
  "5": "key",
  "6": "key",
  "7": "key",
  "8": "key",
  "9": "key",
  "0": "key",
  "-": "key",
  "=": "key",
  "q": "key",
  "w": "key",
  "e": "key",
  "r": "key",
  "t": "key",
  "y": "key",
  "u": "key",
  "i": "key",
  "o": "key",
  "p": "key",
  "[": "key",
  "]": "key",
  "\\": "key",
  "a": "key",
  "s": "key",
  "d": "key",
  "f": "key",
  "g": "key",
  "h": "key",
  "j": "key",
  "k": "key",
  "l": "key",
  ";": "key",
  "'": "key",
  "Shift": "wide-selected",
  "z": "key",
  "x": "key",
  "c": "key",
  "v": "key",
  "b": "key",
  "n": "key",
  "m": "key",
  ",": "key",
  ".": "key",
  "/": "key",
  " ": "space",
};


const typingSentences = [
  "Learning to type is an essential skill in today's digital age.",
  "Practice makes perfect when it comes to typing accurately.",
  "The sun sets in the west, painting the sky with beautiful colors.",
  "Typing with all fingers will improve your speed and accuracy.",
  "Coding is a valuable skill that requires proficient typing.",
  "A journey of a thousand miles begins with a single step.",
  "Winter is my favorite season because of the snow.",
  "Typing efficiently saves time and reduces errors.",
  "Practice typing regularly to build muscle memory.",
  "Technology is rapidly advancing in the 21st century.",
  "Reading is to the mind what exercise is to the body.",
  "The more you practice, the better you become at typing.",
  "The Internet connects people from all around the world.",
  "Success is the result of hard work and dedication.",
  "Typing is a skill that is useful in many professions.",
  "Learning touch typing is like learning to ride a bike.",
  "The quick brown fox jumps over the lazy dog.",
];