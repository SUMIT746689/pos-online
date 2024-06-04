export interface Permission{
        id: number,
        value: string,
        // edges: {}
}

export interface Role {
  id: number,
  create_time: TimeRanges,
  update_time: TimeRanges,
  title: string,
  value: string,
  edges: {
    permissions: Permission[]
  } | Record<string, never>
}