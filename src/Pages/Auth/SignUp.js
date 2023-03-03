import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { FaFacebook } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);

  const handleSignUp = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photourl.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(result => {
        const user = result.user;
        handleUpdateUserProfile(name, photoURL);
        form.reset();
        console.log(user);
      })
      .catch(e => console.error(e));
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {
        toast.success("User profile updated successfully");
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
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">photoURL</span>
              </label>
              <input
                type="text"
                name="photourl"
                placeholder="Enter your photo link"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
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
                required
                className="input input-bordered"
              />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-error" type="submit" value="Sign Up" />
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
            Already Have an Account?{" "}
            <Link className="font-bold text-orange-600" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
