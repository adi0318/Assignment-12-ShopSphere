import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      setSuccess(true);
      setMessage("Account created successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const data = error.response?.data;

      if (data?.errors) {
        const fieldErrors = {};

        data.errors.forEach((item) => {
          fieldErrors[item.path] = item.msg;
        });

        setErrors(fieldErrors);
      } else {
        setMessage(data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/3 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-slate-800/30 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-slate-800/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-950 shadow-lg shadow-black/20">
            S
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            ShopSphere
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Start managing your products today.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Enter your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                    errors.name
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-800 focus:border-slate-500"
                  }`}
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                    errors.email
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-800 focus:border-slate-500"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                    errors.password
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-800 focus:border-slate-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Confirm password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                    errors.confirmPassword
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-800 focus:border-slate-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
                  success
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                {success && (
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                )}

                <p
                  className={`text-sm ${
                    success ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />

            <span className="text-xs text-slate-600">OR</span>

            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white transition hover:text-slate-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Secure authentication powered by ShopSphere
        </p>
      </div>
    </main>
  );
};

export default Register;

