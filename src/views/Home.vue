<template>
    <div class="home">
        <button class="create" @click="createNote">
            Перейти к созданию новой заметки
        </button>
        <h1>Список заметок</h1>
        <div class="note" v-for="(note, index) in $store.state.notes">
            <h2>{{ note.title }}</h2>
            <div class="todo">
                <ul>
                    <li v-for="todo in note.todo">
                        <a :class="{ 'cross-text': todo.done }">{{
                            todo.text
                        }}</a>
                    </li>
                </ul>
            </div>
            <div class="buttons">
                <router-link :to="'/change-note/' + index">
                    <button class="change">Перейти к изменению</button>
                </router-link>
                <button class="delete" @click="openModal(index)">
                    Удалить (необходимо подтверждение)
                </button>
            </div>
        </div>
        <Modal ref="modal" v-on:ok="onDelete">Удалить?</Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deleteIndex: null,
        }
    },
    methods: {
        createNote() {
            this.$store.commit('createNote')
            this.$store.commit('save')
            this.$router.push('/change-note/0')
        },
        onDelete() {
            this.$store.commit('deleteNote', this.deleteIndex)
            this.$store.commit('save')
        },
        openModal(index) {
            this.deleteIndex = index
            this.$refs.modal.open()
        },
    },
}
</script>

<style lang="scss" scoped>
.cross-text {
    text-decoration: line-through;
}
.home {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.note {
    border: 1px solid black;
    margin: 20px;
    text-align: center;
    ul {
        padding-left: 0;
        li {
            display: flex;
            justify-content: center;
            align-items: center;
            list-style-type: none;
            margin: 15px;
            height: 30px;
            border: 1px solid black;
            border-radius: 15px;
            a {
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
    .buttons {
        display: flex;
        justify-content: center;
    }
    .change {
        background-color: orange;
        border: none;
        width: 50%;
        margin: 5px;
    }
    .delete {
        background-color: #df1124;
        border: none;
        width: 50%;
        margin: 5px;
        color: white;
    }
}
.create {
    margin-top: 20px;
    border: none;
    cursor: pointer;
}
button {
    height: 50px;
    cursor: pointer;
}
</style>
