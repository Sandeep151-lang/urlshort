import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const HomePage = () => {

    //const history = useHistory();
    const [input, setinput] = useState("");
    const [value, setvalue] = useState("")
    const [geturl, setgeturl] = useState([])
    const [use, setuser] = useState([])
    const { email } = useParams()
    console.log(use)
    const user = async () => {
        try {
            const res = await axios.get(`https://urlshorterning.herokuapp.com/ok/${email}`)

            setuser(res.data)
        } catch (error) {
            console.log(error)
            // history.push("/login")
        }
    }
    console.log(geturl)


    const short = async () => {

        try {
            const res = await axios(`https://api.shrtco.de/v2/shorten?url=${input}`);

            setvalue(res.data.result.full_short_link3);

        } catch (error) {
            console.log(error.response)
        }
    }


    const count = async () => {
        try {
            const res = await axios.get('https://urlshorterning.herokuapp.com/getur');
            setgeturl(res.data)

        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        count();
        user()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const suburl = (e) => {
        setinput(e.target.value)
    }


    return (
        <>
            <h3 className='text-center'>UrlShort</h3>

            <div className='container urlShort'>


                <input type="text" className="form-control" placeholder='Enter Link' onChange={suburl} />
                <button className="btn-click" onClick={short}>Click</button>
                <br />
                <h4>current Url <a href={value} target="_blank" rel="noreferrer">{value}</a></h4>

            </div>

        </>
    )
}

export default HomePage

