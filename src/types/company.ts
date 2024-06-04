

export interface Company {
  id: number;
  name: string;
  domain: string;
  created_at: string;
  updated_at: string;
}
export interface CreateCompany {
  name: string;
  domain: string;
}

export interface UpdateCompany { 
  name?: string;
  domain?: string;
}