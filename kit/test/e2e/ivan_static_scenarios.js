// Common tests

// Testing element cloak removal from the element selector
function testCloak(selector) {
  expect(element(selector).attr('ng:cloak')).not().toBeDefined();
}


// Test the image base and hover URLs
function testImageBaseAndHover($image, imagesUrl) {
  // Test image base URL
  expect($image.css('background-image')).toBe('url(\"'+ imagesUrl +'_off.png\")');
  
  // Test image hover URL
  $image.attr('class', 'hover');
  expect($image.css('background-image')).toBe('url(\"'+ imagesUrl +'_on.png\")');  
}


// Test all options from a given resource in a respected element from a given container selector
function testMenuOptions(options, containerSelector, selectedOptionClass) {
  // General test options function
  function test(windowPath) {
    windowHref = selectedOptionClass ? windowPath.substr(windowPath.lastIndexOf('/')+1) : '';
    
    // Test all options
    for(i in options) {
      option = options[i];
      
      // Test selected menu option if needed
      if(windowHref == option["href"] && selectedOptionClass) {
        expect(element(containerSelector + ' > a:eq('+ i +')').attr("class")).toMatch(selectedOptionClass);
      }
      
      // Test all the rest option properties
      linkSelecter = containerSelector + ' > a:eq('+ i +')';
      
      expect(element(linkSelecter + ' > span').text()).toBe(option["text"]);
      expect(element(linkSelecter).attr("href")      ).toBe(option["href"]);
      expect(element(linkSelecter).attr("target")    ).toBe(option["target"]);
      expect(element(linkSelecter).attr("title")     ).toBe(option["title"]);
    }
  }
  
  // Getting window path if needed
  if (selectedOptionClass) {
    browser().window().path().execute(function(data, windowPath) { test(windowPath) });
  } else {
    test();
  }
}


// Test all Page Head Elements
function testPageHead() {
  testSiteLogo();
  testUserLoginMenu();
  testHeadMenuOptions();
}


// Test the site top left logo
function testSiteLogo() {
  $logo = element('#logo');
  
  // Test link properties
  expect($logo.attr('href')).toBe('home.html');
  expect($logo.attr('alt' )).toBe('Singpath Logo');
  
  // Test the logo base and hover URLs
  testImageBaseAndHover($logo, 'http://localhost/kit/_images/landingPages/landingPageButtons/singpathLogo');
}


// 
function testUserLoginMenu() {
  // TODO
}

// Testing all Head Menu options
function testHeadMenuOptions() {
  options = [
    {"text": "home"        , "href": "index.html"        , "target": "", "class": "", "title": "SingPath - The Most Fun Way to Practice Software"},
    {"text": "about us"    , "href": "aboutUs.html"      , "target": "", "class": "", "title": ""},
    {"text": "how to use"  , "href": "howToUse.html"     , "target": "", "class": "", "title": ""},
    {"text": "contribution", "href": "contributions.html", "target": "", "class": "", "title": ""},
    {"text": "tournament"  , "href": "tournament.html"   , "target": "", "class": "", "title": ""},
    {"text": "news"        , "href": "news.html"         , "target": "", "class": "", "title": ""},
    {"text": "shop"        , "href": "shop.html"         , "target": "", "class": "", "title": ""}
  ];
  
  // Test all Head Menu options from the given resouce
  testMenuOptions(options, '#menuOptionsText', 'menuSelected');
}


// Test all Page Footer Elements
function testPageFooter() {
  testFooterMenuOptions();
  testCopyright();
  testCompanyLogo();
}


// Test Footer Menu Options
function testFooterMenuOptions() {
  options = [
    {"text": "home"        , "href": "index.html"                         , "target": "",       "class": "", "title": "home page Link"},
    {"text": "about us"    , "href": "aboutUs.html"                       , "target": "",       "class": "", "title": ""},
    {"text": "how to use"  , "href": "howToUse.html"                      , "target": "",       "class": "", "title": ""},
    {"text": "terms of use", "href": "termsOfUse.html"                    , "target": "",       "class": "", "title": ""},
    {"text": "contribution", "href": "contributions.html"                 , "target": "",       "class": "", "title": ""},
    {"text": "feedback"    , "href": "http://getsatisfaction.com/singpath", "target": "_blank", "class": "", "title": ""},
    {"text": "contact us"  , "href": "aboutUs.html"                       , "target": "",       "class": "", "title": ""},
    {"text": "shop"        , "href": "shop.html"                          , "target": "",       "class": "", "title": ""},
    {"text": "sign out"    , "href": "logout"                             , "target": "",       "class": "", "title": ""}
  ];
  
  // Test all Footer Menu options from the given resouce
  testMenuOptions(options, '#menuFooterTop');
}


// Test Copyright elements
function testCopyright() {
  // Test the Copyright year
  expect(element('#menuFooterBottom > span:first').text()).toBe(new Date().getFullYear()+'');
}


// Test The visibility of the company logo
function testCompanyLogo() {
  // Test link properties
  $logo = element('#gr8ph1csLogo');
  expect($logo.attr('href'  )).toBe('http://www.Gr8ph1cs.com');
  expect($logo.attr('target')).toBe('_blank');
  expect($logo.attr('title' )).toBe('designed by gr8ph1cs Creative');
  
  // Test logo base and hover URLs
  testImageBaseAndHover($logo, 'http://localhost/kit/_images/landingPages/landingPageButtons/gr8ph1csLogo');
}


describe('Additinal tests from Ivan', function() {
  it('Testing kit/index.html', function() {
    browser().navigateTo('../../index.html');
    
    // Test initial input user name
    expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
    
    // Test the removing of the cloak over the stats menu
    testCloak('#statsTextBoxtext');
    
    
    // Testing all stats in the #statsTextBoxtext
    statsSelector = '#statsTextBoxtext > p > span > .ng-binding:eq';
    statsResource = {
      "num_players"      : "4306",
      "num_badges"       : "21,014",
      "most_popular_lang": "Python", 
      "last_player"      : "Secret Agent",
      "last_country"     : "Nigeria",
      "last_badge_earner": "John",
      "last_badge"       : "Python Level 5"
    }
    
    i=0;
    for(key in statsResource) {
      expect(element(statsSelector +'('+ i++ +')').text()).toBe(statsResource[key]);
    }
    
    
    playersSelector     = '#friendsTextBoxtext'
    playersFullSelector = playersSelector     + ' > span:eq';
    numPlayresSelector  = playersFullSelector + '(0)';
    
    // Test the removing of the cloak over the total number of current players
    testCloak(numPlayresSelector);
    
    // Test the total number of current players
    expect(element(numPlayresSelector + ' > span').text()).toBe("12");
    
    
    // Testing the Players content menu
    playersResources = [
      {"playerid": 58546, "nickname": "Danny", "rank": 1, "gravatar": "http://www.gravatar.com/avatar/cff81e54497e85d41ac0997f37e38416/?default=&amp;s=80"}, 
      {"playerid": 6618736, "nickname": "Lindroos", "rank": 2, "gravatar": "http://www.gravatar.com/avatar/700cc42121c63a4ae6dc074cca78b9e9/?default=&amp;s=80"}, 
      {"playerid": 6936456, "nickname": "cablin", "rank": 3, "gravatar": "http://www.gravatar.com/avatar/64add95e501623a59eff526cc433e288/?default=&amp;s=80"}, 
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"},
      {"playerid": 58546, "nickname": "Danny", "rank": 1, "gravatar": "http://www.gravatar.com/avatar/cff81e54497e85d41ac0997f37e38416/?default=&amp;s=80"}, 
      {"playerid": 6618736, "nickname": "Lindroos", "rank": 2, "gravatar": "http://www.gravatar.com/avatar/700cc42121c63a4ae6dc074cca78b9e9/?default=&amp;s=80"}, 
      {"playerid": 6936456, "nickname": "cablin", "rank": 3, "gravatar": "http://www.gravatar.com/avatar/64add95e501623a59eff526cc433e288/?default=&amp;s=80"}, 
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"},
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"}
    ];
    
    players              = using(playersSelector).repeater('.player');
    expectedPlayersCount = playersResources.length;
    expect(players.count()).toBe(expectedPlayersCount);
    
    // Test each player cloak removal and avatar properties
    for(key in playersResources) {
      playerResource = playersResources[key];
      playerSelector = playersFullSelector +'('+ (key*1+1) +')';
      
      // Test cloak
      testCloak(playerSelector);
      
      // Test avatar properties
      expect(element(playerSelector + ' > img').attr('src'  )).toBe(playerResource["gravatar"]);
      expect(element(playerSelector + ' > img').attr('title')).toBe(playerResource["nickname"]);
    }
  });
  
  
  it('Testing kit/howToUse.html', function() {
    browser().navigateTo('../../howToUse.html');
    
    // Loading window path
    expect(browser().window().path()).value(function(path) {
      
      // Test all Page Head Elements from the common function
      testPageHead();
      
      // Test Page content
      expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
      
      
      contributorsMenuSelector = '#contributorsAboutBox > .textContainer > .text';
      
      // Test the removing of the cloak over the contributors menu
      testCloak(contributorsMenuSelector);
      
      
      // Test the content of the contributors right menu
      contributorsResource = [
        {"name": "Danny"          , "title": "Professor, Singapore", "src": "Danny"},
        {"name": "Chris Meyers"   , "title": "Specialist"          , "src": "ChrisMeyers"},
        {"name": "Allen B. Downey", "title": "Writer"              , "src": "AllenDowney"},
        {"name": "Chris Boesch"   , "title": "Editor in Chief"     , "src": "Chris"},
        {"name": "Jeffery Elkner" , "title": "Writer"              , "src": "Jeffery"}
      ];
      
      contributorsExpectedCount = contributorsResource.length;
      
      contributors = using(contributorsMenuSelector).repeater('.contributor');
      expect(contributors.count()).toBe(contributorsExpectedCount);
      
      contributorImgSrcPart = '../kit/_images/landingPages/contributionPage/profiles/';
      
      for(i=0; i<contributorsExpectedCount; i++) {
        contributor = contributorsResource[i];
        
        // Testing contributor name and title
        expect(contributors.row(i)).toEqual([contributor["name"], contributor["title"]]);
        
        // Testing contributor image source
        expect(element(contributorsMenuSelector + ' > .contributor > img:eq('+ i +')').attr('src')).toBe(contributorImgSrcPart+ contributor["src"] +'.png');
      }
      
      // Test all page footer elements
      testPageFooter();
    });
  });
});
