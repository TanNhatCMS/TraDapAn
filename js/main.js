// Định danh các phần tử DOM
const searchInput = document.getElementById("search-input");

let currentDataSource = "tradapan";
let allDataBase;

async function getDataBaseStore(dataSource) {
  const storedDatabase = localStorage.getItem(dataSource);
  if (storedDatabase) {
    return JSON.parse(storedDatabase);
  } else {
    try {
      const resBook = await fetch(`https://658bef26859b3491d3f51938.mockapi.io/${dataSource}`);
      let database = await resBook.json();
      localStorage.setItem(dataSource, JSON.stringify(database));
      return database;
    } catch (error) {
      console.error(`Error parsing ${dataSource} list from local storage:`, error);
      return [];
    }
  }
}

function displayDataBase(DataBaseList) {
  const tbody = document.querySelector("#table-book tbody");
  tbody.innerHTML = '';
  DataBaseList.forEach((DataBase, index) => {
    const newRow = createTableRow(DataBase.question, DataBase.answer);
    tbody.appendChild(newRow);
  });
}
function createTableRow(question, answer) {
  const newRow = document.createElement('tr');
  newRow.classList.add('database-item');
  newRow.innerHTML = `
        <td>${question}</td>
        <td>${answer}</td>
    `;
  return newRow;
}

// Tìm kiếm
const SearchDataBase = (event) => {
  const filter = [];
  const searchValue = event.target.value.toLowerCase();
  allDataBase.forEach((database) => {
    if (database.search.toLowerCase().includes(searchValue)) {
      filter.push(database);
    }
  });
  if (searchValue) {
    displayDataBase(filter);
  } else {
    displayDataBase(allDataBase);
  }
};

// Sự kiện tìm kiếm
searchInput.addEventListener('keyup', SearchDataBase);

async function initializePage() {
  allDataBase = await getDataBaseStore(currentDataSource);
  displayDataBase(allDataBase);
}

document.addEventListener("DOMContentLoaded", initializePage);
