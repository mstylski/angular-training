import {Component} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {FormControl, Validators} from '@angular/forms';
import {take} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  cars: Car[] = [];
  searchFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private carService: CarService) {
  }

  getFilteredCars() {
    return this.carService.getFilteredCars(this.searchFormControl.value)
      .pipe(take(1))
      .subscribe(car => this.cars = car);
  }
}
