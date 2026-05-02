const palettes = [
  'from-violet-500 to-indigo-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-pink-500 to-fuchsia-500',
]

const hashSubject = (subject) =>
  subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

function SubjectBadge({ subject }) {
  const index = hashSubject(subject) % palettes.length

  return (
    <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${palettes[index]} px-3 py-1 text-xs font-semibold text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]`}>
      {subject}
    </span>
  )
}

export default SubjectBadge
