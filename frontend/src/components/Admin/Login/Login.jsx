import "./Login.css";

const Login = () => {
    return(
        <div className="admin-login">
            <div className="admin-login-container flex flex-col items-center py-20 gap-7">
                <h1>Admin Login</h1>
                <form action="#">
                    <ul className="flex flex-col gap-6 w-96">
                        <li className="flex flex-col gap-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" />
                        </li>
                        <li className="flex flex-col gap-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" />
                        </li>
                        <li className="flex justify-center pt-9">
                            <button>LOGIN</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Login;