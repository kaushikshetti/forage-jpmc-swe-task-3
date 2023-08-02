import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number,
  timestamp: Date,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upper_bound = 1 + 0.1;
    const lower_bound = 1 - 0.1;
    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;

    return [{
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert,
      timestamp: serverResponds[0].timestamp,
    }];
  }
}
