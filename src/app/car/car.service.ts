import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  getFilteredCars(model: string): Observable<Car[]> {
    return this.http.get<Car[]>('https://api.api-ninjas.com/v1/cars', {
      headers: {'X-Api-Key': 'QLfQfH+EH3sBRsWVw1LnMg==m8mQWfEa5R3rr3Sv'},
      params: {
        limit: 15,
        model: model
      }
    })
  }
}
