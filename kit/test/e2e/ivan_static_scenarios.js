/*
// Good to know it
expect(browser().window().href()  ).toBe('http://localhost/kit/index.html');
expect(browser().window().path()  ).toBe('/kit/index.html');
*/


describe('Additinal tests from Ivan', function() {
  it('Testing kit/index.html', function() {
    browser().navigateTo('../../index.html');
    
    
    // Test initial input user name
    expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
    
    // Test the removing of the cloak over the stats menu
    expect(element('#statsTextBoxtext').attr('ng:cloak')).not().toBeDefined();
    
    
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
    
    
    playersSelector        = '#friendsTextBoxtext'
    playersFullSelector    = playersSelector     + ' > span:eq';
    numPlayresSelector     = playersFullSelector + '(0)';
    
    // Test the removing of the cloak over the total number of current players
    expect(element(numPlayresSelector).attr('ng:cloak')).not().toBeDefined();
    
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
    i=1;
    for(key in playersResources) {
      playerResource = playersResources[key];
      playerSelector = playersFullSelector +'('+ i++ +')'
      
      // Test cloak
      expect(element(playerSelector).attr('ng:cloak')).not().toBeDefined();
      
      // Test avatar properties
      expect(element(playerSelector + ' > img').attr('src'  )).toBe(playerResource["gravatar"]);
      expect(element(playerSelector + ' > img').attr('title')).toBe(playerResource["nickname"]);
    }
  });
  
  
  it('Testing kit/howToUse.html', function() {
    browser().navigateTo('../../howToUse.html');
    
    // Test selected menu option
    expect(element('#menuOptionsText > .menuSelected').text()).toMatch(/how to use/);
    
    // Test Page content
    expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
    
    
    contributorsMenuSelector = '#contributorsAboutBox > .textContainer > .text';
    
    // Test the removing of the cloak over the contributors menu
    expect(element(contributorsMenuSelector).attr('ng:cloak')).not().toBeDefined();
    
    
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
    
    for(i=0; i<contributorsExpectedCount; i++) {
      contributor = contributorsResource[i];
      expect(contributors.row(i)).toEqual([contributor["name"], contributor["title"]]);
    }
  });
});
