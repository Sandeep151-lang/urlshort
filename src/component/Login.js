import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email, setemail] = useState();
    const [password, setpassword] = useState('');
    const [errors, seterror] = useState(null)
    const [datas, setdata] = useState([])


    const emailFunction = (e) => {
        setemail(e.target.value)
    }


    const passFunc = (e) => {
        setpassword(e.target.value);
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/login', { email, password })
            if (res) {
                setdata(res.data.message)
                history.push('/home');
            }
        } catch (error) {
            seterror(error.response.data.message)
        }
    }

    window.localStorage.setItem('user', JSON.stringify(datas))

    return (
        <form className='reg_page'>
            <h3 className='text-center'>Login</h3>
            <hr />
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email' onChange={emailFunction} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' onChange={passFunc} />
            </div>
            <div className='mb-3'>
                <p>Not have an Account <Link to="/" className='link'>Please SignUp</Link></p>
                <Link to="/forget" className='link'>Forget Password</Link>
            </div>

            {
                errors === null ? null : <h6 className='error'>{errors}</h6>
            }

            <button onClick={register} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
