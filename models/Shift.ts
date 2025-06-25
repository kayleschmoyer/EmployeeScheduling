export interface Shift {
  id: number
  empId: number
  shopId: number
  startTime: Date
  endTime: Date
  createdBy?: string
  notes?: string
  empName?: string
}
