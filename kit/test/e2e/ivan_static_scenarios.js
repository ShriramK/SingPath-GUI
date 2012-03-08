function log(message) {
  console.log(message);
}


describe('Additinal test from Ivan', function() {
  it('Testing kit/howToUse.html', function() {
    browser().navigateTo('../../howToUse.html');
    expect(element('#menuOptionsText > .menuSelected').text()).toBe('how to use');
    expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
    
    // Test the content of the contributors right menu
    expect(element('#contributorsAboutBoxText > a > img').count()).toBe(5);
    expect(repeater('#contributorsAboutBoxText > a > img'))
    
    // To be organized as repeater when same been used
    expect(element('#contributorsAboutBoxText > a > img:eq(0)').attr('alt')).toBe('Contributor Danny');
    expect(element('#contributorsAboutBoxText > a > img:eq(1)').attr('alt')).toBe('Contributor Chris Meyers');
    expect(element('#contributorsAboutBoxText > a > img:eq(2)').attr('alt')).toBe('Contributor Allen Downey');
    expect(element('#contributorsAboutBoxText > a > img:eq(3)').attr('alt')).toBe('Contributor Chris Boesch');
    expect(element('#contributorsAboutBoxText > a > img:eq(4)').attr('alt')).toBe('Contributor Jeffery');
  });
});
