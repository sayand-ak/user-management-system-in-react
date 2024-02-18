import "./Signup.css";

const Signup = () => {
    return(
        <div className="signup">
            <div className="signup-container">
                <div className="signup-image flex flex-col items-center">
                    <h1 className="text-4xl">Join us on the Journey </h1>
                    <span> Sign up today!</span>
                </div>
                <div className="signup-form flex justify-center items-center">
                    <ul className="flex flex-col gap-3.5 w-3/4">
                        <li>
                            <h1 className="text-3xl font-semibold">Start Your Journey</h1>
                        </li>
                        <li>
                            <div className="flex justify-between flex-wrap gap-2">
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="fname">Firstname</label>
                                    <input type="text" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="lname">Lastname</label>
                                    <input type="text" />
                                </div>
                                
                            </div>
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label htmlFor="phone">Phone No.</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" />
                        </li>
                        <li>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" />
                        </li>
                        <li>
                            <button>PROCEED</button>
                        </li>
                        <li className="items-center pt-3">
                            <span className="text-sm">
                                Already have an Account? 
                                <a href="" className="text-sky-600 underline">&nbsp;Sign In</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Signup;