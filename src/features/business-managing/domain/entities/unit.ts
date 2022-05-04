import UserName from "./user-name";
import MachineHeader from "../../../../core/types/common-entities/machine-header";

interface Unit {
  id: number;
  name: string;
  companyId: number;
  machines: MachineHeader[];
  users: UserName[];
}

export default Unit;
