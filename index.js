#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = function (ms = 2000) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, ms);
  });
};

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Wizard: Welcome To The Cursed Quiz Games level 1 \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
  ${chalk.bgBlueBright("How To Play")}
  Wizard: It's A Fun Interactive Series Of Games that I Ask Some General Knowledge Questions.
  if you answer wrong i will be ${chalk.bgRed("Killed")}
  (Hysteric laughs) haha It's Going To Be Fine Because You Are A Genius right?
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Wizard: Alright First Things First, What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "Wizard: In a website browser address bar, what does “www” stand for?",
    choices: [
      "WE Work Well",
      "World Wide Web",
      "World Wide Wake",
      "We Won't Walk (Hehe this one is ridiculous)",
    ],
  });

  return handleAnswer(answers.question_1 === "World Wide Web");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message:
      "Wizard: Which programming language is known as the 'mother' of all languages?",
    choices: ["C", "Python", "Java", "Assembly"],
  });

  return handleAnswer(answers.question_2 === "C");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Wizard: What does CSS stand for in web development?",
    choices: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
  });

  return handleAnswer(answers.question_3 === "Cascading Style Sheets");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Wizard: What does JSON stand for?",
    choices: [
      "JavaScript Oriented Notation",
      "JavaScript Object Notation",
      "Java Syntax Object Notation",
      "Just Simple Object Notation",
    ],
  });

  return handleAnswer(answers.question_4 === "JavaScript Object Notation");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "Wizard: Which company developed the TypeScript programming language?",
    choices: ["Google", "Facebook", "Microsoft", "Apple"],
  });

  return handleAnswer(answers.question_5 === "Microsoft");
}

function winner() {
  console.clear();
  const msg = `
  Congratulations ${playerName}!
  You've completed the quiz.`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  return sleep().then(() => {
    spinner.stop();
    if (isCorrect) {
      spinner.success({ text: `Wizard: hoho yes Correct One ${playerName}` });
    } else {
      spinner.error({
        text: `Wizard: Wrong one ${playerName}...Oh Am I Going To Die Again?`,
      });
      process.exit(1);
    }
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();
