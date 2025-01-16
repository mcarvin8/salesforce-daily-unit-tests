const fs = require('fs');

// Get the ID from the environment variable
const id = process.env.TEST_RUN_ID;

if (!id) {
    throw new Error('Environment variable TEST_RUN_ID is not set.');
}

// Construct the file name using the ID
const testResultFileName = `coverage/test-result-${id}.json`;

// Read the test results JSON file
let testResults = JSON.parse(fs.readFileSync(testResultFileName));
let summary = testResults.summary;

let slackPayload = {
    text: 'Test Runs Finished',
    blocks: []
}

let hostname = summary.hostname;
const firstPart = summary.hostname.match(/\/\/(.*?)\./);


if (firstPart) {
    hostname = firstPart[1];
}

let summaryText = '';

if(summary.outcome == 'Failed'){
     summaryText = `❌   Automated unit testing for ${hostname} has *${summary.outcome}* with ${summary.testsRan} test runs and ${summary.failing} failure(s)`
}
else{
    summaryText = `✅   Automated unit testing for ${hostname} has *${summary.outcome}* 🎉 `
}


let summaryBlock = {
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: summaryText
    }
}

slackPayload.blocks.push(summaryBlock);

// Convert the object to a JSON string
const jsonData = JSON.stringify(slackPayload); 

// Write the JSON string to the file
fs.writeFileSync('slackPayload.json', jsonData, 'utf-8');
