let userArr = [];
const row = document.getElementById("row");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const dropdowns = document.querySelectorAll(".dropdown-item");
const refreshBtn = document.getElementById("refreshBtn");
for (let dropdown of dropdowns) {
  dropdown.addEventListener("click", () => {
    btn.innerHTML = dropdown.innerText;
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
  usersArr.forEach((person) => {
    let userAddress = getAddress2(person);
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

const getAddress = (userAddress) => {
  const address = [];
  userAddress.forEach((userObj) => {
    address.push(
      userObj.address.street,
      userObj.address.suite,
      userObj.address.city,
      userObj.address.zipcode
    );
  });

  return address.join(" ");
};

const getAddress2 = (userObj) => {
  const address = [];
  address.push(
    userObj.address.street,
    userObj.address.suite,
    userObj.address.city,
    userObj.address.zipcode
  );

  return address.join(" ");
};

const displayFilteredCardUser = (usersArray) => {
  row.innerHTML = "";
  let userAddress = getAddress(usersArray);
  usersArray.forEach((person) => {
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

const searchUser = (event) => {
  // console.log(event)
  if (event.key === "Enter" && event.target.value.length > 3) {
    const filteredUsers = userArr.filter((user) => {
      if (btn.innerText === "Email") {
        if (
          user.email.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
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
    console.log(filteredUsers);
    displayFilteredCardUser(filteredUsers);
  }
};

refreshBtn.addEventListener("click", getUser);

window.onload = () => {
  getUser();
};
