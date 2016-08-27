# sourcegraph-date-range-queryer

A coding challenge [prompt](./prompt/README.md) from [sourcegraph](https://github.com/sourcegraph). Program is built on `Node.js` using `Readline`.

## Compile and run
```bash
$ git clone https://github.com/valmassoi/sourcegraph-date-range-queryer sourcegraph-date-range-queryer
$ cd sourcegraph-date-range-queryer

# Install dependencies
$ npm install
 # Check Node is v6.x.x for ES6
 $ node -v
 # If on earlier version of node upgrade with Node Version Manger:
 http://stackoverflow.com/a/12570971/3046904
 # Install Node the first time:
 https://nodejs.org/en/download/current/

# Run program
$ node queryer.js
or
$ npm start
```

## Runtime and space analysis
ADD:
- add new event object to a 2d array using quicksort-style insertion >> O(log(n))  

QUERY:
- uses binary search algorithm to find index where `end time > query time` >> O(log(n))
- the valid ID array gets alphabetized using the `sort` method >> O(n) but n is small (usually < 20)

CLEAR:
- clears out the events using `events = []` >> 0(1)?   

## Performance requirements justification
I used the [binary-search](https://www.npmjs.com/package/binary-search) package. Note: I did not check the validity of the code but download stats show it is widely used
https://en.wikipedia.org/wiki/Binary_search_algorithm

`there typically are no more than 20 events that overlap that point` So sorting the valid ids array using built in .sort() method should have good performance

TODO: sort by start time too?
