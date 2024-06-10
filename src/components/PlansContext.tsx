import { createContext } from "react";
import Plan from "../class/Plan";

export const PlansContext = createContext<Plan[]>([]);
//@ts-ignore
export const PlansDispatchContext = createContext<React.Dispatch<any>>(null);