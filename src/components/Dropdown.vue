<template>
  <div class="dropdown" :class="className">
    <div class="dropdown-trigger" @click="toggle">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Actions</span>
        <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item" @click="onMarkItemAsDone">
          <i class="fas fa-check-circle"></i> Mark as done
        </a>
        <a class="dropdown-item" @click="onEdit">
          <i class="fas fa-edit"></i> Edit
        </a>
        <a href="#" class="dropdown-item" @click="onDelete">
          <i class="fas fa-trash"></i> Delete
        </a>
      </div>
    </div>
  </div>
</template>

<script>
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
