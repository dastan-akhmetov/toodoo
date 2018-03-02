<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th width="60%">Title</th>
            <th width="20%">Date</th>
            <th>Priority</th>
            <th width="15%" class="centered">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot v-if="todoItems.length > 3">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Priority</th>
            <th class="centered">Status</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="item in todoItems" :key="item.id">
            <th>{{ item.id }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.formattedDate }}</td>
            <td>
              <span class="tag" :class="item.priorityClass">
                {{ item.priority }}
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
  computed: {
    todoItems () {
      return this.items.map(i => {
        i.formattedDate = DateTime.fromMillis(i.date).toFormat('ff')
        i.priorityClass = ''
        switch (i.priority) {
          case 'Normal' : i.priorityClass = 'is-success'; break
          case 'High' : i.priorityClass = 'is-danger'; break
          case 'Low': i.priorityClass = 'is-warning'; break
          default : i.priorityClass = 'is-success'
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
