export class Functions{
  setTimeHour(): string {

    let hours: string = new Date().getHours().toString()
    let minutes: string = new Date().getMinutes().toString();
    console.log(hours + ':' + minutes)
    if(hours.length == 1){
      hours = '0' + hours
    }
    return hours + ':' + minutes
  }
}
