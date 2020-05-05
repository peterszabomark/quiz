import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  question:any;
  answer:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let response = this.http.get("http://jservice.io/api/random");
    response.subscribe((data) => {
      this.question = data[0].question;
      this.answer= data[0].answer
      console.log(data)
      })
  }

}
