import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Subject, combineLatest } from 'rxjs';
import { map, tap, takeUntil, filter } from 'rxjs/operators';

import { Estimate } from '../../../common-estimator/models/estimator.model';
import { EstimatorService } from '../../../common-estimator/services/estimator/estimator.service';

@Component({
	selector: 'app-estimator',
	templateUrl: './estimator.component.html',
	styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit, OnDestroy, OnChanges {

	private progress: number = 0;
	public ngUnsubscribe = new Subject();
	public estimates: Estimate[];
	constructor(private estimatorService: EstimatorService) { }

	ngOnInit() {
		this.initEstimates();
	}

	ngOnChanges() {
		this.estimates = this.estimates.splice(0,0);
		console.log('onchages: ', this.estimates)
		console.log(this.estimates)
	}

	ngOnDestroy() {
		this.ngUnsubscribe
	}

	private initEstimates() {
		const subject = this.estimatorService.all(1);
		combineLatest(
    
			subject.SalEstimate$
		  ).pipe(
			takeUntil(this.ngUnsubscribe),
			tap(([s]) => {
		  })).subscribe(([estimates]) => {
			this.estimates = estimates;
		  }),
		  filter(([s]) => !!s ),
		  map(([SalEstimate]) => {
			const estimateState = {
			  estimatesList: SalEstimate
			}
			this.estimates = estimateState.estimatesList
		  } )
	}	

}
