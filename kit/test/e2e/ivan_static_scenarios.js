function log(message) {
  console.log(message);
}


describe('Additinal tests from Ivan', function() {
  it('Testing kit/howToUse.html', function() {
    browser().navigateTo('../../howToUse.html');
    expect(element('#menuOptionsText > .menuSelected').text()).toBe('how to use');
    expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
    
    // Test the removing of the cloak over the contributors menu
    expect(element('#contributorsAboutBoxText').attr('ng:cloak')).not().toBeDefined();
    
    // Test the content of the contributors right menu
    var contributors = using('#contributorsAboutBoxText').repeater('.contributor');
    expect(contributors.count()).toBe(5);
    expect(contributors.row(0)).toEqual(["Danny"          ,"Professor, Singapore",]);
    expect(contributors.row(1)).toEqual(["Chris Meyers"   ,"Specialist",]);
    expect(contributors.row(2)).toEqual(["Allen B. Downey","Writer",]);
    expect(contributors.row(3)).toEqual(["Chris Boesch"   ,"Editor in Chief",]);
    expect(contributors.row(4)).toEqual(["Jeffery Elkner" ,"Writer",]);
  });
});
