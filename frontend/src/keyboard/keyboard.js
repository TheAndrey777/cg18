const keys = {};
const keys1 = {};

const KeyBoard = {
  hasKey: (code) => {
    let x = keys[code];
    return x;
  },
  onKey: (code) => {
    let x = keys1[code];
    return x;
  },
  onTimer: () => Object.keys(keys1).forEach((key) => (keys1[key] = false)),
};
export default KeyBoard;

// setInterval(() => Object.keys(keys1).forEach(key => keys1[key] = false), 20);
document.addEventListener("keydown", (e) => {
  keys[e.code] = keys1[e.code] = true;
  // console.log(e.code)
});
document.addEventListener("keyup", (e) => (keys[e.code] = false));
