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
		//This is just POC code. Needs to be refactored to take into account the error conditions
		const parsedstdOut = JSON.parse(stdout);
		const {status, result} = parsedstdOut;
		const {testRunId} = result;
		console.log(`Test Run Id - ${testRunId}`);
		console.log(`Computing Test Coverage - ${testRunId}`);
		await exec(`sfdx force:apex:test:report -i ${testRunId} --json > ${fileName}`);
		return `Created the file @ ${fileName}. `;
	}catch(e){
		throw e;
	}
}


generateTestClassReport().then(function(res){
		console.log(res);
}).catch(function(e){
	console.log(e);
})

