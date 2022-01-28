var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });
  };

  var formSubmitHandler = function(event) {
      event.preventDefault();
      
      //get value from input

      var username = nameInputEl.value.trim();

      if (username) {
          getUserRepos(username);
          nameInputEl.value="";
      } else {
          alert("Please Enter a GitHub username")
      }
  }



  var displayRepos = function(repos, searchTerm) {

    //loop over repos
    if (repos.length ===0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

      repoContainerEl.textContent = "";
      repoSearchTerm.textContent = searchTerm;

      for (var i = 0; i< repos.length; i++) {
          //format repo name
          var repoName = repos[i].owner.login +"/" + repos[i].name;

          //container for repo

          var repoEl = document.createElement("a");
          repoEl.classList = "list-item flex-row justify-space-between align-center";
          repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

          //span element to hold name

          var titleEl = document.createElement("span");
          titleEl.textContent = repoName;

          //append
          repoEl.appendChild(titleEl);

          var statusEl = document.createElement("span");
          statusEl.classList= "flex-row align-center";


            

          //check for issues
          if (repos[i].open_issues_count > 0){
              statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
              console.log("issues found!");

          } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";

          }

          repoEl.appendChild(statusEl);
          repoContainerEl.appendChild(repoEl);
      }
  }
console.log("outside")



userFormEl.addEventListener("submit", formSubmitHandler);