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
  separateQuestions: any;
  categoryId = 0;
  itemIndex: any;
  categoryd: Category[] = [
    {id:0, name:"Random"},
    {id:21, name:"Animals"},
    {id:2, name:"Baseball"},
    {id:16, name:"Cars"},
    {id:7, name:"U.S. Cities"},
    {id:17, name:"U.S. States"},
    {id:8, name:"Time"},
  ]
  defaultCategory = 0;

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
    if(this.categoryId == 0){
      let response = this.http.get("http://jservice.io/api/random");
      response.subscribe((data) => {
        this.question = data[0].question;
        this.answer= data[0].answer
      }
      )
    }else{
      if(this.itemIndex < this.separateQuestions.length){
        this.question = this.separateQuestions[this.itemIndex].question;
        this.answer = this.separateQuestions[this.itemIndex].answer;
        this.itemIndex++
      } else {
        console.log("Ready with question")
        this.itemIndex = 0;
      }
    
      
    }
  }

  filterCategory(value) {
    if(value!=0){
      let practice = this.http.get("http://jservice.io/api/category?id=" + value );
      practice.subscribe((data: any) => {
        this.separateQuestions = data.clues
        this.categoryId = value ;
        console.log(this.separateQuestions)
        this.itemIndex = 0;
        this.addNewQuestion();
      });
    } else {
      this.categoryId = value;
      this.addNewQuestion();
    }
  }

}
