

export interface Vendor {
  id: number;
  name: string;
  address: string;
  email: string;
  representative: {
    name: string;
    phone: string;
  }
}
export interface CreateVendor {
  name: string;
  address: string;
  email?: string;
  representative: {
    name: string;
    phone: string;
  }
}

export interface UpdateVendor {
  name?: string;
  address?: string;
  email?: string;
  representative: {
    name?: string;
    phone?: string;
  }
}