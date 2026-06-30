This project is for people who keep lots of notes from school or university and want to test themselves based on those notes. The idea is to let an AI agent generate tests from the given educational material—no more and no less.

I recommend using Obsidian to manage your notes. Every note must have two hashtags: `#ready` or `#notready`, and `#test` or `#notest`. When you create a note, set the hashtags to `#notready` and `#notest`.

You decide when a note is ready and change the hashtag to `#ready`. Only the agent can change the `#notest` hashtag. When you think a note is ready, ask the AI agent to generate a test for it; the agent will then change the hashtag to `#test`.

A ready note with a test will have a link to the test right after the hashtags. If it does not, ask the agent to check the note and add the link.

The web app and tests are stored on your PC only, so you have complete control over them.


### Get Started
1. Clone to the repo where you have your notes.
2. Delete example note and test by running reset.bat or reset.sh.
3. This is a dynamic web app, means you have to serve it to use in browser. It can be done with the executing of serve.py or by running nodejs server (recommended):
`cd web`
`npm install` //only by first run to install node modules
`npm run dev`
both methods open 5173 port where you can use the app.