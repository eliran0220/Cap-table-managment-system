import { Holder } from "../models/models";

class HttpRequests {
     async getHolders () {
        let holders: Holder[] = [];
        let total_shares = 0;
        try {
            const response = await fetch('http://localhost:5001/api/holder');
            const result = await response.json();
            if (response.ok) {
                const data : Holder[] = result.map((holder: Holder) => {
                    total_shares += holder.quantity;
                    return (
                        holder = {
                            ...holder,
                            shares_precentage: 0
                        }
                    )
                });
                holders = data;
                if (total_shares !== 0) {
                    for (let i = 0; i < holders.length; i++) {
                        holders[i].shares_precentage = Number((holders[i].quantity / total_shares).toFixed(2))*100;
                    }
                }
            } else {
                console.log('Failed to fetch data from the server.');
            }
            return {holders: holders,total_shares: total_shares};
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async addHolder(holder_name: string) {
        try {
            const data = {
                name: holder_name
              };
            const response = await fetch('http://localhost:5001/api/holder', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data) 
            })
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async allocateShares(holder_id: number,quantity: number) {
        try {
            const data = {
                holder_id: holder_id,
                quantity: quantity
              };
            const response = await fetch(`http://localhost:5001/api/allocate/${encodeURIComponent(holder_id)}`, {
                method: 'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data) 
            })
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async redeemShares(holder_id: number,quantity: number) {
        try {
            const data = {
                quantity: quantity
              };
            console.log(data);
            const response = await fetch(`http://localhost:5001/api/redeem/${encodeURIComponent(holder_id)}`,{
                method: 'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data) 
            })
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async deleteHolder(holder_id: number) {
        try {
            const response = await fetch(`http://localhost:5001/api/holder/${encodeURIComponent(holder_id)}`, {
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'}
            })
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

const http_requests = new HttpRequests();
export default http_requests;