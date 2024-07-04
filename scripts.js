

document.getElementById('assignment-form').addEventListener('submit', addAssignment);

function addAssignment(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('roll-number').value;
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('due-date').value;
    const submissionDate = document.getElementById('submission-date').value;
    const description = document.getElementById('description').value;

    const assignment = {
        id: Date.now(),
        name,
        rollNumber,
        title,
        dueDate,
        submissionDate,
        description
    };

    addAssignmentToDOM(assignment);
    saveAssignmentToLocalStorage(assignment);

    document.getElementById('assignment-form').reset();
}

function addAssignmentToDOM(assignment) {
    const assignmentDiv = document.createElement('div');
    assignmentDiv.className = 'assignment';
    assignmentDiv.innerHTML = `
        <h3>${assignment.title}</h3>
        <p><strong>Student:</strong> ${assignment.name} (${assignment.rollNumber})</p>
        <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
        <p><strong>Submission Date:</strong> ${assignment.submissionDate}</p>
        <p>${assignment.description}</p>
        <button onclick="deleteAssignment(${assignment.id})">Delete</button>
    `;

    document.getElementById('assignments').appendChild(assignmentDiv);
}

function saveAssignmentToLocalStorage(assignment) {
    let assignments = localStorage.getItem('assignments');
    if (assignments) {
        assignments = JSON.parse(assignments);
    } else {
        assignments = [];
    }

    assignments.push(assignment);
    localStorage.setItem('assignments', JSON.stringify(assignments));
}

function deleteAssignment(id) {
    let assignments = JSON.parse(localStorage.getItem('assignments'));
    assignments = assignments.filter(assignment => assignment.id !== id);
    localStorage.setItem('assignments', JSON.stringify(assignments));

    document.getElementById('assignments').innerHTML = '';
    assignments.forEach(addAssignmentToDOM);
}

function loadAssignments() {
    const assignments = JSON.parse(localStorage.getItem('assignments'));
    if (assignments) {
        assignments.forEach(addAssignmentToDOM);
    }
}

document.addEventListener('DOMContentLoaded', loadAssignments);
