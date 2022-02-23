import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ForgetPass = () => {
    const history = useHistory();
    const [email, setemail] = useState();
    const [errors, seterror] = useState(null)
    const [datas, setdata] = useState([])
    const emailFunction = (e) => {
        setemail(e.target.value)
    }


   
    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/forget', { email })
            if (res) {
                //setdata(res.data.message)
               // history.push('/home');
        
                seterror(res.data)
            }
        } catch (error) {
           
            seterror(error.response.data)
        }
    }
    // window.localStorage.setItem('user', JSON.stringify(datas))
    return (
        <form className='reg_page'>
            <h3 className='text-center'>Forget Password</h3>
            <hr />
            <div className="mb-3">
                <label htmlForr="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email' onChange={emailFunction} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className='mb-3'>
                <p>Not have an Account <Link to="/" className='link'>Please SignUp</Link></p>
                <Link to="/login" className='link'>Please SignIn</Link>
            </div>
            {
                errors === null ? null : <h6 className='error'>{errors}</h6>
            }
            <button onClick={register} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ForgetPass
