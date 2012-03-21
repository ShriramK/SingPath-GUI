/* Controllers used in home.html */

function ProfilePanelCtrl($resource) {
  that                = this;
  this.containerClass = "profileContainer";
  this.btnTitle       = "Edit Details";
  this.label          = "Profile";
  
  this.profile = $resource('../jsonapi/player_test').get(function(profile) {
    that.profile = profile;
    
    // Setting a global user id
    window.USER.id = profile.player_id;
    
    // Setting profile data
    that.profile.professional = profile.professional*1 ? 'professional' : 'student';
    that.profile.countrySrc   = '../static/flags/'+ profile.countryCode.toLowerCase() +'_on.png';
    that.profile.genderSrc    = '../kit/_images/commonButtons/genderIcon'+ profile.gender.capitalFirstLetter() +'_off.png';
  });
}

ProfilePanelCtrl.$inject = ['$resource'];


function BadgesPanelCtrl($resource) {
  that                = this;
  this.containerClass = "badgesContainer";
  this.btnTitle       = "View Badges";
  this.label          = "Badges";
  
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
    that.badgesResource = $resource('../jsonapi/badges_for_current_player/'+ id).get(function(badgesResource) {
      that.badgesResource = badgesResource;
      
      that.badges_type = that.badgesResource.type;
      that.badges      = that.badgesResource.badges;
    });
  }
}

BadgesPanelCtrl.$inject = ['$resource'];

