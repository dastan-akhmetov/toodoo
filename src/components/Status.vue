<template>
  <div>
    <span v-if="!item.isDone" class="has-text-info">
      <FontAwesomeIcon icon="clock"/> In Progress
    </span>
    <span v-else class="has-text-success">
      <FontAwesomeIcon icon="check"/> Done
    </span>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
