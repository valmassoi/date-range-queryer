// https://nodejs.org/api/readline.html
const readline = require('readline')
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

let events = [] //init calendar

function addDate(input) {
  const params = input.split(" ") // ADD $ID $START $END
  if (params.length !== 4) {// TODO other checks params[2||3] not a number
    console.log("Invalid input, type 'HELP' for commands.")
    return
  }
  else
    console.log(input)
  const newEvent = {
    id: params[1],
    start: Number(params[2]),//inclusive FLOAT
    end: Number(params[3])//exclusive
  }
  events.push(newEvent)
}

function queryDate(input) {
  const params = input.split(" ") // QUERY $TIME
  const time = Number(params[1]) //FLOAT

  ids = []
  events.forEach( event => { //BIG O notation
    if (time >= event.start && time < event.end)
      ids.push(event.id)
  })

  ids.sort() //BIG O notation

  idsSpaceDelimited = ids.join(" ")
  console.log(`${input}: ${idsSpaceDelimited}`)
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
      console.log('');
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
