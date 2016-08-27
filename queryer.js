const readline = require('readline')
const bs = require('binary-search')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'SGquery> '
})

rl.prompt()

const helpReadme = `
sourcegraph-date-range-queryer by

--  ██╗   ██╗ █████╗ ██╗     ███╗   ███╗ █████╗ ███████╗███████╗ ██████╗ ██╗
--  ██║   ██║██╔══██╗██║     ████╗ ████║██╔══██╗██╔════╝██╔════╝██╔═══██╗██║
--  ██║   ██║███████║██║     ██╔████╔██║███████║███████╗███████╗██║   ██║██║
--  ╚██╗ ██╔╝██╔══██║██║     ██║╚██╔╝██║██╔══██║╚════██║╚════██║██║   ██║██║
--   ╚████╔╝ ██║  ██║███████╗██║ ╚═╝ ██║██║  ██║███████║███████║╚██████╔╝██║
--    ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝

ADD $ID $START $END
QUERY $TIME
CLEAR
https://github.com/valmassoi/sourcegraph-date-range-queryer
`

let events = [] // init calendar

function addDate(input) {
  const params = input.split(" ") // ADD $ID $START $END
  if (params.length !== 4 || Number(params[2]) > Number(params[3])) {
    console.log("Invalid input, type 'HELP' for commands.")
    return
  }
  else
    console.log(input)
  const newEvent = {
    id: params[1],
    start: Number(params[2]),// inclusive
    end: Number(params[3])// exclusive
  }

  // -- quicksort-style insertion -- //
  // -- O(log(n)) -- //
  // -- sort by end time -- //
  function insert(element, array) {
    if (array.length > 0 && array[0].end > element.end) // check [0]
      array.unshift(element)
    else
      array.splice(locationOf(element, array) + 1, 0, element)
    return array
  }

  function locationOf(element, array, beg, done) {
    beg = beg || 0
    done = done || array.length
    var pivot = parseInt(beg + (done - beg) / 2, 10)
    if (done-beg <= 1 || array[pivot].end === element.end) return pivot
    if (array[pivot].end < element.end) {
      return locationOf(element, array, pivot, done)
    } else {
      return locationOf(element, array, beg, pivot)
    }
  }

  events = insert(newEvent, events)

}

// -- can use binary search algo O(log(n)), because array is pre sorted by end time -- //
function queryDate(input) {

  const params = input.split(" ") // QUERY $TIME
  if (params.length === 1) {
    console.log(`QUERY:`)
    return
  }
  if (params.length !== 2) {
    console.log("Invalid input, type 'HELP' for commands.")
    return
  }
  const time = Number(params[1])

  let startIndex = bs(events, time, function(a, b) { return a.end - b; })
  startIndex = (startIndex < 0) ? (startIndex*-1)-1 : startIndex+1
  const possibleEvents = events.slice(startIndex, events.length)

  ids = []
  possibleEvents.forEach( event => {
    if (time >= event.start && time < event.end)
      ids.push(event.id)
  })

  ids.sort() //BIG O notation: only 20ish so should be fine

  idsSpaceDelimited = ids.join(" ")
  console.log(`QUERY: ${idsSpaceDelimited}`)
}

function clearDate() {
  events = []
  console.log("CLEAR")
}

rl.on('line', (line) => {
  const input = line.trim()
  switch(true) {
    case input.startsWith('hello'):
      console.log('world!')
      break
    case input.startsWith('add'):
    case input.startsWith('ADD'):
      addDate(input)
      break
    case input.startsWith('query'):
    case input.startsWith('QUERY'):
      queryDate(input)
      break
    case input.startsWith('clear'):
    case input.startsWith('CLEAR'):
      clearDate()
      break
    case input.startsWith('help'):
    case input.startsWith('HELP'):
      console.log(helpReadme)
      break
    case input.startsWith('quit'):
    case input.startsWith('QUIT'):
    case input.startsWith('end'):
    case input.startsWith('END'):
    case input.startsWith('close'):
    case input.startsWith('CLOSE'):
      rl.close()
      break
    case input === '':
      console.log('')
      break
    default:
      console.log(`Say what? '${input}' is not a valid command. Type HELP for commands.`)
      break
  }
  rl.prompt()
}).on('close', () => {
  console.log('Have a great day!')
  process.exit(0)
})
