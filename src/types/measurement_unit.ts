
export interface MeasurementUnit {
  id: number;
  title: string;
  value: number;
  // created_at: string;
  // updated_at: string;
}
export interface CreateMeasurementUnit {
  title: string;
  value: number;
}

export interface UpdateMeasurementUnit {
  title?: string;
  value?: number;
}