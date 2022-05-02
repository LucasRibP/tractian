interface UnitResponse {
  id: number;
  name: string;
  companyId: number;
}

export const unitResponseError: UnitResponse = {
  id: -1,
  name: "Error",
  companyId: -1,
};

export default UnitResponse;
