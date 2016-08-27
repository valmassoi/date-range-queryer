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

rl.on('line', (line) => {
  switch(line.trim()) {
    case 'hello':
      console.log('world!')
      break
    case 'help':
    case 'HELP':
      console.log(helpReadme)
      break
    case 'quit':
    case 'QUIT':
    case 'end':
    case 'END':
    case 'close':
    case 'CLOSE':
      rl.close()
    default:
      console.log(`Say what? '${line.trim()}' is not a valid command. Type HELP for commands.`)
      break
  }
  rl.prompt()
}).on('close', () => {
  console.log('Have a great day!')
  process.exit(0)
})
