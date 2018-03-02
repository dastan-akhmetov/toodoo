import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import FontAwesome from '@fortawesome/fontawesome'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faBan from '@fortawesome/fontawesome-free-solid/faBan'
import faTasks from '@fortawesome/fontawesome-free-solid/faTasks'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

FontAwesome.library.add(
  faClock,
  faCheck,
  faBan,
  faTasks,
  faAngleDown,
  faCheckCircle,
  faEdit,
  faTrash
)

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
