// Теория по массивам
/*
const array = [1,2,3,4,5,10, 555]
// const arrayStr = ['a', 'b', 'c', 22, null, NaN]
// const array = new Array(1,2,3,4)
// console.log(array)
// console.log(array.length)
// console.log(array[4])
console.log(array[array.length - 1])

array[0] = 'Hello'
console.log(array)

array[array.length] = 'World'
*/

const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')
const deleteBtn = document.getElementById('delete')
// const notes = ['список дел', 'продукты' ]


const notes = [{
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

        render()
    }
}

function getNoteTemplate (note, index) {
    return `
    <ul class="list-group list-group-flush" id="list" style="border-bottom-style:solid;border-color:black;border-width: 2px;">
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

    //Второй способ:
    /* 
    for (let note of notes) {
        listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[note]))
    }
    */
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
    // list.innerHTML = 
    notes.push(newNote)
    render()
    inputElement.value = ''
}

deleteBtn.onclick = function () {
    notes.length = 0
    render()
}


// Object Теория
/*
const person = {
    firstName: 'Danil',
    lastName: 'Kalashnikov',
    year: 2007,
    man: true,
    languages: ['ru', 'en'],
    fullName: function () {
        console.log(person.firstName + ' ' + person.lastName)
    },
}

console.log(person.year)
console.log(person['languages'])

const key = 'man'
console.log(person[key])
*/
