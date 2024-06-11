import { createContext, Dispatch } from "react";
import Plans from "../class/Plans";
import { PlansAction } from "../reducer/PlansReducer";

export const PlansContext = createContext<Plans | undefined>(undefined);
export const PlansDispatchContext = createContext<Dispatch<PlansAction> | undefined>(undefined);