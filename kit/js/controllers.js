/* App Controllers */


// Global hash change callback register
window.onHash = [];

// Create an alternative to jQuery onhashchange event
function checkHash() {
  if(hash = window.location.hash) {
    // Remove the hash from the address bar
    window.location.hash = '';
    
    // Call a callback function if there's any in the Global register
    if(typeof(callback = window.onHash[hash]) == 'function') {
      callback.call();
    }
  }
}
setInterval(checkHash, 100);


// Create a Global var to keep track of the player session
window.USER = {
 "isLogged": false
}
window.MENU = true;

function RankingStatsPageCtr($resource){
	self = this;
	self.index_style = '';
}
RankingStatsPageCtr.$inject = ['$resource'];

function IndexStatsPageCtr($resource){
	self = this;
	self.index_style = 'top:-150px';
}
IndexStatsPageCtr.$inject = ['$resource'];

// Start number of actions when the page is loaded
function LoadPageCtrl($resource) {
  // Mapping the Global var to the current controller var
  // Note: Object copping in JavaScript is made by reference
  this.USER = window.USER;
  this.MENU = window.MENU;
  
  // Send a request back to the server which page was loaded and when
  LogAccessCtrl($resource);
  
  // Preload some basic images
  MM_preloadImages('_images/landingPages/landingPageButtons/singpathLogo_on.png','_images/landingPages/landingPageButtons/signUp_on.png','_images/landingPages/landingPageButtons/houseProfile_on.png','_images/landingPages/landingPageButtons/shoppingTrolley_on.png','_images/landingPages/landingPageButtons/gr8ph1csLogo_on.png','_images/landingPages/landingPageButtons/signIn_on.png');
}
LoadPageCtrl.$inject = ['$resource'];


// Send a request back to the server which page was loaded and when
function LogAccessCtrl($resource) {
  logAccess = $resource('../jsonapi/log_access').get(function() {
    logAccess.page = getHref();
    logAccess.date = new Date().getTime();
    
    // Saving will be available once we create the back-end server to response the POST requests
    // logAccess.$save();
  });
}


// Preload images
// TODO: To be updated
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}


function UserLoginMenuCtrl($resource, $window) {
  self = this;
  this.player = $resource('../jsonapi/player').get(function() {
    // Setting the Global var
    window.USER.isLogged = getUserLoggedInStatus(self.player);
    
    // Secure a maximum nickname chars so the string won't over flow outside the box
    self.player.nickname = clampString(self.player.nickname, 35);
  });
}
UserLoginMenuCtrl.$inject = ['$resource', '$window'];


function IndexCtrl($resource) {
  statsModel = $resource('../jsonapi/statistics');
  this.stats = statsModel.get();
  
  currentPlayersModel = $resource('../jsonapi/current_players');
  this.current_players = currentPlayersModel.query();
}
IndexCtrl.$inject = ['$resource'];


function FooterLogosCtrl($resource) {
  this.baseSrcBegin = "_images/landingPages/indexPage/logos/";
  this.baseSrcEnd   = "Logo.png";
  this.footerLogos  = $resource('../jsonapi/footerLogos').query();
}
FooterLogosCtrl.$inject = ['$resource'];


function RankingCtrl($resource) {
  countryModel = $resource("../jsonapi/country_ranking");
  this.country_ranking = countryModel.get();
  
  this.addZeros = function(elem){
		width = 2;
		number = elem.rank;
		width -= number.toString().length;
		if ( width > 0 )
		  {
		    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  }
		return number;
	}
}

RankingCtrl.$inject = ["$resource"];


function ContributionCtrl($resource) {
  // Setting all panel properties
  this.containerClass = "contributorsContainer";
  this.label          = "Contributors";
  this.btn            = {
    "href" : "contribution.html",
    "title": "View All Contributors",
    "size" : "small",
    "label": "View All Contributors"
  };
  
  // Getting all contributors from the jsonapi
  this.contributors = $resource('../jsonapi/contributors').query();
  
  // Cache the base sorce path so we could keep the database thin
  this.baseSrc = '../kit/_images/landingPages/contributionPage/profiles/';
};
ContributionCtrl.$inject = ['$resource'];


function StaffCtrl($resource) {
  // Setting all panel properties
  this.containerClass = "staffContainer";
  this.label          = "Staff";
  this.btn            = {
    "href" : "staff.html",
    "title": "More Staff",
    "size" : "big",
    "label": "More Staff"
  };
  
  // Getting all contributors from the jsonapi
  this.staff = $resource('../jsonapi/staff').query();
  
  // Cache the base sorce path so we could keep the database thin
  this.baseSrc = '../kit/_images/landingPages/contributionPage/profiles/';
};
StaffCtrl.$inject = ['$resource'];


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
    this.countries = [];
    this.countriesCount= function(){
        var index = 0;
    	angular.forEach(this.allCountries.countries, function(elem) {
          ++index;
        });
    	return index;
      };
}

CountriesCtrl.$inject = ["$resource"];


function TagsCtrl($resource,$location){
	tagsCtrl = $resource('../jsonapi/tags');
	var self = this;
	this.tags = [];
	this.tagsCtrl = tagsCtrl.get(function(){
		angular.forEach(self.tagsCtrl.tags, function(elem) {
			self.tags.push(elem);
	    });
		if ($location.search().tag){
			var selected = -1;
			var pointer = 0;
			angular.forEach(self.tagsCtrl.tags, function(elem) {
		          if (elem==$location.search().tag){
		        	  selected = pointer;
		          }
		           ++pointer;
		    });
			if (selected==-1){
				//insert the new tag into the array
				self.tags.push($location.search().tag);
				selected = self.tags.length-1;
			}
			self.index = selected;
		}
	});
	this.index = 0;
	this.tagCount= function(){
        var index = 0;
    	angular.forEach(self.tags, function(elem) {
          ++index;
        });
    	return index;
    };
	this.selectNextTag = function(){
		if (this.index<this.tagCount()-1)
			++this.index;
		else
			this.index = 0;
	}
}

TagsCtrl.$inject = ['$resource','$location'];

function LanguageSelectorCtrl($resource){
	var self = this;
	this.allClass = 'on';
	this.languages = []
	languageSelector = $resource('../jsonapi/get_game_paths');
	this.languageSelector = languageSelector.get(function(){
			angular.forEach(self.languageSelector.paths, function(elem) {
				self.languages.push({data:elem,selected:false});
			});
	});
	this.pathSelected=function(path){
		var index = 0;
		var selected = -1
		angular.forEach(self.languageSelector.paths, function(elem) {
				if (elem==path)
					selected = index;
				++index;
		});
		if (selected!=-1 && self.languages[selected].selected)
			return "on";
		return "off";
	}
	this.pathAllSelected = function(){
		return this.allClass;
	}
	this.setPathAllSelected = function(value){
		this.allClass=value;
	}
	
	this.setPathSelected=function(path,all){
		var index = 0;
		var selected = -1;
		angular.forEach(self.languageSelector.paths, function(elem) {
				if (elem==path)
					selected = index;
				++index;
		});
		angular.forEach(self.languages,function(elem){
			elem.selected = false;
		});
		if (all){
			self.setPathAllSelected('on');
		}
		else{
			self.setPathAllSelected('off');
			self.languages[selected].selected = true;
		}
	}
}
LanguageSelectorCtrl.$inject = ["$resource"];

function ChallengeAnswerCtrl($resource,$location){
	challengeRes = $resource('../jsonapi/get_challenge_player_message?challenge_id=:challenge_id&player_id=:player_id');
	
	this.player_id = null;
	this.challenge_id = null;
	this.challenge = null;
	this.name = null;
	this.publicMessage = null;
	this.registeredMessage = null;
	this.unlockMessage = null;
	this.privateMessage = null;
	this.challenge_id = null;
	this.playerFeedback = null;
	this.playerAttachmentID = null;
	
	var self = this;
	if ($location.search().challenge_id && $location.search().player_id ){
		this.challenge_id = $location.search().challenge_id;
	    this.player_id = $location.search().player_id;
		this.challenge = challengeRes.get({challenge_id: this.challenge_id, player_id: this.player_id},
		function(){
			self.name=self.challenge.challenge.name;
            self.publicMessage = self.challenge.challenge.publicMessage;
            self.registeredMessage = self.challenge.challenge.registeredMessage;
            self.unlockMessage=self.challenge.challenge.unlockMessage;
            self.privateMessage=self.challenge.challenge.privateMessage;
            self.challenge_id=self.challenge.challenge.challenge_id;
            self.playerFeedback=self.challenge.challenge.playerFeedback;
            self.playerAttachmentID =self.challenge.challenge.playerAttachmentID;
		}
		);
	}
}

ChallengeAnswerCtrl.$inject = ['$resource'];


function TournamentsCtrl($resource){
	var self = this;
	tournament = $resource("../jsonapi/list_tournaments");
	this.tournament = tournament.query(function(){
			renderTournamentList(self.tournament);
			if (getTournamentID()) {
					tournament_registration_status = $resource('../jsonapi/tournament_registration_status/' + getTournamentID());
					tournament_registration_status_get = tournament_registration_status.get(function(){
						checkTournamentRegistrationStatus(tournament_registration_status_get);
						reloadTournamentPage(getTournamentID());
					});
		      } else {
		        disableSignIn();
		      }
	});
}

TournamentsCtrl.$inject = ['$resource'];

function TournamentCtrl($resource){
	var self = this;
	var tournamentID = getParameterFromURL('tournamentID');
	tournament = $resource('../jsonapi/tournament/'+tournamentID);
	this.tournament = tournament.get(function(){
		renderTournamentRanking(self.tournament)
	});
}

TournamentCtrl.$inject = ['$resource'];


function ChallengesCtrl($resource){
		var self = this;
		this.loadChallenges = function (is_all_challenges){
		        var challenges_per_page = 30;
				var data = {};
			    if (getPathId()) {
			        data['path_id' ] = getPathId();
			    }
			    var challenges_per_page = 30;
			    data['limit'] = challenges_per_page + 1;
			    var page = (is_all_challenges ? page_all_challenges : page_my_challenges);
			    data['offset'] = challenges_per_page * page;
			    var url = (is_all_challenges ? '../jsonapi/list_challenges' : '../jsonapi/list_my_challenges');
			    url = url + '?path_id=:path_id&limit=:limit&offset=:offset'
			    var prevCode;
			    var nextCode;
			    if (is_all_challenges) {
			        prevCode = 'page_all_challenges--;loadChallenges()';
			        nextCode = 'page_all_challenges++;loadChallenges()';
			    } else {
			        prevCode = 'page_my_challenges--;loadMyChallenges()';
			        nextCode = 'page_my_challenges++;loadMyChallenges()';
			    }
				challengeRes = $resource(url);
				this.badgesById = {};
				this.countriesById = {};
				this.challenge = challengeRes.get({path_id:data['path_id' ],limit:data['limit'],offset:data['offset']},function(){
					all_badges = $resource("../jsonapi/all_badges");
					self.badges = all_badges.get(function(){
						 for (var i in self.badges['badges']) {
				                var b = self.badges['badges'][i];
				                self.badgesById[b['id']] = b;
				            }
						 all_countries = $resource("../jsonapi/all_countries");
						 self.countries = all_countries.get(function(){
							 for (var i in self.countries['countries']) {
					                var b = self.countries['countries'][i];
					                var name = b['countryName'];
					                self.countriesById[b['id']] = b;
					            }
							 renderChallenges(
									 	self.countriesById,
										self.badgesById,
										self.challenge,
						                is_all_challenges,
						                challenges_per_page,
						                data['offset'],
						                prevCode,
						                nextCode);
						 	});
					 });
				});
		}
		this.loadChallenges(true);
}

ChallengesCtrl.$inject = ['$resource'];

function ChallengesAllCtrl($resource){
		var self = this;
	    var url = '../jsonapi/list_challenges';
	    this.badgesById = {};
		this.countriesById = {};
	    challengeRes = $resource(url);
		this.challenge = challengeRes.get(function(){
			all_badges = $resource("../jsonapi/all_badges");
			self.badges = all_badges.get(function(){
				 for (var i in self.badges['badges']) {
		                var b = self.badges['badges'][i];
		                self.badgesById[b['id']] = b;
		            }
				 all_countries = $resource("../jsonapi/all_countries");
				 self.countries = all_countries.get(function(){
					 for (var i in self.countries['countries']) {
			                var b = self.countries['countries'][i];
			                var name = b['countryName'];
			                self.countriesById[b['id']] = b;
			            }
					 	loadChallenges(self.challenge,self.badgesById,self.countriesById)
				 	});
			 });
		});
}
ChallengesAllCtrl.$inject = ['$resource'];


function ListChallengePlayersCtrl($resource){
	var self = this;
	var challenge_id = getIdFromURL('challenge_id');
	if (challenge_id){
			var url = '../jsonapi/list_challenge_players';
			url = url + '?challenge_id=:challenge_id';
			challengeRes = $resource(url);
			this.challenge = challengeRes.get({challenge_id:challenge_id},function(){
					loadChallengePlayers(self.challenge);
			});
	}
}

ListChallengePlayersCtrl.$inject = ['$resource'];



function LoadProblemCtrl($resource){
    		var self = this;
    		var problem_id = getIdFromURL('problem_id');
    		if (problem_id){
    				var url = '../jsonapi/get_problem';
    				url = url + '?problem_id=:problem_id';
    				problemRes = $resource(url);
    				this.problemRes = problemRes.get({problem_id:problem_id},function(){
    					loadProblem(self.problemRes);
    				});
    		}else {
    	        loadLanguages();
    	    }
}
LoadProblemCtrl.$inject = ['$resource'];
    	
    	

function GetGamePathCtrl($resource){
	var self = this;
	var url = '../jsonapi/get_game_paths';
	challengeRes = $resource(url);
	this.get_game_paths = challengeRes.get(function(){
		 		all_countries = $resource("../jsonapi/all_countries");
				 self.countries = all_countries.get(function(){
					 //var url = '../jsonapi/get_challenge_for_edit';
					//url = url + '?challenge_id=:challenge_id';
					//	get_challenge_for_edit = $resource(url);
					//	self.get_challenge_for_edit = get_challenge_for_edit.get(function(){
							loadCountries(self.countries);
						 	loadGamePathsAndBadges(self.get_game_paths);
					//		loadChallenge(self.get_challenge_for_edit);
					//	});
				 });
	});
}
GetGamePathCtrl.$inject = ['$resource'];

function GetChallengeForEditCtrl($resource){
	var self = this;
	
}
GetChallengeForEditCtrl.$inject = ['$resource'];


function TournamentRankingCtrl($resource){
	tournamentRanking = $resource('../jsonapi/get_heat_ranking');
	
	this.tournamentRanking = tournamentRanking.get();
}

TournamentRankingCtrl.$inject = ["$resource"];

function WorldWideRankingCtrl($resource){
	this.ranking = [];
	var scope = this;
	this.currentCountry = "Singapore";
	this.currentCountryCode = "SG";
	this.activeWorldRanking = false;
	worldWideRanking = $resource('../jsonapi/worldwide_ranking?maxRank=:maxRank&path_id=:path_id&countryCode=:countryCode',{maxRank:'25',path_id:'6569723',countryCode:'SG'});
	this.worldWideRanking = worldWideRanking.get({maxRank:'25',path_id:'6569723',countryCode:'SG'},function(){
		scope.initRanking(scope.doFilterByCountry);
	});
	
	this.getStyle0 = function(){
		return this.style0;
	}
	
	this.getStyle = function(){
		return this.style;
	}
	
	this.getStyle2 = function(){
		return this.style2;
	}
	
	this.getStyle3 = function(){
		return this.style3;
	}
	
	this.getStyle4 = function(){
		return this.style4;
	}
	
	this.activateWorldRanking = function(){
				 scope.activeWorldRanking = true;
				 this.style0={
			      'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
			  	  'background-position': '-35px -52px',
			  	  'background-repeat': 'no-repeat',
			  	  'width': '8px',
			  	  'cursor': 'pointer'
			      }; 
			      this.style3={
			      	'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
			  		'background-position': '-170px -52px',
			  		'background-repeat': 'no-repeat',
			  		'width': '8px',
			  		'cursor': 'pointer'
			      };
			      this.style4={
			      	'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
			  		'background-position': '-13px -52px',
			  		'background-repeat': 'no-repeat',
			  		'width': '18px'
			      };
			      this.style2={
				  'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
			  	  'background-position': '0px -27px',
			  	  'background-repeat': 'no-repeat',
			  	  'color': 'white',
			  	  'font-size': '16px',
			  	  'font-weight': 'normal'
				  };
			      this.style= {
			        'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
					'background-position': '0px -1px',
					'background-repeat': 'no-repeat',
					'color': '#49727A',
					'font-size': '16px',
					'font-weight': 'normal',
					'cursor': 'pointer'
					};
	}
	
	this.activateTabCountry = function(){
			  scope.activeWorldRanking = false;
			  this.style0={
			  'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
		  	  'background-position': '0px -52px',
		  	  'background-repeat': 'no-repeat',
		  	  'width': '8px'
			  };
		      this.style3={
			  'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
		  	  'background-position': '-129px -52px',
		  	  'background-repeat': 'no-repeat',
		  	  'width': '8px'
			  };
		      this.style4={
			  	'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
		  		'background-position': '-45px -52px',
		  		'background-repeat': 'no-repeat',
		  		'width': '23px',
		  		'cursor': 'pointer'
			  };
		      this.style={
			  'background-image': 'url(_images/commonButtons/tab-headers-combined.png)',
		  	  'background-position': '0px -27px',
		  	  'background-repeat': 'no-repeat',
		  	  'color': 'white',
		  	  'font-size': '16px',
		  	  'font-weight': 'normal'
			  };
		      this.style2= {'cursor':'pointer','color': '#517A83', 'border': '0px none #FFF100', 'background': 'url(_images/commonButtons/tab-headers-combined.png) no-repeat 0px 0px' };
	}

	this.loadLanguage = function(path_id){
		scope.path_id = path_id;
		scope.worldWideRanking = worldWideRanking.get({maxRank:'25',path_id:scope.path_id,countryCode:this.currentCountryCode},function(){
			if (scope.activeWorldRanking)
				scope.initRanking(scope.doFilter);
			else
				scope.initRanking(scope.doFilterByCountry);
		});
	}  
	
	this.getCurrentCountry=function(){
		return scope.currentCountry;
	}
	
	this.checkLast = function(elem){
		var index = this.ranking.indexOf(elem);
		var count = this.playersCount();
		if (elem.rank>25)
			return "UR";
		width = 2;
		number = elem.rank;
		width -= number.toString().length;
		if ( width > 0 )
		  {
		    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  }
		return number;
	}
	this.addZeros = function(elem){
		width = 2;
		number = elem.rank;
		if (elem.rank>25)
			return "25";
		width -= number.toString().length;
		if ( width > 0 )
		  {
		    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  }
		return number;
	}
	this.doLanguageSelection = function(elem){
		return elem.path_id==scope.current_path_id;
	}
	this.doFilter = function(elem) {
        return true;
    }
	
	this.doFilterByCountry = function(elem) {
        var isOK = elem.playerCountry.countryName==scope.currentCountry;
        if (isOK){
        	return true;
        }
        return false;
    }
	this.setCountry = function(country){
		scope.currentCountry = country.countryName;
		scope.currentCountryCode = country.country_code;
		scope.worldWideRanking = worldWideRanking.get({maxRank:'25',path_id:scope.path_id,countryCode:this.currentCountryCode},function(){
			scope.initRanking(scope.doFilterByCountry);
		});
		scope.activateTabCountry();
	}
	this.getRanking = function(){
			return scope.ranking;
	}
	this.initRanking = function(whichFilter){
		scope.currentFilter = whichFilter;
		scope.ranking = [];
		angular.forEach(scope.worldWideRanking.rankings.filter(scope.currentFilter), function(elem) {
	          scope.ranking.push(elem);
	    });
	}
	this.reloadRanking = function(){
		scope.ranking = [];
		angular.forEach(scope.worldWideRanking.rankings.filter(this.currentFilter), function(elem) {
	          scope.ranking.push(elem);
	    });
	}
	
	this.playersCount= function(){
        var index = 0;
    	angular.forEach(this.worldWideRanking.rankings, function(elem) {
          ++index;
        });
    	return index;
      };
      //this.initRanking(scope.doFilter);
}

WorldWideRankingCtrl.$inject = ["$resource"];


function HeatRankingCtrl($resource){
	heatRanking = $resource('../jsonapi/get_heat_ranking');
	this.heatRanking = heatRanking.get();
	this.heatRankingArray = [];
	
	this.doFilter = function(elem) {
        this.heatRankingArray.push(elem);
        return true;
    }
	this.doFilter2 = function(elem) {
        this.heatRankingArray.push(elem);
        return true;
    }
}
HeatRankingCtrl.$inject = ["$resource"];


function HeadMenuOptionsCtrl($resource, $location) {
  // Taking all menu options
  this.options = $resource('../jsonapi/headMenuOptions').query(function(options) {
    // Setting the selected menu option as 'menuSelected' regarding the page href
    href = getHref();
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


function GoogleAnalyticsCtrl() {
  // Location Google Analytics JS file
  this.gaJsSrc = getFirstURLChars() + 'google-analytics.com/ga.js';
}


function JanrainCtrl() {
  // Location Janrain JS file
  this.rpxJsSrc = getFirstURLChars() + 'rpxnow.com/js/lib/rpx.js';
}


function CopyrightCtrl() {
  // Setting the Copyright year
  this.year = new Date().getFullYear();
}


// Controller for the home.html
function HomeController($resource, $route){
  this.jsonapi = $resource('../jsonapi/:id', {id: '@id'});
  this.loadPlayer();
}

HomeController.prototype.loadPlayer = function() {
  that = this;
  
  // Loading a test player
  this.jsonapi.get({id: 'player_test'}, function(player){
    that.player = player;
  });
}

HomeController.$inject = ['$resource', '$route'];
