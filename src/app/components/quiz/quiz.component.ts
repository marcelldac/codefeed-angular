import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMarkGithub, octLinkExternal } from '@ng-icons/octicons';
import { ionLogoLinkedin } from '@ng-icons/ionicons';
import mock from '../../../assets/data/quizzes.json';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgIconComponent],
  viewProviders: [
    provideIcons({ octMarkGithub, octLinkExternal, ionLogoLinkedin }),
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  constructor() {
    this.mock = mock;
  }
  mock: any;
  questions: any;
  selectedQuestion: any;
  answers: string[] = [];
  title = '';
  answerSelected = '';
  githubURL = 'https://github.com/marcelldac/';
  linkedinURL = 'https://www.linkedin.com/in/marcell-dactes/';
  portfolioURL = 'https://developermarcell.vercel.app/';
  questionIndex = 0;
  questionMaxIndex = 0;
  isFinished = false;

  ngOnInit() {
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
