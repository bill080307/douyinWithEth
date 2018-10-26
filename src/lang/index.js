import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zh_cnLocale from './zh_cn'

Vue.use(VueI18n);

const messages = {
  en: enLocale,
  zh_cn: zh_cnLocale
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
});

export default i18n
