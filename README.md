# Funds to Votes
_Informatics Capstone Project 2021 | University of Washington Information School_

## Team Members
- Grady Thompson (Project Manager, Generalist)
- Jay Houppermans (Backend Developer, Server Administrator)
- Haykal Mubin (Frontend Developer)
- Reyan Haji (Data Analyst)

## Contact Information

Email the project team at hello@fundstovotes.info. Or, create an issue in our GitHub repository.

## Understanding Our Code

We used `create-react-app` to set up our project.

After cloning the repo to your local machine, install the dependencies. To do this, run `npm install`. (This requires that you have Node with npm installed.)

To start your local development server, run `npm start`.

## API Keys

To use this application, you need to obtain API Keys for: 

- [Google Civic Information API](https://developers.google.com/civic-information/docs/using_api#APIKey)
- [ProPublica Congress API](https://www.propublica.org/datastore/api/propublica-congress-api)
- [ProPublica Campaign Finance API](https://www.propublica.org/datastore/api/campaign-finance-api)

Store them in a file called `.env` at the root of your cloned repository. It should look like this before you fill in your keys:
```
REACT_APP_GOOGLE_API_KEY=
REACT_APP_PROPUBLICA_CAMPAIGN_FINANCE_API_KEY=
REACT_APP_PROPUBLICA_CONGRESS_API_KEY=
```

## Wishlist 

Over the course of this project, we, the original team, recieved a lot of amazing ideas from the various people we spoke to for user testing. Unfortunately, we weren't able to impliment all of them. This is where you, a possible future contributer, can come in! The following 'Wishlist' contains everything we thought about developing, but ultimately, didn't have the time for. Feel free to use any or none of these ideas as a place to start when deciding how to build on what we've created. 

### General Website Wishlist
*These would be added at the appropriate location on the website* 

- Back Button to Representative List
    > If a user views one of their representatives, they may want to explore others without having to re-enter their address. Create a Back Button to go from the visualizations page to the representative list, already populated with the user's representatives


### New Visualizations Page Features
*These would be added to the visualizations page for each representative*
- Break Down Donations by Corporation/Person
    > A user currently can see which industries donated to a representative, but not the specific companies. It would be interesting if they could click a top industry, such as in the TopTen industries visualization, then see which individuals / corporations contributed
- Ability to Sort Bills visualization by industry, view all bills by industry
    > We have an existing table that shows recently voted upon bills. It would be interesting to be able to sort this table and show only bills from certain industries
- Ability to see where in the Republican party members fall
    > One of our user testing contacts, Michael from Countable, noted that there's currently a large fracture within the Republican party between Trumpists and Non-Trump republicans. It might be interesting to see which republicans recieve money from Trump's PACs, and denote on republican party members whether they recieve money/support from Trump. 
- Endorsements 
    > It could be interesting to see which groups/industries/unions endorse a candidate. Make a visualization that pulls data from [Ballotpedia](https://ballotpedia.org/United_States_Congress_elections,_2020)  to view who endorses a particular candidate.
- Indicator of how long someone's been in power
    > One of our user testers pointed out that a person who's been in power for years, such as an incumbent candidate, is often endorsed/supported by groups who might not necessarily agree with them, but want to support a powerful representative. It might be interesting to see how long each representative has held their seat, or been in a position of power
- Visualization of Bills Sponsored
    > The bills that a representative is the "primary sponsor" of can be a really good indication of what policies they're actively pursuing and moving forward. To implement this, copy the existing serverside for the bills recently voted on visualization, and modify it to only view bills the representative has sponsored. You can either do this with a different API call to a different endpoint propublica endpoint specifically for bills sponsored (ideal method) or you can filter by bills where they are the primary_sponsor of the bill (quick and dirty method). Regardless, both the serverside and the clientside should be very similar to that of the bills recently voted on visualization
- View commitees or subcomittees a member is a part of
    > [Propublica's Members API](https://projects.propublica.org/api-docs/congress-api/members/) has an endpoint that shows which comittees a representative is a part of. It could be interesting to display these, and potentially highlight any which pertain to industries they've recieved money from. 
- Advanced: Web scraper to determine whether an industry is for a bill or against it
    > Determine some way of telling whether an industry supports or opposes a bill. For instance, if a bill on large corporate antitrust laws is passed, is it Pro-corporation or Anti-corporation? We've been told that some large companies release press statements on each relevant bill, you could potentially make a list of these large companies, then write a web scraper that finds these press statements, and uses natural language processing AI to determine whether the statement is positive or negative. Alternatively, it's possible that an API or data source that already does this exists, we just haven't found one.
- Graph outlining the top 10 pac donations
    > View the 10 largest or 10 most recent pac contributions to each representative. Made slightly tricky because there's a donation limit, but, opensecrets and other websites manage to do this somehow, so, there's probably a good way to view this
- Graph or list of the top 10 individual donations
    > Same as the top 10 pac donations. Slightly tricky because there's a cap on how much individuals can donate, but other websites have these visualizations, so, there's probably a different way that they're counting the money. 
- Ability to see how representatives compare to both the average representative and the average representative of their party
    > If Big Oil donates $10,000 to each representative, seeing that Jane McEnviromentalistRep has taken a $10,000 donation from Big Oil isn't all that significant. However, if Jane has taken a $500,000 donation while the average representative only gets $10,000, that data might be interesting to users


## Contributing

First, clone the repo to your local machine and follow the steps in the previous section. All features and improvements (essentially all commits) should be made on a separate branch (not `main`). Push your commits to a branch, then create a pull request. One team member should review and approve your PR, then it can be merged into the `main` branch.

## Deployment

We are using [Render](https://render.com) for Static Site Hosting. When a PR is merged into `main`, the site automaticall redeploys. Visit the deployed version at [FundsToVotes.info](https://www.fundstovotes.info).

## Project File Architecture 

These are the main files for our website and what they do:

- 'App.js' : Defines the routing for our site, also responsible for calling the header and footer components
- 'LandingPage.js' : Creates the page users first see with the Search bar and calls the 'GoogleAPI.js' file if the user presses the search button. The inputted address is sent to the 'GoogleAPI.js' file when the search button is pressed. 
- 'GoogleAPI.js' : Responsible for calling the Google Civic Information API and creating a list of Congress members for the inputted address. When a representative is selected, the 'RepresentativeDetails.js' file is called sending information from the Google API about the selected representative
- 'RepresentativeDetails.js' : Builds the page sharing the Voting Records, Top 10 Funding Industries, and Independent Expenditures of the selected representative by using representative information to make API calls. Makes API calls to ProPublica Congress API, ProPublica Campaign Finance API, and indirectly calls OpenSecrets through a backend fetch statement. 

## Backend/Serverside Code

We have a separate (currently private) repository for our backend/serverside code. Our serverside code is written in Go, and can be found here - https://github.com/FundsToVotes/serverside. Extensive documentation for the backend of this project can also be found in this repo. 

Our project's backend hosting includes a database and a custom API endpoint serving data accumulated through a variety of sources. This is currently being hosted on an Amason Web Services (AWS) EC2 instance under the FundsToVotes AWS acount. 

Instructions for modifying, running, and acquiring access credentials for the backend server can be found in the Serverside repo.