import MachineName from "./machine-name";
import UserName from "./user-name";

interface Unit {
  id: number;
  name: string;
  companyId: number;
  machines: MachineName[];
  users: UserName[];
}

export default Unit;
