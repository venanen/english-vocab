import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {convertTokenToRgbColor, generateStringToken} from "@/utils/stringUtils";
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

import 'quasar/src/css/index.sass'





const app = createApp(App)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
})
app.use(createPinia())
app.use(router)

app.mount('#app')
console.log(generateStringToken('expression'))
const word = 'expression'
generateStringToken(word).forEach((val, index) => {
    const color = convertTokenToRgbColor(val)
    console.log(`%c ${word[index]}`, `color: ${convertTokenToRgbColor(val)}`)
})
