/* jasmine-like end2end tests go here */

function log(message) {
  console.log(message);
}


describe('kit', function() {
  pauseAll = true;
  
  it('Testing kit/index.html', function() {

      browser().navigateTo('../../index.html');
       expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
      if (pauseAll) pause();
  });

  it('Testing kit/home.html', function() {
      browser().navigateTo('../../home.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/home.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing kit/aboutUs.html', function() {
      browser().navigateTo('../../aboutUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/aboutUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing kit/ranking.html', function() {
      browser().navigateTo('../../ranking.html');
      expect(browser().location().hash()).toBe('');
      expect(element('#logIndetailsNameText').text()).toBe('Mark Zuckerberg');

      expect(element(".smallToggleButton:first").text()).toBe("All");
      expect(element(".smallToggleButton:last").text()).toBe("Ruby");
      expect(element(".smallToggleButton").count()).toBe(7);

      expect(element(".worldwideRankingsNickname").count()).toBe(25);
      expect(element(".worldwideRankingsSolved").count()).toBe(25);
      expect(element(".countryRankingsName").count()).toBe(79);
      expect(element(".countryRankingsPlayer").count()).toBe(79);

      expect(element(".worldwideRankingsNickname:first").text()).toBe('Danny');
      expect(element(".worldwideRankingsSolved:first").text()).toBe('243');
      expect(element(".countryRankingsName:first").text()).toBe('Singapore');
      expect(element(".countryRankingsPlayer:first").text()).toBe('1828');

      expect(element(".worldwideRankingsNickname:last").text()).toBe('Mark Zuckerberg');
      expect(element(".worldwideRankingsSolved:last").text()).toBe('44');
      expect(element(".countryRankingsName:last").text()).toBe('Uruguay');
      expect(element(".countryRankingsPlayer:last").text()).toBe('1');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing kit/contactUs.html', function() {
      browser().navigateTo('../../contactUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/contactUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
  });

  it('Testing kit/tournament.html', function() {
      browser().navigateTo('../../tournament.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/tournament.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing kit/challengeBoard.html', function() {
      browser().navigateTo('../../challengeBoard.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/challengeBoard.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing kit/badges.html', function() {
      browser().navigateTo('../../badges.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/kit/badges.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
    describe('Extra Home-specific tests', function() {

        beforeEach(function() {
            browser().navigateTo('../../home.html');
        });

        it('Testing kit/home.html', function() {
            browser().navigateTo('../../home.html');
            expect(browser().location().hash()).toBe('');
            //expect(browser().location().path()).toBe('/kit/home.html');
            //expect(element('#footer a:nth-child(1)').text()).toBe('home');
            //expect(element('div:eq(0)').text()).toEqual('something');
            expect(element('#profileNameText').text()).toBe('Mark Zuckerberg');

            expect(element('#levels_tr_10030 td:nth-child(2)').text()).toBe('123/257');
            element('.rolls').click();

            //expect(element('#editProfileName name').text()).toBe('Testing');
            //<input type="editbox" class="editProfile" id="editProfileName" name="name">
            //pause();
        });
        
    });  
    describe('Extraa Index-specific tests', function() {
        beforeEach(function() {
            browser().navigateTo('../../index.html');
        });
        
        it('Testing kit/index.html', function() {
              expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
        });
    });
});
describe('Tests From SergeyGalenko', function() {
  it('Testing kit/contributions.html', function() {
      browser().navigateTo('../../contributions.html');
      expect(element('#menuOptionsText > .menuSelected').text()).toBe('contribution');       
      expect(element('#contributorsInfoBoxText > ul li').count()).toBe(4);
      expect(element("#contributorsAboutBoxText img").count()).toBe(5);
       if (pauseAll) pause();
  });
  
   it('Testing kit/tournament.html', function() {
      browser().navigateTo('../../tournament.html');
     
      //expect(browser().location().path()).toBe('/kit/tournament.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      element('#viewRanking .viewRankingButton').click();

      
      expect(browser().location().path()).toBe('/kit/tournamentRanking.html?tournamentID=11288841');
      expect(window.location.path).toBe('/kit/tournamentRanking.html?tournamentID=11288841');
      
      expect(browser().location().hash()).toBe('/kit/tournamentRanking.html?tournamentID=11288841');
       if (pauseAll) pause();
      
      
      
      //pause();
  });
});
