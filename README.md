# sourcegraph-date-range-queryer

A coding challenge [prompt](./prompt/README.md) from [sourcegraph](https://github.com/sourcegraph). Program is built on `Node.js` using `Readline`.

## Compile and run
```bash
$ git clone https://github.com/valmassoi/sourcegraph-date-range-queryer sourcegraph-date-range-queryer
$ cd sourcegraph-date-range-queryer

# Install dependencies
 # Check Node is v6.x.x for ES6
 $ node -v
 # If on earlier version of node upgrade with Node Version Manger:
 http://stackoverflow.com/a/12570971/3046904
 # Install Node the first time:
 https://nodejs.org/en/download/current/

# Run program
$ node queryer.js
```

## Runtime and space analysis
ADD:
- push new event object to a 2d array >> 0(1)?  

QUERY:
- uses the 5th edition ECMA-262 standard `forEach` method to iterate the ADDed events, pushing valid IDs to an array. This loop is of O(n). TODO increase efficiency to O(log(n))  
- the valid ID array gets alphabetized using the `sort` method >> O(n) TODO increase efficiency to O(log(n))  

CLEAR:
- clears out the events using `events = []` >> 0(1)?   

## Performance requirements justification
TODO improve efficiency from O(n) to O(log(n)) by sorting during insertion
