// variable to catch the div content where search result will be shown
const showBookDiv = document.getElementById("search-result");

//variable to catch the text content where search result quantity will be shown
const found = document.getElementById("search-amount");

//function for the spinner Activity
const toggleSpinner = (displayProp) => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = displayProp;
};
toggleSpinner('none');

//function for displaying the search result content
const toggleSearchResultDiv = (displayProp) => {
        showBookDiv.style.display = displayProp;

    }
    //function for showing total search amount
const toggleSearchAmount = (displayProp) => {
    found.style.display = displayProp;
};

// search input related function
const searchBook = () => {

    const searchDiv = document.getElementById("search-value");
    const searchVal = searchDiv.value;
    searchDiv.value = "";
    showBookDiv.textContent = "";
    toggleSpinner("block");
    toggleSearchResultDiv("none");
    toggleSearchAmount("none");
    const url = `https://openlibrary.org/search.json?q=${searchVal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data))
};
// showing the result of the search
const loadBooks = (books) => {
    console.log(books);
    showBookDiv.textContent = "";
    toggleSpinner("none");
    toggleSearchResultDiv("block");
    toggleSearchAmount("block");
    const founded = books.numFound;
    if (founded > 0) {
        found.innerText = `Total  Relatable Books Found: ${books.numFound}`;
    }
    const totalBooks = books.docs;
    // if search related books are found
    if (totalBooks.length > 0) {
        totalBooks.forEach(book => {
            const singleBook = document.createElement("div");
            singleBook.classList.add("col");
            const bookId = book.cover_i;
            singleBook.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${bookId}-M.jpg" class="card-img-top img-fluid h-50" alt="...">
        <div class="card-body">
        <h5 class="text-center fw-bold"> Book Name: ${book.title}</h5>
            <p class="card-title fw-bold text-center">Author Name: ${book.author_name? book.author_name[0]: "not found"}</p>
            <p class="fw-bold text-center">Publisher's Name: ${book.publisher? book.publisher[0]: "not found"}</p>
            <p class="card-text fw-bold text-center">First Publication: ${book.first_publish_year? book.first_publish_year: "not found"}</p>
            </div>
    </div>
    `;
            showBookDiv.appendChild(singleBook);
        });
    }
    // if searched input is invalid or meaningless
    else {
        toggleSearchAmount("none");
        const h4 = document.createElement("h4");
        h4.classList.add("no-result");
        h4.innerText = "Sorry!! No result Found. Try Again!!";
        showBookDiv.appendChild(h4);
    }
};