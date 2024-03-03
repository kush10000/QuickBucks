import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard(){
    return <div>
        <AppBar user={"kush"}></AppBar>
        <Balance balance={"10,100"}></Balance>
        <Users></Users> 
    </div>
}