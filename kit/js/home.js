/* Controllers used in home.html */


function ProfilePanelCtrl($scope, $resource) {
  $scope.containerClass = "profileContainer";
  $scope.label          = "Profile";
  $scope.btn            = {
    "href" : "#/edit-profile",
    "title": "Edit Profile",
    "size" : "big",
    "label": "Edit Profile",
    "fn"   : function() {
      $scope.popUp.class = "show";
    }
  };
  $scope.gravatarBtn    = {
    "href"  : "http://www.gravatar.com",
    "size"  : "small",
    "target": "_blank",
    "title" : "Change Your Gravatar from www.gravatar.com",
    "label" : "Change Gravatar"
  };
  
  
  // Set popUp details
  $scope.popUp = {
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
        if(!$scope.popUp.saving) {
          // Set a disabled view for the btn
          $scope.popUp.btn.label = 'Saving...';
          $scope.popUp.btn.class = 'on';
          
          // Saving is disabled coz so far the server cannot handle POST requests
          // $scope.profileResource.$save();

          $scope.popUp.btn.label = 'Save Details';
          $scope.popUp.btn.class = '';
          $scope.popUp.saving    = false;
        }
        
        // Disable multiple clicks on the Footer btn
        $scope.popUp.saving = true;
      }
    }
  }
  
  
  // Load Player profile data
  $scope.profileResource = $resource('../jsonapi/player_test').get(function(profile) {
    // Copy the original profile data so we could display it in the popUp
    $scope.profilePopUp = profile;
    
    // The logic behind having a profile clone for the panel is not to change any
    // of the data in the panel before the user save his own changes with the popUp 'Save Details' btn
    $scope.profile = clone(profile);
    
    
    // Setting a global user id
    window.USER.id = profile.player_id;
    
    
    // Setting profile data
    
    // Name
    // Set a range between nicknameMinChars and nicknameMaxChars chars for player's nickname
    var nicknameMinChars    = 2;
    var nicknameMaxChars    = 200;
    $scope.nicknameRegExp   = new RegExp('^.{'+ nicknameMinChars +','+ nicknameMaxChars +'}$');
    $scope.nicknameErrorMsg = 'Your name must be between '+ nicknameMinChars +' and '+ nicknameMaxChars +' characters';
    
    // Location 
    // Set a range between locationMinChars and locationMaxChars chars to descript the player's location
    var locationMinChars    = 2;
    var locationMaxChars    = 1000;
    $scope.locationRegExp   = new RegExp('^.{'+ locationMinChars +','+ locationMaxChars +'}$');
    $scope.locationErrorMsg = 'Your location must be described in between '+ locationMinChars +' and '+ locationMaxChars +' characters';
    
    // Set a maximum of visible chars for the panel variable
    $scope.profile.locationClamp = clampString(profile.location, 35);
    
    
    // Gender options
    $scope.profilePopUp.genders = ['secret', 'male', 'female']
    
    
    // Year of Birth
    // Validating a time frame between 1912 and 2002
    // or anyone between the age of 10 upto 100
    $scope.yearRegExp   = new RegExp(/^(19((1[2-9])|([2-9]\d)))|(200[0-2])$/);
    $scope.yearErrorMsg = 'Please enter a year between 1912 and 2002';
    
    
    // Tags
    // Sets a maximum of 30 total chars that the hole array elements cannot exceed
    $scope.visibleTags = clampArrayByStringLength($scope.profilePopUp.tags, 30);
    
    // Gets all tags and set them in a single string
    $scope.profilePopUp.tagsAsText = $scope.profilePopUp.tags.join(', ');
    
    // Validates all tag's combinations and sets a limit of maxTags
    var maxTags         = 50;
    $scope.tagsRegExp   = new RegExp('^([^,]{2,},[ ]+){0,'+ (maxTags-1) +'}([^,]{2,})?$');
    $scope.tagsErrorMsg = 'Please follow the syntax of "tag1, tag2, ..., tagN" for maximum of '+ maxTags +' tags';
    
    
    // Professional option and label 
    $scope.profilePopUp.professionalOption = profile.professional*1;
    $scope.profile.professionalLabel       = $scope.profilePopUp.professionalOption ? 'professional' : 'student';
    
    
    // Country and Gender Flags
    $scope.profile.countrySrc = '../static/flags/'+ profile.countryCode.toLowerCase() +'_on.png';
    $scope.profile.genderSrc  = '../kit/_images/commonButtons/genderIcon'+ profile.gender.capitalFirstLetter() +'_off.png';
    
    
    // About
    // Set a maximum of visible chars for the panel variable
    $scope.profile.aboutClapm = clampString(profile.about, 140);
    
    // Any text above aboutTextMax chars will be invalid
    var aboutTextMax     = 1000;
    $scope.aboutRegExp   = new RegExp('^.{0,'+ aboutTextMax +'}$');
    $scope.aboutErrorMsg = 'The message about yourself cannot exceed more than '+ aboutTextMax +' characters';
  });
}
ProfilePanelCtrl.$inject = ['$scope', '$resource'];


function BadgesPanelCtrl($scope, $resource) {
  $scope.containerClass = "badgesContainer";
  $scope.label          = "Badges";
  $scope.btn            = {
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
    $scope.badgesResource = $resource('../jsonapi/badges_for_current_player/'+ id).get(function(badgesResource) {
      $scope.badgesResource = badgesResource;
      
      $scope.badges_type = $scope.badgesResource.type;
      $scope.badges      = $scope.badgesResource.badges;
    });
  }
}
BadgesPanelCtrl.$inject = ['$scope', '$resource'];


function ChallengesPanelCtrl($scope) {
  $scope.containerClass = "challengesContainer";
  $scope.label          = "Challenges";
  $scope.btn            = {
    "href" : "challengeBoard.html",
    "title": "Challenge Board",
    "size" : "big",
    "label": "Challenge Board"
  };
}


function RankingPanelCtrl($scope, $resource) {
  $scope.containerClass = "rankingContainer";
  
  $resource('../jsonapi/ranking').get(function(ranking) {
    $scope.label = ranking.path_description + " Rankings";
    $scope.btn   = {
      "href" : "ranking.html?path_id="+ ranking.path_id,
      "title": "View Rankings",
      "size" : "big",
      "label": "View Rankings"
    };
    
    $scope.players = ranking.players;
    for(i in $scope.players) {
      player = $scope.players[i];
      
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
RankingPanelCtrl.$inject = ['$scope', '$resource'];
