import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Login = () => {
  const { token, email } = useParams();

  const [password, setpassword] = useState('');
  const [errors, seterror] = useState(null)





  const passFunc = (e) => {
    setpassword(e.target.value);
  }

  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://urlshorterning.herokuapp.com/password', { password, email, token })
      if (res.status === 200) {

        seterror(res.data)
        //history.push('/home');
      }
    } catch (error) {
      seterror(error.response.data)
    }
  }

  // window.localStorage.setItem('user', JSON.stringify(datas))

  return (
    <form className='reg_page'>
      <h3 className='text-center'>Change Password</h3>
      <hr />

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' onChange={passFunc} />
      </div>
      <div className='mb-3'>
        <p>Not have an Account <Link to="/" className='link'>Please SignUp</Link></p>
      </div>
      <div className='mb-3'>
        <Link to="/login" className='link'>SignIn</Link>
      </div>
      {
        errors === null ? null : <h6 className='error'>{errors}</h6>
      }
      <button onClick={register} className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login
