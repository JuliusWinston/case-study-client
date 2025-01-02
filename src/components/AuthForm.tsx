import { useState } from "react"
import { login } from "../services"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../state/store"
import { setUserInfo } from "../state/User/UserSlice"

const AuthForm = () => {
  const [authState, setAuthState] = useState<string>("login")
  const [authInfo, setAuthInfo] = useState<{ username?: string, email: string, password: string, confirmPassword?: string }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [authError, setAuthError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async () => {
    setAuthError("")
    if ((authInfo.email === "" || authInfo.password === "") || (authState === "register" && authInfo.username === "")) {
      setAuthError("All fields are required!")
      return
    }

    try {
      setLoading(true)

      if (authState === "login") {
        const response = await login(authInfo.email, authInfo.password)

        if (response.message === 'Invalid credentials') {
          setAuthError(response.message)
        } else {
          dispatch(setUserInfo({
            name: response.user.name,
            email: response.user.email,
            token: response.token,
            preferences: {
              categories: [],
              sources: [],
              authors: [],
            }
          }))
        }
      } else {
        console.log("Registering: ", authInfo)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-5 bg-light">
        <form onSubmit={(e) => e.preventDefault()}>
          {authState === "register" && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                onChange={(e) =>
                  setAuthInfo((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) =>
                setAuthInfo((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) =>
                setAuthInfo((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {authState === "register" && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password again"
                onChange={(e) =>
                  setAuthInfo((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div>
            <button
              type="button"
              className="btn btn-link"
              onClick={() =>
                setAuthState((prev) =>
                  prev === "login" ? "register" : "login"
                )
              }
            >
              {authState === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary my-2"
          >
            Submit
            {loading && (
              <span>
                <div
                  className="spinner-border text-danger ms-2"
                  style={{ width: 16, height: 16 }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </span>
            )}
          </button>
          <p className="text-danger mt-3">{authError}</p>
        </form>
      </div>
    </div>
  );
}

export default AuthForm
