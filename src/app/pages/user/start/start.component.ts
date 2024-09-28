import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { LeaderBoardRequest } from '../leaderboard/LeaderBoardRequest';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;
  user: any;
  uId;
  quiz: any;
  leaderboard: any;
  userObj: any
  catIdFromLocalStorage: number
  leaderboardData: LeaderBoardRequest[] = [];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;


  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private _user: UserService,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.catIdFromLocalStorage = Number(localStorage.getItem('catId'));
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
    this.user= this._login.getUser();
    // alert(this.user.id);

    this.uId= this.user.id;
    this.userObj= this._user.getUserById(this.uId).subscribe(

      (data: any) => {
        this.userObj= data;
        console.log('_____________________________-userObj');
        console.log(this.userObj);
      },
      error => {
        console.error('Error fetching quiz:', error);
      }
    );

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
 
  evalQuiz() {
    //calculation
    //call to sever  to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;

        const request: LeaderBoardRequest = {
          quiz: this.qid, // Replace with actual quiz ID
          user: this.uId, // Replace with actual user ID
          userScorePerQuiz: this.marksGot,// Replace with actual user score
          category: this.catIdFromLocalStorage
        };
        console.log('Request');
       console.log(request);
        this._quiz.updateLeaderBoard(request).subscribe(
          (data: any) => {
            this.leaderboard = data;
            console.log('Below This:::')
            console.log(data);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in loading questions of quiz', 'error');
          }
        );
        
          this.fetchLeaderboardData();
        console.log('LeaderBoard');

      },
      (error) => {
        console.log(error);
      }
    );
    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log('Correct Answers :' + this.correctAnswers);
    // console.log('Marks Got ' + this.marksGot);
    // console.log('attempted ' + this.attempted);
    // console.log(this.questions);
  }

  fetchLeaderboardData() {
    this._quiz.getLeaderboardData().subscribe(
      (data: LeaderBoardRequest[]) => {
        console.log(data);
        console.log(data[0].user);
        this.leaderboardData = data;
        console.log('%$&^%%^');
        console.log(this.leaderboardData);
      },
      (error) => {
        console.error('Error fetching leaderboard data:', error);
      }
    );
    }
}
