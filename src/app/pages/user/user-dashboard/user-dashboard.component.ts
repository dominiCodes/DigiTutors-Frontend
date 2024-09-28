import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service'
import { LeaderBoardRequest } from '../leaderboard/LeaderBoardRequest';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {


  leaderboardData: any[] = [];
  user: any;
  users: any
  catIdFromLocalStorage : number; 
  constructor(
    private _quiz: QuizService, 
  )  {}

  ngOnInit(): void {
    this.catIdFromLocalStorage = Number(localStorage.getItem('catId'));
    // this.fetchLeaderboardData();

    // this.fetchUsers(); 
  }

  // fetchLeaderboardData() {
  // this._quiz.getLeaderboardData().subscribe(
  //   (data: LeaderBoardRequest[]) => {
  //     console.log(data);
  //     console.log(data[0].user);
  //     this.leaderboardData = data;
  //     console.log('%$&^%%^');
  //     console.log(this.leaderboardData);
  //   },
  //   (error) => {
  //     console.error('Error fetching leaderboard data:', error);
  //   }
  // );
  // }

  fetchUsers() {
    this._quiz.getAllUsersOrderByUserScore().subscribe(
      (data: any) => {
        this.users = data;
        console.log('below users');
        console.log(this.users); // Log the received data
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
}

}
