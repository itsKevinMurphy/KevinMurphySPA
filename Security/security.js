var expStormpath = require('express-stormpath');            // stormpath for user login and auth
var stormpath = require('stormpath');                       // stormpath for user login and auth
var client = null;
var keyfile = './security/stormpath_apiKey.properties';

stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
    if (err) throw err;
    client = new stormpath.Client({ apiKey: apiKey });
    client.getApplications({ name: 'KevinsHealthApp' }, function (err, applications) {
        if (err) throw err;
        
        app = applications.items[0];

    });
});