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
    "fn"   : function() {
      thatProfile.popUp.class = "show";
    }
  };
  this.gravatarBtn    = {
    "href"  : "http://www.gravatar.com",
    "size"  : "small",
    "target": "_blank",
    "title" : "Change Your Gravatar from www.gravatar.com",
    "label" : "Change Gravatar"
  };
  
  
  // Set popUp details
  this.popUp = {
    // Set a form name, visible in the HTML and in the Angular code
    "formName": "popUpEditProfile",
    
    // Display class
    "class": "hide",
    
    // Footer btn details
    "btn": {
      "class"     : "",
      "label"     : "Save Details",
      "errorLabel": "Error",
      
      // Secure 1 click only on the Footer btn
      "saving": false,
      
      // Onclick function for the Footer btn
      "save": function() {
        // Check if the btn was already clicked
        if(!thatProfile.popUp.saving) {
          // Set a disabled view for the btn
          thatProfile.popUp.btn.label = 'Saving...';
          thatProfile.popUp.btn.class = 'on';
          
          // Saving is disabled coz so far the server cannot handle POST requests
          // thatProfile.profileResource.$save();

          thatProfile.popUp.btn.label = 'Save Details';
          thatProfile.popUp.btn.class = '';
          thatProfile.popUp.saving    = false;
        }
        
        // Disable multiple clicks on the Footer btn
        thatProfile.popUp.saving = true;
      }
    }
  }
  
  
  // Load Player profile data
  this.profileResource = $resource('../jsonapi/player_test').get(function(profile) {
    // Copy the original profile data so we could display it in the popUp
    thatProfile.profilePopUp = profile;
    
    // The logic behind having a profile clone for the panel is not to change any
    // of the data in the panel before the user save his own changes with the popUp 'Save Details' btn
    thatProfile.profile = clone(profile);
    
    
    // Setting a global user id
    window.USER.id = profile.player_id;
    
    
    // Setting profile data
    
    // Name
    // Set a range between nicknameMinChars and nicknameMaxChars chars for player's nickname
    var nicknameMinChars         = 2;
    var nicknameMaxChars         = 200;
    thatProfile.nicknameRegExp   = new RegExp('^.{'+ nicknameMinChars +','+ nicknameMaxChars +'}$');
    thatProfile.nicknameErrorMsg = 'Your name must be between '+ nicknameMinChars +' and '+ nicknameMaxChars +' characters';
    
    // Location 
    // Set a range between locationMinChars and locationMaxChars chars to descript the player's location
    var locationMinChars         = 2;
    var locationMaxChars         = 1000;
    thatProfile.locationRegExp   = new RegExp('^.{'+ locationMinChars +','+ locationMaxChars +'}$');
    thatProfile.locationErrorMsg = 'Your location must be described in between '+ locationMinChars +' and '+ locationMaxChars +' characters';
    
    // Set a maximum of visible chars for the panel variable
    thatProfile.profile.locationClamp = clampString(profile.location, 35);
    
    
    // Gender options
    thatProfile.profilePopUp.genders = ['secret', 'male', 'female']
    
    
    // Year of Birth
    // Validating a time frame between 1912 and 2002
    // or anyone between the age of 10 upto 100
    thatProfile.yearRegExp   = new RegExp(/^(19((1[2-9])|([2-9]\d)))|(200[0-2])$/);
    thatProfile.yearErrorMsg = 'Please enter a year between 1912 and 2002';
    
    
    // Tags
    // Sets a maximum of 30 total chars that the hole array elements cannot exceed
    thatProfile.visibleTags = clampArrayByStringLength(thatProfile.profilePopUp.tags, 30);
    
    // Gets all tags and set them in a single string
    thatProfile.profilePopUp.tagsAsText = thatProfile.profilePopUp.tags.join(', ');
    
    // Validates all tag's combinations and sets a limit of maxTags
    var maxTags              = 50;
    thatProfile.tagsRegExp   = new RegExp('^([^,]{2,},[ ]+){0,'+ (maxTags-1) +'}([^,]{2,})?$');
    thatProfile.tagsErrorMsg = 'Please follow the syntax of "tag1, tag2, ..., tagN" for maximum of '+ maxTags +' tags';
    
    
    // Professional option and label 
    thatProfile.profilePopUp.professionalOption = profile.professional*1;
    thatProfile.profile.professionalLabel       = thatProfile.profilePopUp.professionalOption ? 'professional' : 'student';
    
    
    // Country and Gender Flags
    thatProfile.profile.countrySrc = '../static/flags/'+ profile.countryCode.toLowerCase() +'_on.png';
    thatProfile.profile.genderSrc  = '../kit/_images/commonButtons/genderIcon'+ profile.gender.capitalFirstLetter() +'_off.png';
    
    
    // About
    // Set a maximum of visible chars for the panel variable
    thatProfile.profile.aboutClapm = clampString(profile.about, 140);
    
    // Any text above aboutTextMax chars will be invalid
    var aboutTextMax          = 1000;
    thatProfile.aboutRegExp   = new RegExp('^.{0,'+ aboutTextMax +'}$');
    thatProfile.aboutErrorMsg = 'The message about yourself cannot exceed more than '+ aboutTextMax +' characters';
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
