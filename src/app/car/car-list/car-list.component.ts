import {Component} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {FormControl, Validators} from '@angular/forms';
import {catchError, Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  cars$!: Observable<Car[]>;
  searchFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private carService: CarService) {
  }

  getFilteredCars() {
    this.cars$ = this.carService.getFilteredCars(this.searchFormControl.value)
      .pipe(catchError(() => throwError(() => new Error('error'))))
  }

  trackBy(index: number, value: any) {
    return value.model
  }
}
