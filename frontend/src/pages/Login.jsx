import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
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
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section className="min-h-screen bg-[#0d1117] text-white">
      <div className="grid min-h-screen md:grid-cols-5">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#1a1040] to-[#0d1117] p-12 md:col-span-3 md:flex md:flex-col">
          <div className="absolute -left-16 -top-10 h-56 w-56 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute right-12 top-16 h-44 w-44 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-6 left-1/3 h-60 w-60 rounded-full bg-cyan-400/30 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <p className="text-[28px] font-extrabold tracking-tight text-white">FocusFlow</p>
          </div>

          <div className="relative z-10 mt-auto mb-auto max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Plan smarter.
              <br />
              Study deeper.
            </h1>
            <p className="mt-6 text-lg text-slate-400">
              Achieve more with a stunning productivity workspace
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-md">
                ✦ Timetable
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-md">
                ✦ Goal Tracker
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-md">
                ✦ Task Manager
              </span>
            </div>
          </div>

          <div className="relative z-10" />
        </aside>

        <main className="flex items-center justify-center bg-[#0d1117] px-4 py-10 md:col-span-2 md:px-8">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <h2 className="text-[28px] font-bold text-white">Welcome Back</h2>
            <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
              </div>

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-200 hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/25"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              New here?{' '}
              <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300">
                Create account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Login
