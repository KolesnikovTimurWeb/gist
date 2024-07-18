import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata:Metadata = {
   title:"New job"
}  

export default function Page(){
   return <NewJobForm/>
}