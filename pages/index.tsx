import { useEffect, useState } from 'react'
import { Shift } from '../models/Shift'
import Calendar from '../components/Calendar'
import { Employee } from '../models/Employee'
import EmployeeSelector from '../components/EmployeeSelector'

export default function Home() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [sRes, eRes] = await Promise.all([
        fetch('/api/schedule'),
        fetch('/api/employees'),
      ])
      if (sRes.ok) setShifts(await sRes.json())
      if (eRes.ok) setEmployees(await eRes.json())
    }
    fetchData()
  }, [])

  return (
    <div className="p-4">
      <EmployeeSelector employees={employees} />
      <Calendar shifts={shifts} />
    </div>
  )
}
