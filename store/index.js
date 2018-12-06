import Locale from '~/locales'

export const state = () => ({
  locales: Locale(),
  locale: Locale()[1]
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
	  	console.log("locale", locale)
      state.locale = locale
    }
  }
}
