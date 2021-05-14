import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import {Link} from '@reach/router';

export default function RepresentativePage(props) {
    const [industries, setIndustries] = useState({industry:[], '@attributes':{cid: ''}});
    const [bills, setBills] = useState([]);
    const [expenditures, setExpenditures] = useState({results: []});
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
                    setIndustries(result.top10IndustriesResponse);
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
    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/117/" + type + "/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": process.env.REACT_APP_PROPUBLICA_CONGRESS_API_KEY
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
                    let senClass = result['results'][0]['members'][indexOfOfficial]['title'];
                    let senClassYr = "2020";
                    if(senClass.includes("1st Class")) {
                        senClassYr = "2018";
                    } else if (senClass.includes("3rd Class")) {
                        senClassYr = "2016";
                    }
                    return fetch("https://api.propublica.org/campaign-finance/v1/" + senClassYr + "/candidates/" + fecID + "/independent_expenditures.json", {
                        method: "GET",
                        headers: {
                            "X-API-Key": process.env.REACT_APP_PROPUBLICA_CAMPAIGN_FINANCE_API_KEY
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
    let listOfInd = industries.industry.map((item) => {
        return item['@attributes']['industry_code'];
    })
    let partyColor = 'red';
    if(offObj.party === 'Democratic Party'){
        partyColor = 'blue';
    }

    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px'}}>
            <h1  >{offName}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <p style={{ display: 'inline', color: partyColor}}>{offObj.party}</p>
                <p style={{ display: 'inline'}}>{typeStyled}</p>
                <p style={{ display: 'inline'}}>DC Office: {offObj.phones[0]}</p>
                <p style={{ display: 'inline'}}><a href={offObj.urls[0]} target="_blank">{offObj.urls[0]}</a></p>
            </div>
            <img src={offObj.photoUrl} alt="A photograph of the representative" style={{ display: 'none'}}/>
            <div style={{ marginBotton: '20px'}}>
                <h3>Top 10 Industries Funding This Representative</h3>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                <p>These industries are top contributors to {offName}'s campaign by individuals who work in those industries or Political Action Committees (PACs) in that industry.</p>
                    <IndustriesChart ind={industries.industry} />
                    <IndustriesTextList ind={industries.industry} />
                </div>
            </div>
            <div style={{ marginTop: '20px'}}>
                <h3>Bills Recently Voted On</h3>
                <p>These are the recent bills that {offName} has voted on. The industry that the bill relates to may correlate with an industry that supports {offName}.</p>
                <BillsList bil={bills} ind={listOfInd} type={type}/>
            </div>
            <div style={{ marginTop: '20px'}}>
                <h3>Independent Expenditures</h3>
                <p>These groups spent money in support or opposition of {offName}. Learn more about independent expenditures on the <Link to="/finance-101">Campaign Finance 101 page.</Link></p>
                <ExpendituresPie exp={expenditures} />
            </div>
            <div style={{ marginTop: '20px'}}>
                <h3>Find Out More About {offName}'s Funding</h3>
                <ExtendedInfoOnRep cid={industries['@attributes']['cid']} name={offName} />
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center'}}>
                <button style={{ backgroundColor: 'green', padding: '10px', borderRadius: '8px'}}><h3><a href='/take-action' style={{ color: 'white'}}>Ready to act? Click Here to Take Action!</a></h3></button>
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
            <Plot data={data} layout={{barmode:'stack'}} config={{displayModeBar: false}} />
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
        let bill = <BillsItem billObj={item} indList={ind} type={props.type}/>
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
                }}>Bill Summary</th>
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
    let ifMatch = 'False';
    let colorRow = 'white';
    for(let i = 0; i < ind.length; i++) {
        if(ind[i].startsWith(bill.bill.Opensecrets_Sector_Prefix)){
            ifMatch = 'True';
            colorRow = '#dcedc8b2';
        }
    }

    let billStubArray = bill.bill.number.split(" ");
    let website = 'https://www.congress.gov/bill/117th-congress/' + props.type + '-bill/' + billStubArray[billStubArray.length - 1];
    return (
        <tr style={{
            border: '3px solid #516F2A',
            padding: '8px',
            backgroundColor: colorRow
          }}>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}><a href={website} target="_blank">{bill.bill.short_title}</a></td>
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
                }}>{bill.bill.summary_short}</td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{ifMatch}</td>
        </tr>
    );
}

function ExtendedInfoOnRep(props) {
    let openSecretsLink = 'https://www.opensecrets.org/members-of-congress/'+  props.name.replace(' ', '-') + '/summary?cid=' + props.cid;
    let voterlyLink = 'https://voterly.com/search/politicians?q=' + props.name.replace(' ', '-');
    return (
        <div>
            <ul>
                <li><a href={openSecretsLink} target="_blank">Open Secrets Page</a></li>
                <li><a href={voterlyLink} target="_blank">Voterly Page</a></li>
            </ul>
        </div>
    );
}


function ExpendituresPie(props) {
    let exp = props.exp;
    console.log(exp);
    let comitteesS = [];
    let committeesO = [];
    for(let i = 0; i < exp.results.length; i++) {
        if(exp.results[i].support_or_oppose === 'S' && !comitteesS.includes(exp.results[i].fec_committee_name)) {
            comitteesS.push(exp.results[i].fec_committee_name);
        } else if(exp.results[i].support_or_oppose === 'O' && !committeesO.includes(exp.results[i].fec_committee_name)) {
            committeesO.push(exp.results[i].fec_committee_name);
        }
    }
    if(comitteesS.length === 0) {
        comitteesS.push('No Committees Found');
    }
    if(committeesO.length === 0) {
        committeesO.push('No Committees Found');
    }
    let listOfS = comitteesS.map((item) => {
        return <ExpenditureListItem committee={item}/>
    })
    let listOfO = committeesO.map((item) => {
        return <ExpenditureListItem committee={item}/>
    })
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            <div>
                <p>Committees That Support Representative:</p>
                <ul>
                    {listOfS}
                </ul>
            </div>
            <div>
                <p>Committees That Donated Against Representative:</p>
                <ul>
                    {listOfO}
                </ul>
            </div>
        </div>
    );
}

function ExpenditureListItem(props) {
    return (
        <li>{props.committee}</li>
    )
}