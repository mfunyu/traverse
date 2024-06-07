import { createContext } from "react";
import { PlanObject } from "../types/plan";

export const PlansContext = createContext<PlanObject[]>([]);
//@ts-ignore
export const PlansDispatchContext = createContext<React.Dispatch<any>>(null);