import Vue from 'vue'

import {formatDate, formatvideotime, addressab} from './utils/assist'

Vue.filter('formatDate', (date) => {
  return formatDate(date)
});

Vue.filter('formatvideotime', (date) => {
  return formatvideotime(date)
});
Vue.filter('addressab', (date) => {
    return addressab(date)
});