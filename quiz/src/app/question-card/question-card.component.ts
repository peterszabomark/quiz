import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {


  question:any;
  answer:any;
  categoryd: Category[] = [
    {id:0, name:"Random"},
    {id:21, name:"Animals"},
    {id:2, name:"Baseball"},
    {id:16, name:"Cars"},
    {id:7, name:"U.S. Cities"},
    {id:17, name:"U.S. States"},
    {id:8, name:"Time"},
  ]

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let response = this.http.get("http://jservice.io/api/random");
    response.subscribe((data) => {
      this.question = data[0].question;
      this.answer= data[0].answer
      console.log(data)
      })
  }

  addNewQuestion() {
    let response = this.http.get("http://jservice.io/api/random");
      response.subscribe((data) => {
        this.question = data[0].question;
        this.answer= data[0].answer
      }
      )
  }

}
