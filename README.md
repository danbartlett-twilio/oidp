# OWL INTERACTIVE SMS DEMO PLATFORM

This platform aims to allow you to quickly deploy a set of Twilio Functions and a Studio Flow along with an administration tool that simplfies configuration and management. This platform includes the following demos: Survey, Appointment Reminder, Order Entry, Virtual Queue, and a trivia game. You can easily switch between the demos in real time.

The demos can be used as is, or you can customize this code base and studio flows for your own custom demos.

## Prerequisites

You will need the following:

* A Twilio Account
* A Twilio SMS-enabled Phone Number
* Twilio CLI installed on your local machine
* Serverless Plugin on your local machine

## Installation

1. Download the repository
1. Run *npm init* to set the name of your service 
1. Run *npm install* to add the dependencies
2. mv .env.sample .env
3. Run *twilio serverless:deploy* to deploy the Service functions and assets
4. Copy the url ending in *index.html* from the standard out of the deploy command and paste it in a browser
5. Finish the setup from the web browser

## Browser Installation

From the settings tab...

1. Data: Click on the AIRTABLE BASE TEMPLATE button, copy the template to your own Airtable account. Enter your Airtable API KEY and BASE ID for your table save.
1. FLOW: Enter a name for your Studio Flow and then click the DEPLOY FLOW button to create the Studio Flow.
1. PHONE NUMBER: Enter the Twilio Phone Number you wish to use. Click on SET FLOW WEBHOOK to connect the phone number to the Studio Flow.
2. CURRENT APPLICATION: On this tab you can switch between the 5 available application. Changes are immediate.
3. .env: If you are going to edit the local file (assets or functions) copy and paste the environment variables to your local .env file so they are not overwritten.

## Features

* Invite: Enter a name and phone number to load a custom record and send an initial SMS. You can also click on the register button and copy and share the url for self registration.
* Trigger: For "customers" already in the system, trigger the flow with a REST API call. Each application handles flows initiated with REST API calls differently.
* Executions: Show the last 50 executions, stop active executions, show steps and data for any execution.
* Airtable: All data updated in real time in Airtable.
