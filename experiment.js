// experiment.js
const jsPsych = initJsPsych({
  display_element: 'jspsych-target',
  on_finish: () => {
    let best = localStorage.getItem("bestBreak") || "—";
    let streak = localStorage.getItem("streak") || 0;
    jsPsych.data.displayData("json");
    alert(`Best streak break: ${best}\nCurrent streak: ${streak}`);
  }
});

const words = ["zelmor", "valmik", "marnel"];
const meanings = ["river", "banana", "teacher", "engine", "apple", "mirror", "snow", "book"];
const mappings = { zelmor: "engine", valmik: "banana", marnel: "teacher" };

const getTrial = (word) => {
  let correct = mappings[word];
  let distractors = meanings.filter(m => m !== correct);
  let choices = [...distractors.sort(() => 0.5 - Math.random()).slice(0, 7), correct];
  choices = choices.sort(() => 0.5 - Math.random());
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<strong>What does <em>${word}</em> mean?</strong>`,
    choices: choices,
    data: { word: word, correct: correct },
    on_finish: (data) => {
      data.response_label = choices[data.response];
      data.correct_response = data.correct;
      data.correct = data.response_label === data.correct;

      let streak = parseInt(localStorage.getItem("streak")) || 0;
      let best = parseInt(localStorage.getItem("bestBreak")) || Infinity;

      if (data.correct) {
        if (streak < best) localStorage.setItem("bestBreak", streak);
        localStorage.setItem("streak", 0);
      } else {
        localStorage.setItem("streak", streak + 1);
      }
    }
  };
};

const timeline = [];
let trials = 10;
for (let i = 0; i < trials; i++) {
  const word = words[Math.floor(Math.random() * words.length)];
  timeline.push(getTrial(word));
}

jsPsych.run(timeline);
