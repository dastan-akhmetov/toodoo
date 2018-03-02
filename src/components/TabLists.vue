<template>
  <div class="tabs">
    <ul>
      <li v-for="item in lists"
          :class="{'is-active': item.isActive}"
          :key="item.name"
          @click="changeList(item.name)"
      >
        <a>{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      lists: [
        { name: 'All', isActive: true },
        { name: 'Finished', isActive: false },
        { name: 'In Progress', isActive: false }
      ]
    }
  },
  methods: {
    changeList (name) {
      this.lists = this.lists.map(i => {
        i.isActive = i.name === name
        return i
      })
      this.onChange(name)
    }
  }
}
</script>
