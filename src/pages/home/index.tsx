import UserForm from "./form";

export default function HomePage(){
    return(
       <>
       <div className="d-flex flex-column align-items-center justify-content-center p-4">
       <h1 className="text-center text-primary fw-bold border-bottom pb-2 mb-4">
         Bem vindo(a)!
       </h1>
       </div>
       <UserForm></UserForm>
       
       </>
    )
}