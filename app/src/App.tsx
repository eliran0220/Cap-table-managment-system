import { useState, useEffect } from "react";
import {Holder} from './models/models';
import  './css/app.css';
import http_requests from "./utils/http_requests";
import shares_service from './services/shares_service';
import holders_service from "./services/holders_service";
const App = () => {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [newHolder, setNewHolder] = useState('');
  const [totalShares,setTotalShares] = useState(0);
  const [quantity,setQuantity] = useState(0);

  const addHolder = async () => {
    const [updatedHolders,message] = await holders_service.addHolder(newHolder, holders);
    setHolders(updatedHolders)
  };

  const allocateShares = async (holder_id: number) => {
    if (quantity <= 0) return;
    const { holders_array, total_shares } = await shares_service.allocateShares(holder_id, quantity, totalShares, holders);
    setHolders(holders_array);
    setTotalShares(total_shares);
    setQuantity(0);
  };

  const redeemShares = async (holder_id: number) => {
    if (quantity <= 0) return;
    const { holders_array, total_shares } = await shares_service.redeemShares(holder_id,quantity,totalShares,holders);
    setHolders(holders_array);
    setTotalShares(total_shares);
    setQuantity(0);
  }

  const deleteHolder = async (holder_id: number) => {  
    const [modifiedHolders,message] = await holders_service.deleteHolder(holder_id, holders);
    setHolders(modifiedHolders);
  };

  useEffect(()=> {
    (async () => {
      const {holders,total_shares} = await http_requests.getHolders();
      setHolders(holders);
      setTotalShares(total_shares)
    })();
  },[])

  return (
    <div className="holder-table">
      <h1>Cap table managment dashboard</h1>
      <div className="holder-list">
        {holders.map((holder, index) => (
          <div key={holder.id} className="holder-item">
            <div className="holder-details">
              <div className="holder-name">{holder.name}</div>
              <div className="holder-meta">
                Number of shares: {holder.quantity}
              </div>
              <div className="holder-meta">
                  {`Shares precentage: ${holder.shares_precentage}`}
              </div>
            </div>
            <div className="holder-actions">
              <button className="allocate-button"
                onClick={() => allocateShares(holder.id)}
              >
                Allocate
              </button>
              <button
                className="redeem-button"
                onClick={() => redeemShares(holder.id)}
              >
                Redeem
              </button>
              {holder.quantity === 0 ? (
                <button className="delete-button" onClick={() => deleteHolder(holder.id)}>Delete</button>) : ( null )}
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <h2>Total shares: ${totalShares}</h2>
        <div className="add-holder">
        <button onClick={() => addHolder()}>Add Holder</button>
        <input
          type="text"
          value={newHolder}
          onChange={(e) => setNewHolder(e.target.value)}
          placeholder="Enter new holder name"
        />
        </div>
        <div className="new-holder">
          <h2>Shares to allocate | Redeem</h2>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
