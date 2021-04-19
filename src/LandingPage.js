import { GoogleAPI } from './GoogleAPI';
import { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export function LandingPage() {
    return(
        <div style={{display: "block", margin: "auto", width: '75%', paddingTop: '50px'}}>
            <Title />
            <AddressInput />
        </div>
    );
}

function Title() {
    return(
        <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: 52, color: 'green'}}>Who is Funding Your Representatives?</h2>
            <p>Enter your Zipcode or Address below to see who funds your representatives and how that might affect their voting</p>
        </div>
    )
}

function AddressInput() {
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);

    let onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if(submitted) {
        return <GoogleAPI address={address}/>
    } else {
        return(
            <div style={{textAlign: 'center'}}>
                <form onSubmit={e => onSubmit(e)}>
                <label>
                    <input style={{width: '600px'}} type="text" placeholder="Insert Address or Zipcode Here" address="address" onChange={e => setAddress(e.target.value)}/>
                    <input type="submit" value="Search"/><br/>
                </label>
            </form>
            </div>
        )
    }
}

