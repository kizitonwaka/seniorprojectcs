import { EstimateInterface } from '../models/estimator.model';

//our response from database should be an array of Estimate interfaces
export interface EstimatorResponse {
    Estimator: Array<EstimateInterface>;
}
