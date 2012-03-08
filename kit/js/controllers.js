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
    	elem.imageURL = elem.imageURL.replace(/^\/static/, "../static");
        if (elem.imageURL && !elem.awarded) {
        	elem.imageURL = elem.imageURL.replace('_on', '_off');
        }
    	var eval_class = (elem.class.indexOf('CountryBadge')<0 && elem.class.indexOf('Level_Badge')<0);
        return (eval_class);
    }
    
    this.clickEvent = function(elem,badge){
    	window.alert("elem:"+elem.src);
    }
    
    this.returnClass = function(elem){
    	var url = elem.imageURL.replace(/^\/static/, "../static");
        var clazz = 'earnedBadge';
        if (url && !elem.awarded) {
            clazz = 'notEarnedBadge';
        }
        return clazz;

    }
 }

YourLevelBadgesCtrl.$inject = ["$resource"];

function CountryLevelBadgesCtrl($resource) {	
    countryLevelBadgesModel = $resource("../jsonapi/all_badges");
    this.badges = countryLevelBadgesModel.get();
    this.doFilter = function(elem) { 
    	elem.imageURL = elem.imageURL.replace(/^\/static/, "../static");
        if (elem.imageURL && !elem.awarded) {
        	elem.imageURL = elem.imageURL.replace('_on', '_off');
        }
        var eval_class = elem.class.indexOf('CountryBadge')>0
        return eval_class ;
    }
    this.clickEvent = function(elem,badge){
    	window.alert("elem:"+elem.src);
    }
    this.returnClass = function(elem){
    	var url = elem.imageURL.replace(/^\/static/, "../static");;
        var clazz = 'earnedBadge';
        if (url && !elem.awarded) {
            clazz = 'notEarnedBadge';
        }
        return clazz;

    }
 }

CountryLevelBadgesCtrl.$inject = ["$resource"];

function YourBadgesBoxTop($resource) {	
	yourBadgesBoxTop = $resource("../jsonapi/all_badges");
    this.badges = yourBadgesBoxTop.get();
    this.badges_elements = [];
    this.prevBadge = undefined;
    
    this.clickEvent = function(elem,badge){
    	window.alert("elem:"+elem.src);
    }
    
    this.doFilter = function(elem) {
    	elem.imageURL = elem.imageURL.replace(/^\/static/, "../static");;
        if (elem.imageURL && !elem.awarded) {
        	elem.imageURL = elem.imageURL.replace('_on', '_off');
        }
        this.badges_elements.push(elem);
        var eval_class = elem.class.indexOf('Level_Badge')>0;
        return eval_class;
    }
    this.returnStyle = function(elem){
    	var index = this.badges_elements.indexOf(elem);
    	var prevBadge = undefined;
    	if (index>0) {
    		prevBadge =  this.badges_elements[index-1];
    		
    	}else{
    		window.alert(elem.description);
    	}
    	if (prevBadge && prevBadge.path_id != elem.path_id){
    		
    		return '{display:block;clear:both;}';
    	}
    	return '';
    }
    this.returnClass = function(elem){
    	var url = elem.imageURL.replace(/^\/static/, "../static");;
        var clazz = 'earnedBadge';
        if (url && !elem.awarded) {
            clazz = 'notEarnedBadge';
        }
        
        
        return clazz;
    }
 }

YourBadgesBoxTop.$inject = ["$resource"];


function CountriesCtrl($resource) {	
    allCountriesModel = $resource("../jsonapi/all_countries");
    this.allCountries = allCountriesModel.get();
}

CountriesCtrl.$inject = ["$resource"];