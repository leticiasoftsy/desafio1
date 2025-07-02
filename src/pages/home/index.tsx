import { useParams } from "react-router-dom";
import UserForm from "./form";


export default function HomePage(){

const { id } = useParams<{ id?: string }>();

    return(
       <>

       <UserForm id={id}/>
       
       </>
    )
}