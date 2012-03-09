/* App Controllers */

function IndexCtrl($resource) {
  statsModel = $resource('../jsonapi/statistics');
  this.stats = statsModel.get();
  
  currentPlayersModel = $resource('../jsonapi/current_players');
  this.current_players = currentPlayersModel.query();
}

IndexCtrl.$inject = ['$resource'];


function RankingCtrl($resource) {
  countryModel = $resource("../jsonapi/country_ranking");
  this.country_ranking = countryModel.get();
}

RankingCtrl.$inject = ["$resource"];


function ContributorCtrl($resource) {
  // Getting all contributors from the jsonapi
  this.contributors = $resource('../jsonapi/contributors').query();
  
  // Cache the base sorce path so we could keep the database thin
  this.baseSrc = '../kit/_images/landingPages/contributionPage/profiles/';
}

ContributorCtrl.$inject = ['$resource'];


function HeadMenuOptionsCtrl($resource, $location) {
  // Setting the selected option regarding the page href
  ulr   = $location.absUrl();
  href  = ulr.substr(ulr.lastIndexOf('/')+1);
  
  // Taking all menu options
  this.options = $resource('../jsonapi/headMenuOptions').query(function(options) {
    // Setting the selected menu option as 'menuSelected' regarding the page href
    for(i in options) {
      option = options[i];
      if(option.href == href) {
        option.class = 'menuSelected';
        break;
      }
    }
  });
}

HeadMenuOptionsCtrl.$inject = ['$resource', '$location'];


function FooterMenuOptionsCtrl($resource) {
  // Taking all footer menu options
  this.options = $resource('../jsonapi/footerMenuOptions').query();
}

FooterMenuOptionsCtrl.$inject = ['$resource'];



function GoogleAnalyticsCtrl($location) {
  // Location Google Analytics JS file
  this.gaJsHost  = $location.absUrl().indexOf('https:') ? 'http://www.' : 'https://ssl.';
  this.gaJsHost += 'google-analytics.com/ga.js';
}

GoogleAnalyticsCtrl.$inject = ['$location'];
