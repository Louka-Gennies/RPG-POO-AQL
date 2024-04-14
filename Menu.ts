export default class Menu {
  question: string;
  possibilities: string[];

  constructor(question: string, possibilities: string[]) {
    this.question = question;
    this.possibilities = possibilities;
  }

  askQuestion(): number {
    let question = this.question + "\n";
    for (let i = 0; i < this.possibilities.length; i++) {
      question += `${i + 1}. ${this.possibilities[i]}\n`;
    }
    const userInput = prompt(
      question + "Choose a number between 1 and " + this.possibilities.length +
        " : ",
    );
    if (userInput === null) {
      console.log("you have to choose a number");
      return this.askQuestion();
    } else if (
      parseInt(userInput) > this.possibilities.length ||
      parseInt(userInput) < 1 || isNaN(parseInt(userInput))
    ) {
      console.clear();
      console.log(
        "you have to choose a number between 1 and " +
          this.possibilities.length + "\n",
      );
      return this.askQuestion();
    } else {
      console.log("you choose " + this.possibilities[parseInt(userInput) - 1]);
      return parseInt(userInput) - 1;
    }
  }
}
