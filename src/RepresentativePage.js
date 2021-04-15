import { useEffect, useState } from "react";


export function RepresentativePage(props) {
    const [industries, setIndustries] = useState([]);
    let offName = props.location.state.currName;
    let officials = props.location.state.off.offList;
    let offObj = '';
    for(let i = 0; i < officials.length; i++) {
        if(officials[i].name === offName) {
            offObj = officials[i];
            break
        }
    }
    let arrToEncode = offName.split(" ", 2);
    console.log(arrToEncode);
    let encodedName= arrToEncode[1] + ',' + arrToEncode[0];
    useEffect(() => {
        fetch('https://api.fundstovotes.info/topten?name=' + encodedName)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIndustries(result.top10IndustriesResponse.industry);
                }
            )
    }, [])
    return(
        <div>
            <h2>{offName}</h2>
            <h3>Demographic Information</h3>
            <p>Party Affiliation: {offObj.party}</p>
            <p>Phone Number: {offObj.phones[0]}</p>
            <p>Website: <a href={offObj.urls[0]}>{offObj.urls[0]}</a></p>
            <img src={offObj.photoUrl} alt="A photograph of the representative"/>
            <IndustriesList ind={industries} />
        </div>
    );
}

function IndustriesList(props) {
    let industries = props.ind;
    let industryElem = industries.map((item) => {
        let elem = <IndustryItem industryObj={item}/>
        return elem;
    })
    return(
        <div>
            <h3>Top 10 Industries Funding This Representative</h3>
            <ol>
                {industryElem}
            </ol>
        </div>        
    )
}

function IndustryItem(props) {
    let industry = props.industryObj;
    return(
        <div>
            <li>{industry['@attributes']['industry_name']}</li>
        </div>
    );
}



