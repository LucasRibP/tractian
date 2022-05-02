interface AssetResponse {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp?: number;
    power?: number;
    rpm?: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  companyId: number;
}

export const assetResponseError: AssetResponse = {
  id: -1,
  sensors: [],
  model: "",
  status: "",
  healthscore: -1,
  name: "Error",
  image: "",
  specifications: {},
  metrics: {
    totalCollectsUptime: -1,
    totalUptime: -1,
    lastUptimeAt: "",
  },
  unitId: -1,
  companyId: -1,
};

export default AssetResponse;
