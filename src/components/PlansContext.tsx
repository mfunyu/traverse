import { createContext } from "react";
import Plans from "../class/Plans";

export const PlansContext = createContext<Plans>(new Plans([]));
//@ts-ignore
export const PlansDispatchContext = createContext<React.Dispatch<any>>(null);