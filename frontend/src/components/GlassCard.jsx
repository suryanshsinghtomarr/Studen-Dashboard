import { motion } from 'framer-motion'

function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(99,102,241,0.14)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
