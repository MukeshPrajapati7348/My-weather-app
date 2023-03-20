import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-weather-comp',
  templateUrl: './weather-comp.component.html',
  styleUrls: ['./weather-comp.component.less']
})
export class WeatherCompComponent implements OnInit, OnDestroy {

  days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  minutes:any;
  hours:any; 
  seconds:any;
  day:any;
  today:any;
  month:any;
  year:any;
  date:any;
  meredianType:string = 'AM';
  city:string = 'delhi';
  country:string = '';
  humidity:any;
  pressure:any;
  minTemp:any;
  maxTemp:any;
  weatherType:any;
  wind:any;
  deg:any;
  sunrise:any;
  sunset:any;
  isLoading:boolean = true;
  cityNotFound: boolean = false;
  // mySearchForm:FormGroup;
  cityRequiredError:boolean = false;
  
  constructor(private httpService:AppServiceService, private fb: FormBuilder) {
    // this.mySearchForm = this.fb.group({
    //   city:['', [Validators.required]]
    // })
  }

  // get f() { return this.mySearchForm.controls;}
  
  //Method to set minuetes, hours , seconds and more
  getDateTimeDays() {
    let date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.day = this.days[date.getDay()];
    this.today = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    if(this.hours > 12) {
      this.hours = `0${this.hours - 12}`;
      this.meredianType = "PM";
    }
    else {
      if(this.hours < 10) {
        this.hours = `0${this.hours}`;
      }
      // this.hours = `0${this.hours}`;
      this.meredianType = "AM";
    }
    
    if(this.minutes <= 9) {
      this.minutes = `0${this.minutes}`;
    }

    if(this.seconds <= 9) {
      this.seconds = `0${this.seconds}`;
    }
  }
  
  //A timer to call date method every second and update the datetimes accordingly
  timerId = setInterval(()=>this.getDateTimeDays(),1000);
  


  //Input search Query processing when enter key or button is pressed
  search(e:any) {
    let v = e.value;
    if(v.length == 0) {
      this.cityRequiredError = true;
      return;
    }
    this.cityRequiredError = false;
    this.isLoading = true;
    this.fetchData(v);
    // console.log('Query response',data);
  }

  //API call and fetch data
    fetchData(value:any) {
      return this.httpService.getWeatherDetails(value).subscribe(data => {
        if(data) {
          this.isLoading = false;
          this.cityNotFound = false;
          // console.log('the data is ',data);
          this.setValues(data);

        }
      },
      //To handle the error
      error =>{
        if(error) {
          this.isLoading = false;
          this.cityNotFound = true;
          // console.log('Please enter correct city name!');
        }
      }
      // ,
      // (error) => {
      //   console.log(error);
      // }
      );
}
  //When city name is incorrect
  takeHome() {
    this.cityNotFound = false;
  }


  //Setting recieved JSON data
  setValues(data:any) {
      this.minTemp = data.main.temp_min;
      this.maxTemp = data.main.temp_max;
      this.city = data.name;
      this.country = data.sys.country;
      this.weatherType = data.weather[0].main; 
      this.humidity = data.main.humidity;
      this.pressure = data.main.pressure;
      this.wind = data.wind.speed;
      this.deg = data.wind.deg;
      this.sunrise = data.sys.sunrise;
      this.sunset = data.sys.sunset;
  }

  ngOnInit(): void {
    // Make a call whenever Component initializes
    this.fetchData(this.city);
  }

  ngOnDestroy(): void {
    // when component is destroyed, stop the interval
    clearInterval(this.timerId);
  }

}
