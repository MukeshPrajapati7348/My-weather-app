import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherCompComponent } from './weather-comp/weather-comp.component';

const routes: Routes = [{path:'', component:WeatherCompComponent},
{path:'**', redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
