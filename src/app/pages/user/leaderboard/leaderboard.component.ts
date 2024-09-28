import { Component, OnInit, ViewChild } from '@angular/core';
// import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { QuizService } from 'src/app/services/quiz.service';
import { LeaderBoardRequest } from './LeaderBoardRequest';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  leaderboardData: LeaderBoardRequest[] = []; 
  displayedColumns: string[] = ['rank', 'user', 'score'];
  dataSource = new MatTableDataSource<any>(this.leaderboardData);
  
  constructor(
    // public sidebar: SidebarComponent
    public userdashboard: UserDashboardComponent,
    private _quiz: QuizService,
    // private leaderboardreq: LeaderBoardRequest
  ) { }

  ngOnInit(): void {
    // const leaderboardDataJSON = localStorage.getItem('leaderboardData');
    // this.leaderboardData = JSON.parse(leaderboardDataJSON);
    this.fetchLeaderboardData();
  
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
