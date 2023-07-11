import { createContext } from 'react';
import { Holder } from '../models/models';

type AppContextType = {
  holders: Holder[];
  addHolder: (newHolder: string) => void;
  allocateShares: (holder_id: number) => void;
  redeemShares: (holder_id: number) => void;
  deleteHolder: (holder_id: number) => void;
};

export const AppContext = createContext<AppContextType>({
  holders: [],
  addHolder: () => {},
  allocateShares: () => {},
  redeemShares: () => {},
  deleteHolder: () => {},
});