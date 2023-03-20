import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  APIkey = 'bfd77c5fff986faa5d6c70ba0f7b70b5';
  query:string = '';
  // query:string = `https://api.openweathermap.org/data/2.5/weather?q=,IN&appid=${this.APIkey}`;

  
  constructor(private Http: HttpClient) { }
  
  getWeatherDetails(city:any) :Observable<any> {
    this.query = `${this.url}${city}&appid=${this.APIkey}&units=metric`
    return this.Http.get<any>(this.query);
  }
}
