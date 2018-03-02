<template>
  <b-pagination
      :total="total"
      :current.sync="current"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
  >
  </b-pagination>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    onPageChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      current: 1,
      perPage: this.itemsPerPage,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false
    }
  },
  watch: {
    current (value) {
      if (value > 0) {
        this.onPageChange(value)
      } else {
        this.current = 1
      }
    }
  },
  computed: {
    total () {
      return this.items.length
    }
  }
}
</script>
