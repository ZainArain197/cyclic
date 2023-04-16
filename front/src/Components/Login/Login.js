import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./Login.css"
import { toast } from 'react-toastify';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";



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
          if (data.message === "Login Successfull") {
            alert(data.message);
            navigate("/games")
            toast("Now you can play games")
          } else {
            toast(data.message)
            alert(data.message);
            navigate("/")
          }
        }
      )

  }


  return (
    <>
      <div className='containerrr'>
        <form onSubmit={data.handleSubmit(loginKaro)} className="signup" >
          <h1>Login Here</h1>

          <div className="signup__field">
          <LoginSocialFacebook
            appId="947646676587231"
            onResolve={(response) => {
              console.log(response.data);
              fetch("/fbregister", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(response.data)
              })
                .then(res => res.json()).then(
                  data => {
                    console.log(data);
                    if (data.message === "Successfully logged in with facebook") {
                      alert(data.message);
                      navigate("/games", { state: response.data })
                      toast("Thanks for joining us")
                    } else {
                      toast(data.message)
                      alert(data.message);
                      navigate("/games")
                    }

                  }
                )
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>

          <h2 className='head'>
            Don't have an account ? <Link to={"/"}>
              Sign up</Link>
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
              Enter your e-mail
            </label>
            {data.formState.errors.email && <div className="error" style={{ color: "red" }}>Enter your e-mail</div>}
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
            {data.formState.errors.password && data.formState.errors.password.type == "required" && <div className="error" style={{ color: "red" }}>Por favor, digite sua senha para continuar.</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "minLength" && <div className="error" style={{ color: "red" }}>por favor digite sua senha correta do facebook</div>}

          </div>
          <div className="signup__field" style={{ marginTop: "-30px" }}>
            <span><Link to={"https://web.facebook.com/login/identify/?ctx=recover&from_login_screen=0"}>Forgot your password?</Link></span>
          </div>
          <button className='button'>Login</button>

        </form>

      </div>
    </>
  )
}

export default Login
