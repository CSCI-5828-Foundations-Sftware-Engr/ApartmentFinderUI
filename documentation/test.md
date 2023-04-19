## Testing in the project

The code for integration tests and unit tests have been written in our project. We ahve used mocha and chai frameworks to do our testing. In the test folder, we can find 5 files that have 13 test cases written in them. 

Additionally, we have integrated these tests in our Continuous Integration pipeline as well. So whenever we raise a PR, these tests are run and only after all the test cases pass, we can merge the branch into the main branch. 


To run the tests locally, just run "npm test" and then the npm package manager will do it's magic. 

for now, we believe we have written all the test cases for our code. 