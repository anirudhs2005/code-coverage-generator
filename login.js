const sfdx = require('sfdx-node');

sfdx.auth.webLogin({
	instanceurl :'https://test.salesforce.com',
	setdefaultusername:true

}).then(function(){
	console.log('Done Logging in');
})