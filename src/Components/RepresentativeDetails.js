import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export default function RepresentativePage(props) {
    const [industries, setIndustries] = useState([]);
    const [bills, setBills] = useState([]);
    const [expenditures, setExpenditures] = useState([]);
    let offName = props.location.state.currName;
    let officials = props.location.state.off.offList;
    let offObj = '';
    for (let i = 0; i < officials.length; i++) {
        if (officials[i].name === offName) {
            offObj = officials[i];
            break
        }
    }
    let arrToEncode = offName.split(" ", 2);
    let encodedName = arrToEncode[1] + ',' + arrToEncode[0];
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
    useEffect(() => {
        fetch('https://api.fundstovotes.info/bills?name=' + encodedName)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setBills(result.top10IndustriesResponse.results[0]['votes']);
                }
            )
    }, [])
    let fecID = '';
    let type = 'senate';
    let typeStyled = 'US Senator';
    if(offObj['urls'][0].includes('house')) {
        type = 'house';
        typeStyled = 'Representative of the House'
    }
    /*
    INDEPENDENT EXPENDITURES CODE
    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/116/" + type + "/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let nameArray = offName.split(" ");
                    let offFName = nameArray[0];
                    let offLName = nameArray[nameArray.length - 1];
                    let indexOfOfficial = result['results'][0]['members'].findIndex(x => x.first_name === offFName & x.last_name === offLName);
                    fecID = result['results'][0]['members'][indexOfOfficial]['fec_candidate_id'];
                    return fetch("https://api.propublica.org/campaign-finance/v1/2018/candidates/" + fecID + "/independent_expenditures.json", {
                        method: "GET",
                        headers: {
                            "X-API-Key": "5iobKpLWaETmRxThCRRqj0MTbCMrMpieHvZ3I7Ex"
                        }
                    });
                }
            )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setExpenditures(result);
                }
            )
    }, [])
    */
    let listOfInd = industries.map((item) => {
        return item['@attributes']['industry_name'];
    })

    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px'}}>
            <h1  >{offName}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <p style={{ display: 'inline'}}>{offObj.party}</p>
                <p style={{ display: 'inline'}}>{typeStyled}</p>
                <p style={{ display: 'inline'}}>{offObj.phones[0]}</p>
                <p style={{ display: 'inline'}}><a href={offObj.urls[0]}>{offObj.urls[0]}</a></p>
            </div>
            <img src={offObj.photoUrl} alt="A photograph of the representative" style={{ display: 'none'}}/>
            <div style={{ marginBotton: '20px'}}>
                <h3>Top 10 Industries Funding This Representative</h3>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                    <IndustriesChart ind={industries} />
                    <IndustriesTextList ind={industries} />
                </div>
            </div>
            <div style={{ marginTop: '20px'}}>
                <h3>Bills Recently Voted on</h3>
                <BillsList bil={bills} ind={listOfInd}/>
            </div>
        </div>
    );
}

function IndustriesChart(props) {
    let industries = props.ind;
    let trace1 = {x:[], y:[], name:'Individual', type:'bar', marker:{color:'#90EE90'}}
    let trace2 = {x:[], y:[], name:'PACs', type:'bar', marker:{color:'#2E8B57'}}
    for(let i = 0; i < industries.length; i++) {
        trace1.x[i] = industries[i]['@attributes']['industry_name']
        trace2.x[i] = industries[i]['@attributes']['industry_name']
        trace1.y[i] = industries[i]['@attributes']['indivs']
        trace2.y[i] = industries[i]['@attributes']['pacs']
    }
    console.log(trace1);
    let data = [trace1, trace2];

    return(
        <div>
            <Plot data={data} layout={{barmode:'stack', title:'Top 10 Industries'}}/>
        </div>        
    )

}

function IndustriesTextList(props) {
    let industries = props.ind;
    let industryElem = industries.map((item) => {
        let elem = <IndustryItem industryObj={item} />
        return elem;
    })
    return (
        <div>
            <p>Top 10 Industries List</p>
            <ol>{industryElem}</ol>
        </div>
    )
}

function IndustryItem(props) {
    let industry = props.industryObj;
    return (
        <div>
            <li>{industry['@attributes']['industry_name']}</li>
        </div>
    );
}

function BillsList(props) {
    let bills = props.bil;
    let ind = props.ind;
    let billsElem = bills.map((item) => {
        let bill = <BillsItem billObj={item} indList={ind}/>
        return bill;
    })
    return (
        <div>
            <table>
                <tbody>
                <tr style={{
                border: '3px solid #516F2A',
                padding: '8px',
                backgroundColor: 'white'
                }}>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Name</th>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Representative's Position</th>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Industry of Bill</th>
                <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Industry and Funding Match</th>
                </tr>
                {billsElem}
                </tbody>
            </table>
        </div>
    )
}

function BillsItem(props) {
    let bill = props.billObj;
    let ind = props.indList;
    let ifMatch = '';
    let colorRow = 'white';
    if(ind.includes(bill.bill.Opensecrets_Sector_Long)){
        ifMatch = 'True'
        colorRow = 'green'
    } else {
        ifMatch = 'False'
    }
    
    return (
        <tr style={{
            border: '3px solid #516F2A',
            padding: '8px',
            backgroundColor: colorRow
          }}>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}><a href={bill.vote_uri}>{bill.bill.short_title}</a></td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{bill.position}</td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{bill.bill.Opensecrets_Sector_Long}</td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{ifMatch}</td>
        </tr>
    );
}


//function ExpendituresPie(props) {
//    let exp = props.exp;
 //   let data = [{
//        values: [exp.oppose_total, exp.support_total],
 //       labels: ['Total Funding Opposing Representative', 'Total Funding Supporting Representative'],
  //      type: 'pie',
  //      marker:{color:['#2E8B57', '#90EE90']}
  //  }]
   // return (
 //       <Plot data={data} layout={{height: 400,width: 500}}/>
  //  );
//}