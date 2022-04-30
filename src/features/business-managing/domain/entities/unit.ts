import MachineName from "./machine-name";
import WorkerName from "./worker-name";

interface Unit {
  id: number;
  name: string;
  companyId: number;
  machineIds: MachineName[];
  workerIds: WorkerName[];
}

export default Unit