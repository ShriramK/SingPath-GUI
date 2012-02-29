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