import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estimate } from '../../models/estimator.model';
import { EstimateInterface, SalEstimateResponse, EstimateResponse } from '../../models/estimator.model';
import {HttpClient} from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})
export class EstimatorService {

uri = 'http://localhost:4000/estimate';

  constructor(private http: HttpClient) { }

  addEstimate(obj) {
    console.log(JSON.stringify(obj));
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done: '+JSON.stringify(obj)));
  }
private getEstimates(est) {
	let myEstimates = est.map((obj) => new Estimate(obj));
	return myEstimates;
}
public all():Observable<Object>{
	return this.http.get(`${this.uri}`)
	}
}