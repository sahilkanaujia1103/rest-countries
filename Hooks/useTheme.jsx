import { useContext } from "react";
import { Themecontext } from "../contexts/Themecontext";

export function useTheme(){
    const [isdark,setisdark] = useContext(Themecontext);
    return([isdark,setisdark])
}