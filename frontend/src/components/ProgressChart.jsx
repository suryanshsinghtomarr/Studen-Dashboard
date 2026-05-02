import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import GlassCard from './GlassCard.jsx'

function ProgressChart({ data }) {
  return (
    <GlassCard className="p-5">
      <h3 className="mb-4 text-lg font-bold text-white">Hours Per Subject</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
            <XAxis dataKey="subject" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(148,163,184,.25)',
                borderRadius: 12,
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="hours" fill="#6366F1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

export default ProgressChart
