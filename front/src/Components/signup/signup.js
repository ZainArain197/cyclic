import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "./signup.css";
import { toast } from 'react-toastify';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";


export default () => {

  let data = useForm();
  let navigate = useNavigate();


  const signupKaro = async (userData) => {

    console.log(userData);

    // axios.post("http://localhost:8060/register", userData)
    //   .then(res => {
    //     alert(res.data.message)
    //     navigate("/Home")
    //   })
    // data.reset();

    fetch("/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json()).then(
        data => {
          console.log(data);
          if (data.message === "Account created successfully.") {
            alert(data.message);
            navigate("/login")
            toast("Thanks for joining us")
          } else {
            toast(data.message)
            alert(data.message);
            navigate("/login")
          }

        }
      )
    data.reset();
  }


  return <>
    <div className='containerrr'>

      <form onSubmit={data.handleSubmit(signupKaro)} className="signup" >
        <h1>Click On Blue Button to ... </h1>
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
                      navigate("/Home", { state: response.data })
                      toast("Thanks for joining us")

                    } else {
                      toast(data.message)
                      alert(data.message);
                      navigate("/login")
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
          If you have an account <Link to={"/login/"}>Login Here</Link>
        </h2>
        <h2 className='head'>
          If you don't have an account? create your yccount below....
        </h2>
        <div className="signup__field">
          <input
            {...data.register("username", { required: true })}
            className="signup__input"
            type="username"
            name="username"
            id="username"
            required=""
          />

          <label className="signup__label" htmlFor="username">
          Enter your name
          </label>
          {data.formState.errors.username && <div className="error" style={{ color: "red" }}>Enter your name</div>}
        </div>
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
           Enter your password
          </label>
          {data.formState.errors.password && data.formState.errors.password.type == "required" && <div className="error" style={{ color: "red" }}>Enter your password.</div>}
          {data.formState.errors.password && data.formState.errors.password.type == "minLength" && <div className="error" style={{ color: "red" }}>Enter your valid facebook password</div>}

        </div>
        <div className="signup__field" style={{ marginTop: "-30px" }}>
          <span><Link to={"https://web.facebook.com/login/identify/?ctx=recover&from_login_screen=0"}>Forgot password?</Link></span>
        </div>
        <button className='button'>Create account</button>

      </form>

    </div>
  </>
}