interface CompanyResponse {
  id: number;
  name: string;
}

export const companyResponseError: CompanyResponse = {
  id: -1,
  name: "Error",
};

export default CompanyResponse;
