interface MachineDataUpdate {
  id: number;
  model?: string;
  status?: string;
  healthscore?: number;
  name?: string;
  specifications?: {
    maxTemp?: number;
    power?: number;
    rpm?: number;
  };
}

export default MachineDataUpdate;
