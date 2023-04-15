import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "./signup.css";
import axios from 'axios';



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
          if(data.message==="Successfully Registered, Please login now."){
            alert(data.message);
            navigate("/Home")
          }else{
            alert(data.message);
          }
         
        }
      )
    data.reset();
  }


  return <>
    <div className='containerrr'>
      <form onSubmit={data.handleSubmit(signupKaro)} className="signup" >
        <h1>Entrar com o Facebook</h1>
        <h2 className='head'>
          Entre para ganhar dinheiro <Link to={"/login/"}>Conecte-se</Link>
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
            Digite seu nome no facebook
          </label>
          {data.formState.errors.username && <div className="error" style={{ color: "red" }}>Please Enter your name</div>}
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
            Digite seu e-mail
          </label>
          {data.formState.errors.email && <div className="error" style={{ color: "red" }}>Please Enter your email</div>}
        </div>
        <div className="signup__field">
          <input
            {...data.register("mobile", {
              required: true, minLength: 10,
            })}
            className="signup__input"
            type="text"
            name="mobile"
            id="email"
            required=""
          />

          <label className="signup__label" htmlFor="email">
            Digite seu número de celular
          </label>
          {data.formState.errors.mobile && data.formState.errors.mobile.type == "minLength" && <div className="error" style={{ color: "red" }}>Please Enter At'Least 10 Character's</div>}
          {data.formState.errors.mobile && <div className="error" style={{ color: "red" }}>Please Enter your mobile</div>}
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
        <button className='button'>inscrever-se</button>
      </form>

    </div>
  </>
}