let userArr = [];
const row = document.getElementById("row");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const dropdowns = document.querySelectorAll(".dropdown-item");
const refreshBtn = document.getElementById("refreshBtn");
const sortBtn = document.querySelector(".sort-btn");
for (let dropdown of dropdowns) {
  dropdown.addEventListener("click", () => {
    btn.innerHTML = dropdown.innerText;
    input.value = "";
    if (btn.innerText === "Email") {
      input.placeholder = "Search users with their email";
    } else if (btn.innerText === "Username") {
      input.placeholder = "Search users with their username";
    } else {
      input.placeholder = "Search users with their name";
    }
  });
}

const getUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const user = await response.json();
    console.log(user);
    userArr = user;
    displayCard(user);
  } catch (err) {
    console.log(err);
  }
};

const displayCard = (usersArr) => {
  row.innerHTML = "";
  usersArr.forEach((person) => {
    let userAddress = getAddress(person);
    row.innerHTML += `
        <div class="col-sm-6 col-md-4 mt-3">
            <div class="card mr-3" ">
                <div class="card-body">
                <h5 class="card-title">${person.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Username: ${person.username}</h6>
                <p class="card-text">${userAddress}</p>
                <a href="#" class="card-link">Email: ${person.email}</a>
                <p class="text-muted" style="font-size: 10px">id: ${person.id}</p>
                </div>
          </div>
       </div>
        `;
  });
};

const getAddress = (userObj) => {
  const address = [];
  address.push(
    userObj.address.street,
    userObj.address.suite,
    userObj.address.city,
    userObj.address.zipcode
  );

  return address.join(" ");
};

const searchUser = (event) => {
  // console.log(event)
  let value = event.target.value;
  if (event.key === "Enter") {
    const filteredUsers = userArr.filter((user) => {
      if (btn.innerText === "Email") {
        if (user.email.toLowerCase().includes(value.toLowerCase())) {
          return user;
        }
      } else if (btn.innerText === "Username") {
        if (
          user.username.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return user;
        }
      } else {
        if (
          user.name.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return user;
        }
      }
    });
    input.value = "";
    console.log(filteredUsers);
    // displayFilteredCardUser(filteredUsers);
    displayCard(filteredUsers);
  }
};

let sorted = true;
const sort = (users) => {
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  if (sorted) {
    displayCard(sortedUsers);
    sorted = false;
  } else {
    displayCard(sortedUsers.reverse());
    sorted = true;
  }
};

sortBtn.addEventListener("click", () => {
  sort(userArr);
});
refreshBtn.addEventListener("click", getUser);

window.onload = () => {
  getUser();
};
