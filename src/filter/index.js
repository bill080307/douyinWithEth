import Vue from 'vue'

import {formatDate, formatvideotime} from '../utils/assist'

Vue.filter('formatDate', (date) => {
  return formatDate(date)
});

Vue.filter('formatvideotime', (date) => {
  return formatvideotime(date)
});
