import { Holder } from "../models/models";
import { ApiResponse } from "../models/res.models";
import http_requests from "../utils/http_requests";

class HoldersService {
    async addHolder (newHolder: string, holders: Holder[]) : Promise<[Holder[],string]>  {
      let holder: Holder;
        if (newHolder.trim().length === 0) {
          console.log("Can not be an empty name!");
          return [holders,'Can not be an empty name!']
        } else {
          const response = await http_requests.addHolder(newHolder);
          const { success, data, message }: ApiResponse<number> = await response.json();
          if (success) {
             holder = {
              id: data,
              name: newHolder,
              quantity: 0,
              shares_precentage: 0
            }
            return [[...holders, holder],message || 'Success!'];
          } else {
            return [[...holders],message || 'Error!'];
          }
        }
      };

    async deleteHolder (holder_id: number, holders: Holder[]): Promise<[Holder[],string]> {
        const response = await http_requests.deleteHolder(holder_id);
        const { success, data, message }: ApiResponse<number> = await response.json();
        if (success) {
          const modifiedHolders = holders.filter((holder: Holder) =>holder.id !== holder_id)
          return [modifiedHolders,message || `User with id: ${holder_id} deleted`];
        }
        return [holders,message || `Error deleting holder: ${holder_id}`];
      };
}

const holders_service = new HoldersService();
export default holders_service;