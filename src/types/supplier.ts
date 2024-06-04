

export interface Supplier {
  id: number;
  name: string;
  address: string;
  email: string;
  representative: {
    name: string;
    phone: string;
  }
}
export interface CreateSupplier {
  name: string;
  address: string;
  email?: string;
  representative: {
    name: string;
    phone: string;
  }
}

export interface UpdateSupplier {
  name?: string;
  address?: string;
  email?: string;
  representative: {
    name?: string;
    phone?: string;
  }
}