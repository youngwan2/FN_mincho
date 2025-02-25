import {  useMatch } from "react-router";




export default function usePathType() {


    const isMatch = useMatch("herbs/:herbId")


    return !!isMatch    ;

}