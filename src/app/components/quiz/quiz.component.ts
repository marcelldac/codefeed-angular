import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import mock from '../../../assets/data/quizzes.json';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  mock: any;
  constructor() {
    this.mock = mock;
  }
  title = '';
  answerSelected = '';
  answers: string[] = [];
  selectedQuestion: any;
  questions: any;
  questionIndex = 0;
  questionMaxIndex = 0;
  isFinished = false;

  ngOnInit(): void {
    if (mock) {
      this.isFinished = false;
      this.title = mock.title;
      this.questions = mock.questions;
      this.selectedQuestion = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  handleChooseQuestion(alias: string) {
    this.answers.push(alias);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;
    if (this.questionMaxIndex > this.questionIndex) {
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      const finalAnswer = await this.checkResult(this.answers);
      this.isFinished = true;
      this.answerSelected =
        mock.results[finalAnswer as keyof typeof mock.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (
        arr.filter((item) => item === prev).length >
        arr.filter((item) => item === curr).length
      ) {
        return prev;
      } else {
        return curr;
      }
    });
    return result;
  }
}
