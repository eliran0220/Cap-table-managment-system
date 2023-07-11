import { Holder } from "../models/models";
import { ApiResponse } from "../models/res.models";
import http_requests from "../utils/http_requests";

class SharesService {
     async allocateShares(holder_id: number, quantity: number, totalShares: number, holders: Holder[]): Promise<{holders_array: Holder[], total_shares: number}> {
        const response = await http_requests.allocateShares(holder_id, quantity);
        const { success, data, message }: ApiResponse<number> = await response.json();
        let total_shares = 0;
        let holders_array : Holder[];
        if (success) {
          total_shares = totalShares + quantity;
          holders_array = [...holders];
          for (let i = 0; i < holders_array.length; i++) {
            if (holders_array[i].id === holder_id) {
              holders_array[i].quantity += quantity;
              holders_array[i].shares_precentage = Number((holders_array[i].quantity / total_shares).toFixed(4)) * 100;
            } else {
              holders_array[i].shares_precentage = Number((holders_array[i].quantity / total_shares).toFixed(4)) * 100;
            }
          }
          return { holders_array, total_shares };
      } else {
        holders_array = holders;
        total_shares = totalShares;
        return {holders_array, total_shares}
      }
      };

      async redeemShares(holder_id: number,quantity: number,totalShares: number,holders: Holder[]): Promise<{holders_array: Holder[], total_shares: number}>{
        const response = await http_requests.redeemShares(holder_id, quantity);
        let holders_array : Holder[];
        let total_shares: number = 0;
        const { success, data, message }: ApiResponse<number> = await response.json();
        if (success) {
          const modifiedHolders = [...holders];
          const new_totalShares = totalShares - quantity;
          console.log(modifiedHolders,new_totalShares)
          for (let i = 0; i < modifiedHolders.length; i++) {
            if (modifiedHolders[i].id === holder_id) {
              modifiedHolders[i].quantity -= quantity;
              new_totalShares === 0 ? modifiedHolders[i].shares_precentage = 0 :modifiedHolders[i].shares_precentage = Number((modifiedHolders[i].quantity / new_totalShares).toFixed(4)) * 100;
            } else {
              new_totalShares === 0 ? modifiedHolders[i].shares_precentage = 0 :modifiedHolders[i].shares_precentage = Number((modifiedHolders[i].quantity / new_totalShares).toFixed(4)) * 100;
            }
          }
          holders_array = modifiedHolders;
          total_shares = new_totalShares;
          return {holders_array, total_shares};
        } else {
          holders_array = holders;
          total_shares = totalShares
          return {holders_array,total_shares};
        }
      };
}

const shares_service = new SharesService();
export default shares_service;