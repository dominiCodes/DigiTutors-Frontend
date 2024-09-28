import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LeaderBoardRequest } from '../pages/user/leaderboard/LeaderBoardRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get the single quiz

  public getQuiz(qId) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  //qet active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  public updateLeaderBoard(request: LeaderBoardRequest): Observable<any> {
    console.log('---------_*********------------&');
    console.log(request);
    // const headers= new HttpHeaders({'Content-type': 'application/json'});
    return this._http.post(`${baseUrl}/quiz/leaderboard`, request);
  }

  // public getLeaderboardData(cid): Observable<any[]> {
  //   return this._http.get<any[]>(`${baseUrl}/quiz/leaderboard/${cid}`);
  // }

  public getLeaderboardData(): Observable<any[]> {
    return this._http.get<any[]>(`${baseUrl}/quiz/leaderboard/`);
  }

  getAllUsersOrderByUserScore(): Observable<any[]> {
    return this._http.get<any[]>(`${baseUrl}/quiz/leaderboard/users`);
  }
}
