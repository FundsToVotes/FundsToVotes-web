

export function RepresentativePage(props) {
    let offName = props.location.state.currName;
    let officials = props.location.state.off.offList;
    let offObj = '';
    for(let i = 0; i < officials.length; i++) {
        if(officials[i].name === offName) {
            offObj = officials[i];
            break
        }
    }
    console.log(offObj);
    return(
        <div>
            <h2>{offName}</h2>
            <p>Party Affiliation: {offObj.party}</p>
            <p>Phone Number: {offObj.phones[0]}</p>
            <p>Website: <a href={offObj.urls[0]}>{offObj.urls[0]}</a></p>
            <img src={offObj.photoUrl} alt="A photograph of the representative"/>
        </div>
    );
}



