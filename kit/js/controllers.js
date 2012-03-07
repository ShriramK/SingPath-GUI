/* App Controllers */
function IndexCtrl($resource) {	
    statsModel = $resource("../jsonapi/statistics");
    this.stats = statsModel.get();

    currentPlayersModel = $resource("../jsonapi/current_players");
    this.current_players = currentPlayersModel.query();
}

IndexCtrl.$inject = ["$resource"];
                          
function RankingCtrl($resource) {
    countryModel = $resource("../jsonapi/country_ranking");
    this.country_ranking = countryModel.get();
}

RankingCtrl.$inject = ["$resource"];

function YourLevelBadgesCtrl($resource) {	
    yourLevelBadgesModel = $resource("../jsonapi/all_badges");
    this.badges = yourLevelBadgesModel.get();
    this.doFilter = function(elem) { 
        return (elem.class.indexOf('CountryBadge')<0) && (elem.class.indexOf('Level_Badge')<0);
    }
    //this.badges_level = this.badges.badges.filter({'description':'Argentina Unlock Badge'});
}

YourLevelBadgesCtrl.$inject = ["$resource"];

function CountryLevelBadgesCtrl($resource) {	
    countryLevelBadgesModel = $resource("../jsonapi/all_badges");
    this.badges = countryLevelBadgesModel.get();
    this.doFilter = function(elem) { 
        return elem.class.indexOf('CountryBadge')>0;
    }
 }

CountryLevelBadgesCtrl.$inject = ["$resource"];

function YourBadgesBoxTop($resource) {	
	yourBadgesBoxTop = $resource("../jsonapi/all_badges");
    this.badges = yourBadgesBoxTop.get();
    this.doFilter = function(elem) { 
        return elem.class.indexOf('Level_Badge')>0;
    }
    
 }

YourBadgesBoxTop.$inject = ["$resource"];


function CountriesCtrl($resource) {	
    allCountriesModel = $resource("../jsonapi/all_countries");
    this.allCountries = allCountriesModel.get();
}

CountriesCtrl.$inject = ["$resource"];