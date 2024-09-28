import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
// import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { QuizService } from 'src/app/services/quiz.service';
import { LeaderBoardRequest } from '../leaderboard/LeaderBoardRequest';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories;
  catId;
  activeCategory: number | null = null;
  catIdFromLocalStorage : number;
  categoriess = [
    // ... your category data
  ];

  user: any;
  leaderboardData: any[] = [];
  
  constructor(private _cat: CategoryService,
     private _snack: MatSnackBar,
     private _quiz: QuizService,
     private _route: ActivatedRoute
    //  private loadquiz: LoadQuizComponent
     )
       {}

  ngOnInit(): void {
    // this.fetchLeaderboardData();
    
    // this.catIdFromLocalStorage = Number(localStorage.getItem('catId'));
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );

  }

  onCategoryClick(categoryId: number | null) {
    this.catIdFromLocalStorage = Number(localStorage.getItem('catId'));
    // console.log(this.catIdFromLocalStorage);
    this.activeCategory = categoryId;
    console.log('catIDDD');
    console.log(this.activeCategory);
  }

  // fetchLeaderboardData() {
  //   // this.catIdFromLocalStorage= Number(localStorage.getItem('catId'));
  //   this._quiz.getLeaderboardData(this.catIdFromLocalStorage).subscribe(
  //     (data: LeaderBoardRequest[]) => {
  //       console.log(data);
  //       this.leaderboardData = data;
  //       console.log(this.leaderboardData);
  //     },
  //     (error) => {
  //       console.error('Error fetching leaderboard data:', error);
  //     }
  //   );
  //   }

    // onclickk(){
    //   // this._route.params.subscribe((params) => {
    //   //   this.catId = params.catId;
    //   //   console.log('&*^*%&');
    //   //   console.log(this.catId);
    //   // });
    //   // console.log(this.loadquiz.catId);
    //   // console.log('***&^^&%');
    //   // console.log(this.loadquiz.catId);
    //   this.fetchLeaderboardData();
    //   this.updateLocalStorage();
    // }

    updateLocalStorage(){
      const leaderboardDataJSON = JSON.stringify(this.leaderboardData);
      localStorage.setItem('leaderboardData', leaderboardDataJSON);
    }
}
