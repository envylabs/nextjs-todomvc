import { createContext } from 'react';
import { Store } from '../models/store';

export const StoreContext = createContext(new Store());
