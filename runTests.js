const util = require('util');
const exec = util.promisify(require('child_process').exec);

console.log('Initiating Test Coverage');
const classNames = "SiteLoginControllerTest";
const fileName = 'testResult.json'

async function generateTestClassReport(){
	try{
		const {stdout,stderr} = await exec(`sfdx force:apex:test:run -n ${classNames} --json`);
		if(stderr){
			throw {"message" : stderr};
		}
		const parsedstdOut = JSON.parse(stdout);
		const {status, result} = parsedstdOut;
		const {testRunId} = result;
		console.log(`Test Run Id - ${testRunId}`);
		console.log(`Computing Test Coverage - ${testRunId}`);
		await exec(`sfdx force:apex:test:report -i ${testRunId} --json > ${fileName}`);
		return '';
	}catch(e){
		throw e;
	}
}


generateTestClassReport().then(function(res){
		console.log(res);
}).catch(function(e){
	console.log(e);
})

