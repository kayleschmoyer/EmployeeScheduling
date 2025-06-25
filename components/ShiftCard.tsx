import { Shift } from '../models/Shift'

interface Props {
  shift: Shift
}

export default function ShiftCard({ shift }: Props) {
  return (
    <div className="bg-gray-100 mt-1 p-1 rounded text-xs">
      <div>{shift.empName}</div>
      <div>
        {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
        {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  )
}
