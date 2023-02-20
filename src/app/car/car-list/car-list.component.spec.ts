import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CarListComponent} from './car-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CarService} from '../car.service';
import {of} from 'rxjs';
import {carMock} from '../car.mock';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let carService: jasmine.SpyObj<CarService>

  beforeEach(async () => {
    carService = jasmine.createSpyObj('carService', {
      getFilteredCars: of(carMock)
    })

    await TestBed.configureTestingModule({
      declarations: [CarListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: CarService, useValue: carService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger required validation', () => {
    component.searchFormControl.patchValue('')

    expect(component.searchFormControl.hasError('required')).toBeTruthy();
  });

  it('should not trigger required validation', () => {
    component.searchFormControl.patchValue('ford')

    expect(component.searchFormControl.hasError('required')).toBeFalsy();
  });

  it('should properly get typed value', () => {
    component.searchFormControl.patchValue('dacia')

    expect(component.searchFormControl.value).toEqual('dacia')
  });

  it('should call getFilteredCars', () => {
    const spy = spyOn(component, 'getFilteredCars')
    const button = fixture.nativeElement.querySelector('.search-button')

    component.searchFormControl.patchValue('ford')
    fixture.detectChanges()
    button.click()

    expect(spy).toHaveBeenCalled();
  });
});
