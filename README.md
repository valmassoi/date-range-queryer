# sourcegraph-date-range-queryer

A coding challenge [prompt](./prompt/README.md) from [sourcegraph](https://github.com/sourcegraph). Program is built on `Node.js` using `Readline`.

## Install and run program
```bash
$ git clone https://github.com/valmassoi/sourcegraph-date-range-queryer sourcegraph-date-range-queryer
$ cd sourcegraph-date-range-queryer

# Install dependencies
$ npm install
 # Check Node is v^6.2.0 for ES6
 $ node -v
 # If on earlier version of node upgrade with Node Version Manager:
 http://stackoverflow.com/a/12570971/3046904
 $ nvm use 6
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
Quicksort works by breaking the array into two sub arrays by selecting a pivot value where elements < go before it and > go after it (== can be on either side). This gets repeated recursively to sub arrays that eventually get recombined into a sorted array. This algorithm was used to find the insertion point of a new event based on its end time.  
[Visualization](https://en.wikipedia.org/wiki/File:Quicksort-diagram.svg)

QUERY:
- uses binary search algorithm to find index where `end time > query time` >> O(log(n)) time, O(1) space  
  I used the [binary-search](https://www.npmjs.com/package/binary-search) package. Note: I did not fully check the validity of the code but download stats show it is widely used. Binary search, searches a sorted array to find the position (index) of an input. It starts "looking" in the middle of the array and decides if the algorithm should go left or right to continue its search if the input is < or > than the middle value, respectively. It then checks the value inbetween the midpoint of the array and an end (left or right). This continues until the index is found. [Visualization](https://en.wikipedia.org/wiki/Binary_search_algorithm) The advantage of this method is that the whole array doesn't have to be iterated over later and it searches the array quickly by looking at "halves", increasing the programs performance.

- the valid ID array gets alphabetized using the JavaScript `sort` method >> O(n) but n is small (typically <= 20)  

CLEAR:
- clears out the events using `events = []` >> 0(1)  

## Performance requirements justification
- `there typically are no more than 20 events that overlap that point` So sorting the valid ids array using built in .sort() method has acceptable performance, this is the only O(n) while the insertion and search are both O(log(n)) - an improvement on `A QUERY operation that takes O(n) where n is the number of events in the calendar is not considered efficient.` which could be accomplished with a simpler program iterating the whole events array
