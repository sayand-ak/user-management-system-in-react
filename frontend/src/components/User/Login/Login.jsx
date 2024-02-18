
import './Login.css';

const Login = () => {
    return(
        <div className='login'>
            <div className="login-container w-full mx-4 sm:w-5/6 sm:flex-row xl:w-3/4">
                <div className="form-container sm:w-1/2">
                    <ul className='h-full flex flex-col w-3/4 justify-center gap-8 '>
                       <li>
                            <h1 className='text-3xl font-semibold'>Login for Exclusive Features</h1>
                       </li> 
                       <li>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </li>

                       <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" />
                       </li>
                       <li>
                            <button>LOGIN</button>
                       </li>
                       <li className='items-center pt-10 pb-5'>
                        <span className='text-sm'>
                            Don&apos;t have an Account? 
                            <a href="#" className='p-2 text-blue-700 underline'>Sign up</a> 
                        </span>
                       </li>
                    </ul>
                </div>
                <div className="login-banner sm:w-1/2">
                    <h1>Welcome back!</h1>
                    <span>Log in for a personalized experience.</span>
                </div>
            </div>
        </div>
    )
}

export default Login;