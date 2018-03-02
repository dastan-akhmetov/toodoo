<template>
  <div>
    <Header></Header>
    <div class="container">
      <AddToDoItem :on-change="onAddToDoItem" />
      <TabLists :on-change="onChangeList" />
      <ToDoList :items="filteredTodoItems" :on-change="onChangeItem" :on-delete="onDeleteItem" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import TabLists from './components/TabLists'
import AddToDoItem from './components/ToDo/AddItem'
import ToDoList from './components/ToDo/List'

export default {
  name: 'app',
  components: {
    Header,
    TabLists,
    AddToDoItem,
    ToDoList
  },
  data () {
    return {
      todoItems: [],
      currentList: 'All'
    }
  },
  computed: {
    filteredTodoItems () {
      return this.todoItems.filter(i => {
        if (this.currentList === 'All') return i
        else if (this.currentList === 'In Progress') return i.isDone !== true
        else if (this.currentList === 'Finished') return i.isDone === true
      })
    }
  },
  methods: {
    onChangeList (name) {
      this.currentList = name
    },
    onAddToDoItem (item) {
      this.todoItems.unshift(item)
    },
    onChangeItem (item) {
      this.todoItems = this.todoItems.map(ti => {
        if (ti.id === item.id) {
          ti = item
        }
        return ti
      })
    },
    onDeleteItem (item) {
      const found = this.todoItems.find(i => i.id === item.it)
      const indexOf = this.todoItems.indexOf(found)
      this.todoItems.splice(indexOf, 1)
    }
  }
}
</script>
