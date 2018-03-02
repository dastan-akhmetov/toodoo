<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th width="60%">Title</th>
            <th width="10%">Due</th>
            <th width="15%" class="centered">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot v-if="todoItems.length > 3">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Due</th>
            <th class="centered">Status</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="item in todoItems" :key="item.id">
            <th>{{ item.id }}</th>
            <td>
              <template v-if="itemEditingId === item.id && isEditing">
                <b-input v-model="item.title"></b-input>
              </template>
              <template v-else>
                {{ item.title }}
              </template>
            </td>
            <td>
              <span v-if="itemEditingId === item.id && isEditing">
                <b-datepicker v-model="changingDate"></b-datepicker>
              </span>
              <span v-else class="tag" :class="item.emergencyLevel" :title="item.emergencyLevelTitle">
                {{ item.formattedDueDate }}
              </span>
            </td>
            <td style="text-align: center;">
              <Status :item="item"/>
            </td>
            <td>
              <Dropdown :item="item" :on-mark-as-done="onChange" :on-delete="onDelete"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import Status from '../Status'
import Dropdown from '../Dropdown'
import { EventBus } from '../EventBus'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },
  components: {
    Status,
    Dropdown
  },
  created () {
    EventBus.$on('ItemEditing.Init', id => {
      this.itemEditingId = id
      this.isEditing = true
      const item = this.todoItems.find(t => t.id === id)
      this.changingDate = new Date(item.dueDate)
    })
    EventBus.$on('ItemEditing.Finished', id => {
      this.isEditing = false
      let item = this.todoItems.find(t => t.id === id)
      item.dueDate = this.changingDate.getTime()
      this.onChange(item)
    })
  },
  data () {
    return {
      itemEditingId: null,
      isEditing: false,
      changingDate: new Date()
    }
  },
  computed: {
    todoItems () {
      return this.items.map(i => {
        i.formattedDueDate = DateTime.fromMillis(i.dueDate).toFormat('ff')
        i.dueDateForParse = new Date(i.dueDate)
        i.emergencyLevel = ''
        const milliSecondsLeft = i.dueDate - Date.now()
        const secondsLeft = Math.floor(milliSecondsLeft / 1000)
        const minutesLeft = Math.floor(secondsLeft / 60)
        const hoursLeft = Math.floor(minutesLeft / 60)
        if (hoursLeft > 24) {
          i.emergencyLevel = 'is-info'
          i.emergencyLevelTitle = 'You are alright.'
        } else if (hoursLeft <= 24 && hoursLeft > 12 && !i.isDone) {
          i.emergencyLevel = 'is-warning'
          i.emergencyLevelTitle = 'You need hurry.'
        } else if (hoursLeft <= 12 && !i.isDone) {
          i.emergencyLevel = 'is-danger'
          i.emergencyLevelTitle = 'Do It! ASAP!'
        }
        if (i.isDone) {
          i.emergencyLevel = 'is-success'
          i.emergencyLevelTitle = 'You are done!'
        }
        return i
      })
    }
  }
}
</script>

<style scoped>
  .centered {
    text-align: center;
  }
</style>
