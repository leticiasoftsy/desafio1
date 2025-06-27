import UserForm from "./form";

export default function HomePage(){
    return(
       <>
       <div style={{color: 'lightskyblue'}}>
       <h1 className="fs-1 mb-4 text-center">Bem vindo(a)!</h1>
       </div>
       <UserForm></UserForm>
       
       </>
    )
}