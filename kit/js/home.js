/* Controllers used in home.html */

function ProfilePanelCtrl($resource) {
  that                = this;
  this.containerClass = "profileContainer";
  this.btnTitle       = "Edit Details";
  this.label          = "Profile";
  
  this.profile = $resource('../jsonapi/player_test').get(function() {
    that.profile.professional = that.profile.professional ? 'professional' : 'student';
    that.profile.countrySrc   = '../static/flags/'+ that.profile.countryCode.toLowerCase() +'_on.png';
    that.profile.genderSrc    = '../kit/_images/commonButtons/genderIcon'+ that.profile.gender.capitalFirstLetter() +'_off.png';
  });
}

ProfilePanelCtrl.$inject = ['$resource'];


function BadgesPanelCtrl($resource) {
  that                = this;
  this.containerClass = "profileContainer";
  this.btnTitle       = "Edit Details";
  this.label          = "Profile";
  
  this.profile = $resource('../jsonapi/player_test').get(function() {
    that.profile.professional = that.profile.professional ? 'professional' : 'student';
    that.profile.countrySrc   = '../static/flags/'+ that.profile.countryCode.toLowerCase() +'_on.png';
    that.profile.genderSrc    = '../kit/_images/commonButtons/genderIcon'+ that.profile.gender.capitalFirstLetter() +'_off.png';
  });
}

BadgesPanelCtrl.$inject = ['$resource'];

