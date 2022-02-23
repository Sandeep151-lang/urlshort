import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState();
    const [password, setpassword] = useState('');
    const [errors, seterrors] = useState(null)

    const emailFunction = (e) => {
        setemail(e.target.value)
    }

    const nameFunc = (e) => {
        setname(e.target.value)
    }

    const passFunc = (e) => {
        setpassword(e.target.value);
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/register',{name,email,password})
            if (res.status === 201) {
                window.alert('success')
                seterrors(res.data)
                
                
            }
        } catch (error) {
        
            seterrors(error.response.data)
          
        }
    }
    return (
        <form className='reg_page'>
            <h3 className='text-center'>Register</h3>
            <hr/>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Name :-</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder='Enter Name' onChange={nameFunc}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email' onChange={emailFunction}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword12" placeholder='Enter Password' onChange={passFunc}/>
            </div>
            <div className='mb-3'>
              <p>Already have an Account <Link to="/login" className='link'>Please SignIn</Link></p>
            </div>
            {
                errors === null ? null : <h6 className='error'>{errors}</h6>
            }       
            <button onClick={register} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Register
