// Function returning a Promise
function fetchUsers() {

    let isError = false; // Change to true to test rejection

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            if (!isError) {
                resolve([
                    { id: 1, name: "Ali" },
                    { id: 2, name: "Sara" },
                    { id: 3, name: "Ahmed" }
                ]);
            } else {
                reject("Failed to load user data.");
            }

        }, 3000); // 3 seconds delay

    });
}

function loadUsers() {

    let output = document.getElementById("output");

    // Clear previous content
    output.textContent = "Loading users... Please wait.";

    fetchUsers()
        .then(function(users) {

            output.textContent = ""; // Clear loading text

            users.forEach(function(user) {
                let p = document.createElement("p");
                p.textContent = "ID: " + user.id + " | Name: " + user.name;
                output.appendChild(p);
            });

        })
        .catch(function(error) {

            output.textContent = error;

        });
}