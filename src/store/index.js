import { createStore } from 'vuex'

export default createStore({
    state: {
        //Список заметок
        notes: [],
    },
    mutations: {
        //сохраняет заметки в localStorage
        save(state) {
            localStorage.notes = JSON.stringify(state.notes)
        },
        //загружать в приложение сохраненые изменения из localStorage
        load(state) {
            state.notes = JSON.parse(localStorage.notes)
        },
        //удаляет дело
        deleteTodoItem(state, payload) {
            state.notes[payload.indexNote].todo.splice(payload.indexItem, 1)
        },
        //добавляет дело
        addTodoItem(state, payload) {
            state.notes[payload].todo.unshift({
                done: false,
                text: 'Новое дело',
            })
        },
        //создать заметку
        createNote(state) {
            state.notes.unshift({
                title: 'Заголовок',
                todo: [
                    {
                        done: false,
                        text: 'Новое дело',
                    },
                ],
            })
        },
        //удаляет заметку
        //payload - число - индекс хранилища state.notes
        deleteNote(state, payload) {
            state.notes.splice(payload, 1)
        },
    },
    actions: {},
    modules: {},
})
