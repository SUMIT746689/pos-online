import { Role } from "@/types/role";

export interface AuthLogIn {
  env: string;
  token: string;
}

export interface AuthUser {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  role_id: number,
  photo?:string;
  edges: {
    role: Role
  }
}
