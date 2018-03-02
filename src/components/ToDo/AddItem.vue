<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="field has-addons">
        <div class="control is-expanded has-icons-left">
          <input class="input is-medium"
                 type="text"
                 placeholder="Type your task..."
                 v-model="item.title"
                 @keyup.enter="onAdd"
                 ref="input"
          >
          <span class="icon is-medium is-left">
            <FontAwesomeIcon icon="tasks"/>
            <!--<i class="fas fa-tasks"></i>-->
          </span>
        </div>
        <div class="control">
          <a class="button is-medium is-success" @click="onAdd">
            Do It!&nbsp;
            <i class="fas fa-caret-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  props: {
    onChange: {
      type: Function,
      required: true
    },
    lastId: {
      type: Number,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      item: {
        id: this.lastId,
        title: ''
      }
    }
  },
  created () {
    this.id = this.lastId
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    onAdd () {
      if (this.item.title.length > 0) {
        const tomorrow = Date.now() + (1000 * 60 * 60 * 24)
        const item = {
          id: this.item.id++,
          title: this.item.title,
          dueDate: tomorrow,
          isDone: false
        }
        this.onChange(item)
        this.flushItem()
      }
    },
    flushItem () {
      this.item.title = ''
    }
  }
}
</script>

<style scoped>
  .column {
    margin-top: 20px
  }
</style>
