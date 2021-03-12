import { GoogleAPI } from './GoogleAPI';
import { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export function LandingPage() {
    return(
        <div>
            <Title />
            <AddressInput />
        </div>
    );
}

function Title() {
    return(
        <h2>Find Your Representative</h2>
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
            <div>
                <form onSubmit={e => onSubmit(e)}>
                <label>
                    Address in format "Street City StateFullName Zip" ex 1124 SE 4th ST Seattle Washington 98091:<br/> Address:
                    <input type="text" address="address" onChange={e => setAddress(e.target.value)}/>
                </label>
                <input type="submit" value="submit"/>
            </form>
            </div>
        )
    }
}

