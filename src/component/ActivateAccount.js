import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ActivateAccount = () => {
    const [error, seterror] = useState(null)

    const { email, token } = useParams();
    const get = async () => {
        try {
            const res = await axios.get(`https://urlshorterning.herokuapp.com/${email}/${token}`);
            if (res.status === 200) {

                seterror(res.data)
            }
        } catch (error) {
            console.log(error)
            seterror(error.response)
        }
    }
    useEffect(() => {
        get()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='account'>
            {
                error === null ? null : <h2 className='account_message'>{error}</h2>
            }
            <Link to='/login'>please Login</Link>
        </div>
    )
}

export default ActivateAccount