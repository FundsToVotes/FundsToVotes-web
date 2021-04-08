import { GoogleAPI } from './GoogleAPI';
import { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export function LandingPage() {
    return (
        <div>
            <Title />
            <AddressInput />
        </div>
    );
}

function Title() {
    return (
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

    if (submitted) {
        return <GoogleAPI address={address} />
    } else {
        return (
            <div>
                <form onSubmit={e => onSubmit(e)}>
                    <label>
                        <input type="text" placeholder="Insert Address Here" address="address" onChange={e => setAddress(e.target.value)} />
                        <input type="submit" value="Search" /><br />
                    Format Address as "Street City StateFullName Zip" ex 1124 SE 4th St Seattle Washington 98091
                </label>
                </form>
            </div>
        )
    }
}

export default LandingPage;