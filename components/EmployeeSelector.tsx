import { Employee } from '../models/Employee'

interface Props {
  employees: Employee[]
}

export default function EmployeeSelector({ employees }: Props) {
  return (
    <select className="border p-1 mb-2">
      <option value="">All Employees</option>
      {employees.map((emp) => (
        <option key={emp.empId} value={emp.empId}>
          {emp.name}
        </option>
      ))}
    </select>
  )
}
