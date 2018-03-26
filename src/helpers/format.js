import {SERVER_URL} from '../constants/api';
import moment from 'moment';

class Format {
  static imageUrl(url) {
    if (!url)
      return ""

    if (url.includes("http://") || url.includes("https://"))
      return url
    else
      return SERVER_URL + url
  }

  static dueDate(date) {
    if (date) {
      return moment(date).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
      })
    }
    else
      return "N/A"
  }
}

export {Format}
