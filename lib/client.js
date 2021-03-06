var Browser = require('zombie');

exports.changePassword = function(options, user, callback){
    var service = options.service;
    var browser = new Browser();
    !options.silent ? console.log('Browsing to site...') : '';
    browser.visit(service.loginlink,function(){
        !options.silent ? console.log('Logging in...') : '';
        browser.
            fill(service.loginfield, user.username).
            fill(service.passwordfield, user.password).
            pressButton(service.signinfield, function(){
                !options.silent ? console.log('Browsing to password change page...') : '';
                browser.visit(service.changelink,function(){
                    !options.silent ? console.log('Changing password...') : '';
                    browser.evaluate('document.querySelector("'+service.change_save+'").removeAttribute("disabled");');
                    browser.
                        fill(service.change_current, user.password).
                        fill(service.change_new, user.newpassword).
                        fill(service.change_confirm, user.newpassword);
                    browser.pressButton(service.change_save,function(){
                        //For debugging
                        //console.log('PATH:', browser.location.pathname);
                        callback(null,'Password changed!');
                    });

                });
            });
    });
};