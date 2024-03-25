export default class Menu {
  question: string;
  possibilities: string[];

  constructor(question: string, possibilities: string[]) {
    this.question = question;
    this.possibilities = possibilities;
  }

  askQuestion(): void {
    let question = this.question + "\n";
    for (let i = 0; i < this.possibilities.length; i++) {
      question += `${i + 1}. ${this.possibilities[i]}\n`;
    }
    console.clear();
    const userInput = prompt(
      question + "Choose a number between 1 and " + this.possibilities.length +
        " : ",
    );
    if (userInput === null) {
      console.log("you have to choose a number");
      console.clear();
      this.askQuestion();
    } else if (
      parseInt(userInput) > this.possibilities.length || parseInt(userInput) < 1
    ) {
      console.clear();
      console.log(
        "you have to choose a number between 1 and " +
          this.possibilities.length,
      );
      this.askQuestion();
    } else {
      console.log("you chose " + this.possibilities[parseInt(userInput) - 1]);
    }
  }
}

const menu = new Menu("What is your favorite color?", [
  "Red",
  "Blue",
  "Green",
  "Yellow",
]);
menu.askQuestion();
