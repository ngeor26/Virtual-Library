let library = []

function Book(title, author, pageNumbers, readStatus) {
    this.title = title
    this.author = author
    this.pageNumber = pageNumbers
    this.readStatus = readStatus
}

function addBookToLibrary(book){
    library.push(book)
    display()
}

function display(){
    document.querySelector("#books").innerHTML = ""
    for(const [i, book] of library.entries()){
        if(!book.readStatus){
            readStatus = "Haven't read yet"
        }else {
            readStatus = "Read!"
        }
        document.querySelector("#books").innerHTML += `
        <div class='card' id=${i}>

        <div id="remove-wrapper">
        <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/close_111152.png" alt="Close Popup" class="remove">
        </div>
        
        <p>
        Title: ${book.title}
        </p>
        
        <p>
        Author: ${book.author}
        </p>
        
        <p>
        Number of Pages: ${book.pageNumber}
        </p>
        
        <p class='read'>
        ${readStatus}
        </p>

        </div>`
    }
    refreshListeners()
}

const r = document.querySelector(':root');

document.querySelector("#add").addEventListener('click', function(){
    document.querySelector("#book-popup-form").style.display = "block"
    r.style.setProperty('--blur-amount', '2px')
})

document.addEventListener('submit', function(event){
    event.preventDefault()
    let title = document.querySelector('[name="title"]').value
    let author = document.querySelector('[name="author"]').value
    let pageNumber = document.querySelector('[name="pages"]').value
    let readStatus = document.querySelector('[name="read"]').checked
    if(!parseInt(pageNumber)){
        alert("Invalid Page Number")
        document.querySelector('[name="pages"]').value = ""
        return;
    }
    let book = new Book(title, author, pageNumber, readStatus)
    document.querySelector('[name="title"]').value = ""
    document.querySelector('[name="author"]').value = ""
    document.querySelector('[name="pages"]').value = ""
    document.querySelector('[name="read"]').checked = false
    addBookToLibrary(book)
    document.querySelector("#book-popup-form").style.display = "none"
    r.style.setProperty('--blur-amount', '0px')
})

document.querySelector("#close").addEventListener('click', function (){
    document.querySelector('[name="title"]').value = ""
    document.querySelector('[name="author"]').value = ""
    document.querySelector('[name="pages"]').value = ""
    document.querySelector('[name="read"]').checked = false
    document.querySelector("#book-popup-form").style.display = "none"
    r.style.setProperty('--blur-amount', '0px')
});

function refreshListeners(){
    Array.from(document.getElementsByClassName("read")).forEach(function(element){
        element.addEventListener("click", function(){
            if(element.innerHTML == "Read!"){
                element.innerHTML = "Haven't read yet"
            }else{
                element.innerHTML = "Read!"
            }
        });
    });

    Array.from(document.getElementsByClassName("remove")).forEach(function(element){
        element.addEventListener("click", function(){
            const card = element.parentElement.parentElement;
            console.log(card.id)
            library.splice(card.id, 1)
            element.parentElement.parentElement.remove()
        });
    });
}

display()