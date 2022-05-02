interface UserResponse {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

export const userResponseError: UserResponse = {
  id: -1,
  email: "",
  name: "Error",
  unitId: -1,
  companyId: -1,
};

export default UserResponse;
