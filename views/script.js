// Function to format date for input
function formatDateForInput(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return ""; // Return an empty string if the date is invalid
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${ year}-${month}-${day}`;
}


document.getElementById('addButton').addEventListener('click', function () {
    const formContainer = document.getElementById('formContainer');
    const tableContainer = document.getElementById('tablecontainer');
    const updatebutton =document.getElementById('headertag').innerHTML
     if (updatebutton==='Employee Details' && formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
        tableContainer.style.display ='none';       
        document.getElementById('headertag').innerHTML='Add Employee Details'
    } 
    else {
        formContainer.style.display = 'none';
        tableContainer.style.display ='block';
        document.getElementById('headertag').innerHTML='Employee Details'
    }
});

// Hide the form on cancel
document.getElementById('cancelButton').addEventListener('click', function () {
    document.getElementById('tablecontainer').style.display = 'block';
    document.getElementById('formContainer').style.display ='none';
    const updatebutton =document.getElementById('headertag').innerHTML
    if(updatebutton==='Update Employee Details'){
        document.getElementById('headertag').innerHTML='Employee Details'
    }
   else if(updatebutton==='Add Employee Details'){
        document.getElementById('headertag').innerHTML='Employee Details'
    }
});
//for reset the function
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('name').style.display = ''
    document.getElementById('mail').style.display = ''
    document.getElementById('phone').style.display = ''
    document.getElementById('dob').style.display = ''
    document.getElementById('designation').style.display = ''
    document.getElementById('salary').style.display = ''

    
});

// for delete items 
// Function to delete a row
// Function to delete a row
function deleteRow(button) {
    if (!button) {
        console.error('Button element is not defined.');
        return;
    }

    const row = button.closest('tr');

    if (!row) {
        console.error('Row not found.');
        return;
    }

    const employeeId = row.getAttribute('data-id');
    
    // Send delete request
    fetch(`/delete/${employeeId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            row.remove(); // Remove the row from the table
            alert('Employee deleted successfully');
        } else {
            alert('Failed to delete employee');
        }
    })
    .catch(err => console.error('Error:', err));
}


// Function to populate form for editing

function editRow(button) {
    console.log("Edit row");
    const row = button.closest('tr');
    const employeeId = row.getAttribute('data-id');
    const updatebutton =document.getElementById('headertag').innerHTML
    const headingAdd =  document.getElementById('addButton').innerHTML
    if(updatebutton==='Employee Details' || headingAdd==='Add'){
        document.getElementById('headertag').innerHTML='Update Employee Details'
        document.getElementById('addButton').innerHTML='Back'
    }
    // Populate form with row data
    document.getElementById('employeeId').value = employeeId;
    document.getElementById('name').value = row.querySelector('.name').textContent;
    document.getElementById('mail').value = row.querySelector('.email').textContent;
    document.getElementById('phone').value = row.querySelector('.phone').textContent;
    // document.getElementById('br_name').value = row.querySelector('.br_name').textContent;
    // document.getElementById('phone').value = row.querySelector('.phone').textContent;
    const dob = row.querySelector('.dob').getAttribute('data-dob');
    document.getElementById('dob').value = formatDateForInput(dob);
    document.getElementById('designation').value = row.querySelector('.designation').textContent;
    document.getElementById('salary').value = row.querySelector('.salary').textContent;

    // Display the form
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('tablecontainer').style.display = 'none';

    // Update form action to point to the update endpoint
    document.getElementById('editForm').action = `/update/${employeeId}`;
}

// for searchbar
function searchBar() {
    const input = document.getElementById('searchBar').value.toLowerCase(); // Get the search input and convert it to lowercase
    const table = document.getElementById('employeeTable'); // Get the table
    const rows = table.getElementsByTagName('tr'); // Get all the rows

    // Loop through all table rows, starting from index 1 to skip the table header
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        let match = false; // Flag to check if the row matches the search

        // Get all the cells (td elements) in the current row
        const cells = row.getElementsByTagName('td');
        
        // Loop through all cells to see if any of them match the search term
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell.innerText.toLowerCase().includes(input)) {
                match = true; // If a match is found, set flag to true
                break; // No need to check other cells once a match is found
            }
        }

        // If a match is found, show the row; otherwise, hide it
        row.style.display = match ? '' : 'none';
    }
}

