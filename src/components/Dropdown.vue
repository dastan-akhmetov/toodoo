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
        <a v-if="!isEditing" class="dropdown-item" @click="onMarkItemAsDoneOrNot">
          <span v-if="!item.isDone">
            <FontAwesomeIcon icon="check-circle"/> Mark as done
          </span>
          <span v-else>
            <FontAwesomeIcon icon="ban"/> Mark as undone
          </span>
        </a>
        <a class="dropdown-item">
          <div v-if="isEditing" @click="onSaveEdit">
            <FontAwesomeIcon icon="check"/> Save
          </div>
          <div v-else @click="onEditItem">
            <FontAwesomeIcon icon="edit"/> Edit
          </div>
        </a>
        <a v-if="!isEditing" class="dropdown-item" @click="onDeleteItem">
          <FontAwesomeIcon icon="trash"/> Delete
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { EventBus } from './EventBus'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    onMarkAsDone: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      className: '',
      isEditing: false
    }
  },
  methods: {
    toggle () {
      this.className = this.className === 'is-active' ? '' : 'is-active'
    },
    onMarkItemAsDoneOrNot () {
      const item = {...this.item, isDone: !this.item.isDone}
      this.onMarkAsDone(item)
      if (item.isDone) this.markAsDoneToast(item.title)
      else this.markAsUndoneToast(item.title)
      this.toggle()
    },
    markAsDoneToast (title) {
      this.$toast.open({
        message: `Item "${title}" marked as done!`,
        type: 'is-success'
      })
    },
    markAsUndoneToast (title) {
      this.$toast.open({
        message: `Item "${title}" marked as undone!`,
        type: 'is-danger'
      })
    },
    onEditItem () {
      EventBus.$emit('ItemEditing.Init', this.item.id)
      this.isEditing = true
      this.toggle()
    },
    onSaveEdit () {
      EventBus.$emit('ItemEditing.Finished', this.item.id)
      this.isEditing = false
      this.toggle()
    },
    onDeleteItem () {
      this.confirmDelete(this.item.title)
    },
    confirmDelete (title) {
      this.$dialog.confirm({
        title: 'Deleting item',
        message: `Are you sure you want to delete the item <b>"${title}"</b>? This action cannot be undone.`,
        confirmText: 'Delete Item',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.onDelete(this.item)
          this.$toast.open({
            message: `Item "${title}" deleted!`,
            type: 'is-success'
          })
          this.toggle()
        }
      })
    }
  }
}
</script>
