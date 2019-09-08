export default {
  filterAccount (account) {
    let type = {display: '', color: ''}
    switch (account) {
      case 0:
      type = {display: 'none', color: 'orange'}
        break
      case 1:
      type = {display: 'none', color: 'green'}
        break
      case 2:
      type = {display: 'none', color: 'blue'}
        break
      case 3:
      type = {display: 'none', color: 'yellow'}
        break 
      case 4:
      type = {display: 'block', color: 'default'}
      break
      case 5:
      type = {display: 'block', color: 'red'}
      break
      default:
      type = {display: 'block', color: 'gray'}
    }
    return type
  }
}

