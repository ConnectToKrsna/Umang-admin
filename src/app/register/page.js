import Link from "next/link";


const getRegister = async () =>{
    let data = await fetch("http://localhost:3000/api/register", {cache: 'no-store'} );
    data = await data.json();
    if(data.success){
        return data.result;
    }else{
        return {success:false}
    }
}
export default async function Page(){
    const registrations = await getRegister();
    console.log(registrations)
    return (
        <div>
        <nav>
        <div>
        <h1 >Hare Krishna</h1>
        </div>
        <div>
        <Link href="/" >Home</Link>
        </div>
        </nav>
        
            <h1>Registration List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <td>name</td>
                        <td>email</td>
                        <td>contact</td>
                        <td>occupation</td>
                        <td>address</td>
                        <td>remarks</td>
                        <td>registeredBy</td>
                        <td>paid</td>

                    </tr>
                </thead>
                <tbody>
                    {
                        registrations.map((user) => (<tr key={user.id}>
                            <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.occupation}</td>
                        <td>{user.address}</td>
                        <td>{user.remarks}</td>
                        <td>{user.registeredBy}</td>
                        <td>{user.paid}</td>

                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}