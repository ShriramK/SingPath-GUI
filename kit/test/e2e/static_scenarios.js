/* jasmine-like end2end tests go here */

describe('Alex', function() {
  pauseAll = false;
  
  it('Testing alex/index.html', function() {

      browser().navigateTo('../../index.html');
       expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
      if (pauseAll) pause();
  });

  it('Testing alex/home.html', function() {
      browser().navigateTo('../../home.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/home.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing alex/aboutUs.html', function() {
      browser().navigateTo('../../aboutUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/aboutUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing alex/ranking.html', function() {
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
  
  it('Testing alex/contactUs.html', function() {
      browser().navigateTo('../../contactUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/contactUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
  });

  it('Testing alex/tournament.html', function() {
      browser().navigateTo('../../tournament.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/tournament.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing alex/challengeBoard.html', function() {
      browser().navigateTo('../../challengeBoard.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/challengeBoard.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing alex/badges.html', function() {
      browser().navigateTo('../../badges.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/alex/badges.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
    describe('Extra Home-specific tests', function() {

        beforeEach(function() {
            browser().navigateTo('../../home.html');
        });

        it('Testing alex/home.html', function() {
            browser().navigateTo('../../home.html');
            expect(browser().location().hash()).toBe('');
            //expect(browser().location().path()).toBe('/alex/home.html');
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
        
        it('Testing alex/index.html', function() {
              expect(element('#messageBox').text()).toBe('Mark Zuckerberg');
        });
    });
});

describe('Additinal test from Ivan', function() {
  it('Testing alex/howToUse.html', function() {
      browser().navigateTo('../../howToUse.html');
      expect(element('#menuOptionsText > .menuSelected').text()).toBe('how to use');
      expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
      expect(element('#contributorsAboutBoxText > a > img:first').attr('alt')).toBe('Contributor Danny');
  });
});
