# GithubTrending

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

It implements the Circunomics Frontend Coding Challenge. The app displays the most starred GitHub repos created in the last 30 days and provides a smooth browsing experience with pagination. Users can view repository details and rate repos via a modal window.

  
## Features
- List most starred GitHub repos created in the last 30 days
- Show repository details per row: name, description, stars, issues, owner’s username & avatar
- Infinite scroll pagination to load more repos
- Click repo name to open a modal with detailed info
- Rate repositories with a 5-star rating inside the modal
- Display user rating next to the repository name after rating
- Responsive and user-friendly UI


## Development server 

### Clone the repo
git clone https://github.com/NastassiaSher/github-trending.git

### Navigate to the project directory
cd github-trending

### Install dependencies
npm install

### Run the Angular development server
ng serve


## Running unit tests
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command: 

```bash

ng  test

```