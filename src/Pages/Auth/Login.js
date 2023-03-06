import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = () => {
  const { userSignIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password)
      .then(result => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data.token);
            localStorage.setItem("geniusToken", data.token);
          });

        navigate(from, { replace: true });
        toast.success("user logged in successfully");
        form.reset();
        console.log(user);
      })
      .catch(e => console.error(e));
  };

  const handleGoogleSign = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(e => console.error(e));
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-12">
          <h1 className="text-5xl text-center font-bold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-error" type="submit" value="Login" />
            </div>
          </form>
          <p className="text-center font-semibold text-slate-700">
            Or Sign Up with
          </p>
          <div className="text-center my-4 text-3xl">
            <button>
              <FaFacebook className="text-blue-600" />
            </button>
            <button onClick={handleGoogleSign}>
              <FcGoogle className="ml-4" />
            </button>
            <button className="ml-4">
              <GoMarkGithub />
            </button>
          </div>
          <p className="text-center">
            New to Genius Car?{" "}
            <Link className="font-bold text-orange-600" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
