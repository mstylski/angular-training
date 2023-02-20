import {TestBed} from '@angular/core/testing';

import {CarService} from './car.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import {carMock} from './car.mock';

describe('CarService', () => {
  let service: CarService;
  let http: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    http = createSpyObj('http', ['get'])

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: http}
      ]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getFilteredCars with proper params', (done: DoneFn) => {
    http.get.withArgs('https://api.api-ninjas.com/v1/cars', {
      headers: {'X-Api-Key': 'QLfQfH+EH3sBRsWVw1LnMg==m8mQWfEa5R3rr3Sv'},
      params: {
        limit: 15,
        model: 'ford'
      }
    }).and.returnValue(of(carMock))

    const result = service.getFilteredCars('ford')

    result.subscribe(response => {
      expect(response).toEqual(carMock as unknown as any)
      done()
    })
  });
});
