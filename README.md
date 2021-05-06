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
REACT_APP_GOOGLE_API_KEY = 
REACT_APP_PROPUBLICA_CAMPAIGN_FINANCE_API_KEY = 
REACT_APP_PROPUBLICA_CONGRESS_API_KEY = 
```

## Contributing

First, clone the repo to your local machine and follow the steps in the previous section. All features and improvements (essentially all commits) should be made on a separate branch (not `main`). Push your commits to a branch, then create a pull request. One team member should review and approve your PR, then it can be merged into the `main` branch.

## Deployment

We are using [Render](https://render.com) for Static Site Hosting. When a PR is merged into `main`, the site automaticall redeploys. Visit the deployed version at [FundsToVotes.info](https://www.fundstovotes.info).

## Backend/Serverside Code

We have a separate (currently private) repository for our backend/serverside code. It is hosted on an Amazon Web Services (AWS) EC2 instance.
