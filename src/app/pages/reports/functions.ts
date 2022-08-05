export class Functions{
  setTimeHour(): string {

    let time: string = 'AM'
    let hours: string = new Date().getHours().toString()
    let minutes: string = new Date().getMinutes().toString();
    if (Number.parseInt(hours) > 11 || Number.parseInt(hours) == 0) {
      time = 'PM'
      switch (hours) {
        case '12': {
          hours = '12'
          break;
        }
        case '13': {
          hours = '01'
          break;
        }
        case '14': {
          hours = '02'
          break;
        }
        case '15': {
          hours = '03'
          break;
        }
        case '16': {
          hours = '04'
          break;
        }
        case '17': {
          hours = '05'
          break;
        }
        case '18': {
          hours = '06'
          break;
        }
        case '19': {
          hours = '07'
          break;
        }
        case '20': {
          hours = '08'
          break;
        }
        case '21': {
          hours = '09'
          break;
        }
        case '22': {
          hours = '10'
          break;
        }
        case '23': {
          hours = '11'
          break;
        }
        case '0': {
          hours = '12'
          time = 'AM'
          break;
        }
      }
    }
    if (Number.parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    }

    return hours + ':' + minutes + ' ' + time
  }
}
