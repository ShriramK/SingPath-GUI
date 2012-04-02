/* Controllers used in home.html */

/*
  Important note:
    Since the hight use of call backs, every now and then references overlap.
    This makes a nightmare for bug fixation and etc.
    To prevent such a behaviour "that" reference of "this" should have some index included.
*/

function ProfilePanelCtrl($resource) {
  thatProfile         = this;
  this.containerClass = "profileContainer";
  this.label          = "Profile";
  this.btn            = {
    "href" : "#/edit-profile",
    "title": "Edit Profile",
    "size" : "big",
    "label": "Edit Profile",
    "fn": function() {
      thatProfile.popUp.class = "show";
    }
  };
  
  // Set popUp class
  this.popUp = {
    "class": "hide"
  }
  
  // Load Player profile data
  this.profile = $resource('../jsonapi/player_test').get(function(profile) {
    thatProfile.profile = profile;
    
    // Setting a global user id
    window.USER.id = profile.player_id;
    
    
    // Setting profile data
    
    // Set a maximum of 1000 chars to descript the player's location
    thatProfile.locationRegExp = new RegExp(/^.{2,1000}$/);
    // Set a maximum of visible chars for the panel variable
    thatProfile.profile.locationClamp = clampString(thatProfile.profile.location, 35);
    
    // Validating a time frame of 200 years
    thatProfile.yearRegExp = new RegExp(/^((19)|(20))\d{2}$/);
    
    // Sets a maximum of 30 total chars that the hole array elements cannot exceed
    thatProfile.visibleTags = clampArrayByStringLength(thatProfile.profile.tags, 30);
    // Gets all tags and set them in a single string
    thatProfile.profile.tagsAsText = thatProfile.profile.tags.join(', ');
    // Validates all tag's combinations and sets a limit of 50 tags
    thatProfile.tagsRegExp         = new RegExp(/^([^,]{2,},[ ]+){0,49}([^,]{2,})?$/);
    
    thatProfile.profile.professional = profile.professional*1 ? 'professional' : 'student';
    thatProfile.profile.countrySrc   = '../static/flags/'+ profile.countryCode.toLowerCase() +'_on.png';
    thatProfile.profile.genderSrc    = '../kit/_images/commonButtons/genderIcon'+ profile.gender.capitalFirstLetter() +'_off.png';
    
    // Set a maximum of visible chars for the panel variable
    thatProfile.profile.aboutClapm = clampString(thatProfile.profile.about, 140);
    // Any text above 1000 chars will be invalid
    thatProfile.aboutRegExp = new RegExp(/^.{0,1000}$/);
  });
}
ProfilePanelCtrl.$inject = ['$resource'];


function BadgesPanelCtrl($resource) {
  thatBadges          = this;
  this.containerClass = "badgesContainer";
  this.label          = "Badges";
  this.btn            = {
    "href" : "badges.html",
    "title": "View Badges",
    "size" : "big",
    "label": "View Badges"
  };
  
  // Check if some controller have alreasy load the user id
  if(window.USER.id) {
    loadUserBadges(window.USER.id);
  } else {
    $resource('../jsonapi/player_test').get(function(profile) {
      // Setting a global user id
      window.USER.id = profile.player_id;
      
      loadUserBadges(window.USER.id);
    });
  }
  
  
  // Load all user badges regardin sent user id
  function loadUserBadges(id) {
    thatBadges.badgesResource = $resource('../jsonapi/badges_for_current_player/'+ id).get(function(badgesResource) {
      thatBadges.badgesResource = badgesResource;
      
      thatBadges.badges_type = thatBadges.badgesResource.type;
      thatBadges.badges      = thatBadges.badgesResource.badges;
    });
  }
}
BadgesPanelCtrl.$inject = ['$resource'];


function ChallengesPanelCtrl() {
  this.containerClass = "challengesContainer";
  this.label          = "Challenges";
  this.btn            = {
    "href" : "challengeBoard.html",
    "title": "Challenge Board",
    "size" : "big",
    "label": "Challenge Board"
  };
}


function RankingPanelCtrl($resource) {
  thatRanking         = this;
  this.containerClass = "rankingContainer";
  
  $resource('../jsonapi/ranking').get(function(ranking) {
    thatRanking.label = ranking.path_description + " Rankings";
    thatRanking.btn   = {
      "href" : "ranking.html?path_id="+ ranking.path_id,
      "title": "View Rankings",
      "size" : "big",
      "label": "View Rankings"
    };
    
    thatRanking.players = ranking.players;
    for(i in thatRanking.players) {
      player = thatRanking.players[i];
      
      // Setting rank image properties
      rank        = player.rank;
      player.rank = {
        "src": "_images/commonButtons/numbers/number0"+ rank +".png",
        "alt": "Rank "+ rank
      }
      
      // Setting rank image properties
      player.gravatar = {
        "src": player.gravatar,
        "alt": player.name +"'s gravatar"
      }
      
      // Setting the max chars per player name
      player.name = clampString(player.name, 20);
    }
  });
}
RankingPanelCtrl.$inject = ['$resource'];
