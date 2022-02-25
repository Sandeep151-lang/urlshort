import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const HomePage = () => {

    const history = useHistory();
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
            history.push("/login")
        }
    }



    const short = async () => {

        try {
            const res = await axios(`https://api.shrtco.de/v2/shorten?url=${input}`);

            setvalue(res.data.result.full_short_link3);
            if (!value) {
                console.log('not value')
            } else {
                await axios.post('https://urlshorterning.herokuapp.com/url', { value });
                count()
            }


        } catch (error) {
            console.log(error.response)
        }
    }


    const count = async () => {
        try {
            const res = await axios.get('https://urlshorterning.herokuapp.com/geturl');
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
                <h4>current Url <a href={value} target="_blank">{value}</a></h4>

            </div>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Url</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            geturl.map((item, key) => {
                                console.log(item.value)
                                return <>
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td> <a href={item.value} target="_blank">{item.value}</a></td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HomePage

