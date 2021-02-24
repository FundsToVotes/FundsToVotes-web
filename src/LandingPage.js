import { GoogleAPI } from './PropublicaCandidateAPI';
import { useState } from 'react';

export function LandingPage() {
    return(
        <div>
            <Title />
            <AddressInput />
            <GoogleAPI />
        </div>
    );
}

function Title() {
    return(
        <h1>FundsToVotes</h1>
    )
}

function AddressInput() {
    const [address, setAddress] = useState('');


    return(
        <div>
            <form>
            <label>
                Address in format "Street City StateFullName Zip" ex 1124 SE 4th ST Seattle Washington 98091:<br/> Address:
                <input type="text" address="address" onChange={e => setAddress(e.value)}/>
            </label>
            <input type="submit" value="submit" onSubmit={e => onSubmit(address)}/>
        </form>
        </div>
    )
}

function onSubmit(address) {
    console.log("wtf is going on")
    return(
        <GoogleAPI address={address}/>
    );
}