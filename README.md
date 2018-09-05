# Range Inviter

### Usage
Just run ```npm start```. Simple as that.

### Testing
To test the application, run ```npm t``` or ```npm test```. The application tests are written using Jest.

### Requirements
* Node v4.1 or higher
* NPM

### Considerations
The application:
* Uses the Haversine Formula when calculating the distance between two points for higher precision.
* Is scalable, as it reads the input file line by line instead of dumping the whole file into the memory and keeps the customer list sorted at all times, optimizing time for longer inputs.

### Future work
Would include:
* Adding script options for setting:
  * The distance range to be considered for the invitation.
  * The input file.
  * Saving the results into a file.
* Increasing test coverage.