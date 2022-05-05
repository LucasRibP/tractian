import UserResponse from "../../../../core/network/tractian-api/server-responses/user-response";
import MachineHeader from "../../../../core/types/common-entities/machine-header";

interface User extends UserResponse {
  unitName: string;
  companyName: string;
  delegatedMachine: MachineHeader;
}
export default User;
