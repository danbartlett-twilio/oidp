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
