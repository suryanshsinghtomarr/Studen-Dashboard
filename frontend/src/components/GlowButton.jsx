import { motion } from 'framer-motion'

function GlowButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-500 px-4 py-2 font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)] transition hover:shadow-[0_14px_40px_rgba(34,211,238,0.35)] ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default GlowButton
