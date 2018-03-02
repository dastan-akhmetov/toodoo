<template>
  <div class="dropdown" :class="className">
    <div class="dropdown-trigger" @click="toggle">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Actions</span>
        <span class="icon is-small">
        <FontAwesomeIcon icon="angle-down"/>
      </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item" @click="onMarkItemAsDone">
          <FontAwesomeIcon icon="check-circle"/> Mark as done
        </a>
        <a class="dropdown-item" @click="onEdit">
          <FontAwesomeIcon icon="edit"/> Edit
        </a>
        <a href="#" class="dropdown-item" @click="onDelete">
          <FontAwesomeIcon icon="trash"/> Delete
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    onMarkAsDone: {
      type: Function,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      className: ''
    }
  },
  methods: {
    toggle () {
      this.className = this.className === 'is-active' ? '' : 'is-active'
    },
    onMarkItemAsDone () {
      const item = {...this.item, isDone: true}
      this.onMarkAsDone(item, 'done')
      this.toggle()
    },
    onEdit () {
      this.toggle()
    },
    onDelete () {
      this.toggle()
    }
  }
}
</script>
