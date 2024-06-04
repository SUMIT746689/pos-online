
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  role_id: number;
  company_id: number;

}
export interface CreateUser {
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  role_id: number;
  company_id?: number;
}

export interface GetAllUsersInterface{
  users: User[] | []
}

export interface UpdateUserBody {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  role_id?: number;
}
export interface UpdateUser {
  user_id: number ;
  body: UpdateUserBody;
}
