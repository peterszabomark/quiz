import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  question: String;
  correctAnswer: String;
  userAnswer: String;
  addedAnswer: String;
  result: String;

  separateQuestions: any;
  categoryId: number = 0;
  itemIndex: number;

  categoryd: Category[] = [
    {id:0, name:"Random"},
    {id:20, name:"Comedians"},
    {id:2, name:"Baseball"},
    {id:13, name:"Inventions"},
    {id:7, name:"U.S. Cities"},
    {id:17, name:"U.S. States"},
    {id:19, name:"Landmarks"},
  ];
  defaultCategory: number = 0;

  show: boolean = false;
  showTitle: String = "Show Answer";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let response = this.http.get("http://jservice.io/api/random");
    response.subscribe((data) => {
      this.question = data[0].question;
      this.correctAnswer= data[0].answer;
      console.log(data)
    });
  };

  addNewQuestion(): void {
    if(this.categoryId == 0) {
      let response = this.http.get("http://jservice.io/api/random");
      response.subscribe((data) => {
        this.question = data[0].question;
        this.correctAnswer = data[0].answer;
      });
    } else {
      if(this.itemIndex < this.separateQuestions.length) {
        this.question = this.separateQuestions[this.itemIndex].question;
        this.correctAnswer = this.separateQuestions[this.itemIndex].answer;
        this.itemIndex++;
      } else {
        alert("Ready with all questions!")
        this.itemIndex = 0;
      };
    };
    this.hideAnswer();
  };

  filterCategory(value: number): void {
    if(value != 0) {
      let response = this.http.get("http://jservice.io/api/category?id=" + value );
      response.subscribe((data: any) => {
        this.separateQuestions = data.clues;
        this.categoryId = value ;
        this.itemIndex = 0;
        this.addNewQuestion();
      });
    } else {
      this.categoryId = value;
      this.addNewQuestion();
    };
  };

  addAnswer(answer: String): void {
    if(answer === (undefined)) {
      alert("Write your answer!");
      return null;
    };
    this.userAnswer = "Your answer: " + answer;
    if(this.addedAnswer) {
      if(this.correctAnswer.toUpperCase() == answer.toUpperCase()) {
        this.result = "Correct!";
      } else {
        this.result = "Incorrect!";
      };
    } else {
      this.result = "Incorrect!";
    };
    this.show = true;
    this.showTitle = "Hide Answer";
  };

  toggleShow(): void {
    this.show = !this.show;
    this.show ? this.showTitle="Hide Answer" : this.showTitle="Show Answer";
  };

  hideAnswer(): void {
    this.show = false;
    this.showTitle = "Show Answer";
    this.userAnswer = null;
    this.result = null;
    this.userAnswer = null;
  };
}