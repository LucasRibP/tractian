import { Obj } from "reselect/es/types";
import AssetResponse from "../../../../core/network/tractian-api/server-responses/asset-response";

interface Machine extends AssetResponse {
  unitName: string;
  companyName: string;
  delegateId?: number;
  delegateName?: string;
}

const machineKeyTranslations: Obj<string> = {
  rpm: "Rotação",
  maxTemp: "Temperatura Máxima",
  power: "Potência",
  totalCollectsUptime: "Total de Coletas Uptime",
  totalUptime: "Total de Horas de Coletas Uptime",
  lastUptimeAt: "Data da Ultima Coleta Uptime",
};

const machineValuesUnits: Obj<string> = {
  rpm: "RPM",
  maxTemp: " °C",
  power: "kWh",
  totalCollectsUptime: "",
  totalUptime: " Horas",
  lastUptimeAt: "",
};

const machineStatusTranslations: Obj<string> = {
  inAlert: "Em Alerta",
  inOperation: "Em Operação",
  inDowntime: "Em Parada",
};

const machineStatusColors: Obj<string> = {
  inAlert: "ff0000",
  inOperation: "a1ff0a",
  inDowntime: "147df5",
};

export default Machine;

export {
  machineKeyTranslations,
  machineValuesUnits,
  machineStatusTranslations,
  machineStatusColors,
};
