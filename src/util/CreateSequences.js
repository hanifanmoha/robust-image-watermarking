function getSequences() {
  let sequences = []
  let x = 0
  let y = 0
  while (x < 8 && y < 8) {
    sequences.push([y, x])
    if ((y === 0 || y === 7) && x % 2 === 0) {
      x += 1
    } else if ((x === 0 || x === 7) && y % 2 === 1) {
      y += 1
    } else if ((x + y) % 2 === 1) {
      y += 1
      x -= 1
    } else if ((x + y) % 2 === 0) {
      y -= 1
      x += 1
    } else {
      console.log('Wrong rule.')
    }
  }
  return sequences
}

console.log(getSequences())