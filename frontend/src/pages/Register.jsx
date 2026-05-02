import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import GlowButton from '../components/GlowButton.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await register(formData.name, formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0F1E] text-white">
      <div className="aurora-layer" />
      <div className="relative z-10 grid min-h-screen md:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-white/10 p-10 md:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Student Success</p>
            <h1 className="mt-4 text-5xl font-extrabold text-gradient">Create Your Space</h1>
            <p className="mt-4 max-w-md text-slate-300">Design your study rhythm with elegant planning, smart tracking, and meaningful focus.</p>
          </div>
        </div>

        <div className="grid place-items-center p-5">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-extrabold">Create Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="floating-group relative">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
                <label className="floating-label">Full Name</label>
              </div>

              <div className="floating-group relative">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
                <label className="floating-label">Email</label>
              </div>

              <div className="floating-group relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input pr-11"
                  required
                />
                <label className="floating-label">Password</label>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error ? <p className="text-sm text-red-300">{error}</p> : null}

              <GlowButton type="submit" className="ripple-btn w-full py-3 text-base">Create Account</GlowButton>
            </form>

            <p className="mt-5 text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
