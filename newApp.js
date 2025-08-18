// В ЭТОМ ФАЙЛЕ НОВАЯ ФУНКЦИЯ - СОХРАНЕНИЕ ДАННЫХ В localStorage
// ВСЁ РАБОТАЕТ ОТЛИЧНО

const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')
const deleteBtn = document.getElementById('delete')
const localStorageDelete = document.getElementById('localStorageDelete')


function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes))
}


const notes = JSON.parse(localStorage.getItem('notes')) || [{
    title: 'На этом сайте вы можете оставлять заметки',
    completed: false,
    },
    
    {
        title: 'а также изменять их статус',
        completed: false,
    }]


listElement.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type
        
        if(type === 'toggle') {
            console.log('toggle', index)
            notes[index].completed = !notes[index].completed
        }
        
        else if (type === 'remove') {
            console.log('remove', index)
            notes.splice(index, 1)
        }

        saveToLocalStorage()
        render()
    }
}

function getNoteTemplate (note, index) {
    return `
    <ul class="list-group list-group-flush" id="list" style="border-radius: 10px; margin-top:10px;">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class='${note.completed ? 'text-decoration-line-through' : ''}'>${note.title}</span>
                <span>
                    <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">✓</span>
                    <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">×</span>
                </span>
            </li>
        </ul>
        `
}

function render() {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = `<h1 style="text-align:center;">Здесь пусто</h1>`
    }
    for (let i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i))
    }
}


render()

createBtn.onclick = function() {
    if(inputElement.value.length === 0) {
        return
    }

    const newNote = {
        title: inputElement.value,
        completed: false,
    }

    notes.push(newNote)
    saveToLocalStorage()
    render()
    inputElement.value = ''
}

deleteBtn.onclick = function () {
    notes.length = 0
    saveToLocalStorage()
    render()
}