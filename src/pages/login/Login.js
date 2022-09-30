import styles from "./Login.module.css"
import {useState} from 'react'

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email,password);
  }


  return (
    <form onSubmit = {handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>
          email
        </span>
        <input
          type="email"
          onChange={(e) =>setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>
          password:
        </span>
        <input
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn">
        Login
      </button>
    </form>
  )
}
