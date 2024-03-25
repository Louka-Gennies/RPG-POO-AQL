export default class Menu {
    questions : string[];
    choices: string[][];
    answers : number;

    constructor (questions : string[], choices: string[][], answers : number) {
        this.questions = questions;
        this.choices = choices;
        this.answers = answers;
    }

    async askQuestion() : Promise<number> {
        console.log(this.questions[this.answers]);
        this.choices[this.answers].forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });
        for await (const line of Deno.iter(Deno.stdin)) {
            const answer = parseInt(new TextDecoder().decode(line));
            console.log(`You selected: ${this.choices[this.answers][answer - 1]}`);
            return answer;
        }
        return 0;
    }
}