const row = document.getElementById("row");
const getUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const user = await response.json();
    console.log(user);

    displayCard(user);
  } catch (err) {
    console.log(err);
  }
};

const displayCard = (usersArr) => {
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

window.onload = () => {
  getUser();
};
