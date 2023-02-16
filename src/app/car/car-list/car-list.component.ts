import {Component, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: Car[] | null = []
  private subject: Subject<string> = new Subject();

  constructor(private carService: CarService) {

  }

  ngOnInit() {
    this.handleSearch()
  }

  private handleSearch() {
    this.subject.pipe(
      debounceTime(500)
    )
      .subscribe(searchTextValue => {
      this.getFilteredCars(searchTextValue)
    });
  }

  search(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  private getFilteredCars(model: string) {
    return this.carService.getFilteredCars(model)
      .subscribe(filtered => {
        this.cars = filtered
      })
  }

}
