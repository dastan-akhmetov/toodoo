<template>
  <div>
    <Header></Header>
    <div class="container">
      <AddToDoItem :on-change="onAddToDoItem" />
      <TabLists :on-change="onChangeTabList" />
      <ToDoListTable :items="filteredTabTodoItems" :on-change="onChangeItem" :on-delete="onDeleteItem" />
      <Pagination :items="filteredTodoItems" :on-page-change="onPageChange" :items-per-page="perPage"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import TabLists from './components/TabLists'
import AddToDoItem from './components/ToDo/AddItem'
import ToDoListTable from './components/ToDo/TableList'
import Pagination from './components/Pagination'

export default {
  name: 'app',
  components: {
    Header,
    TabLists,
    AddToDoItem,
    ToDoListTable,
    Pagination
  },
  data () {
    return {
      todoItems: [],
      currentList: 'All',
      currentPage: 1,
      perPage: 5,
      pageStartIndex: 0,
      pageEndIndex: this.perPage
    }
  },
  created () {
    this.pageEndIndex = this.perPage
  },
  computed: {
    filteredTodoItems () {
      return this.todoItems
        .filter(i => {
          if (this.currentList === 'All') return i
          else if (this.currentList === 'In Progress') return i.isDone !== true
          else if (this.currentList === 'Finished') return i.isDone === true
        })
    },
    filteredTabTodoItems () {
      return this.filteredTodoItems.slice(this.pageStartIndex, this.pageEndIndex)
    }
  },
  methods: {
    onPageChange (number) {
      this.currentPage = number
      this.pageEndIndex = this.currentPage === 1 ? this.perPage : this.perPage * this.currentPage
      this.pageStartIndex = this.pageEndIndex - this.perPage
    },
    onChangeTabList (name) {
      this.currentList = name
    },
    onAddToDoItem (item) {
      this.todoItems.unshift(item)
    },
    onChangeItem (item) {
      this.todoItems = this.todoItems.map(todoItem => {
        if (todoItem.id === item.id) todoItem = item
        return todoItem
      })
    },
    onDeleteItem (item) {
      const found = this.todoItems.find(i => i.id === item.id)
      const indexOf = this.todoItems.indexOf(found)
      this.todoItems.splice(indexOf, 1)
    }
  }
}
</script>
