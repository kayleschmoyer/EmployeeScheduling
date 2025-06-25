import { Shift } from '../models/Shift'
import ShiftCard from './ShiftCard'

interface Props {
  shifts: Shift[]
}

export default function Calendar({ shifts }: Props) {
  const startOfWeek = new Date()
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const days = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000))

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div key={day.toISOString()} className="border p-2 min-h-[150px]">
          <div className="font-semibold text-sm">
            {day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          {shifts
            .filter((s) => new Date(s.startTime).toDateString() === day.toDateString())
            .map((shift) => (
              <ShiftCard key={shift.id} shift={shift} />
            ))}
        </div>
      ))}
    </div>
  )
}
