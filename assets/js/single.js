var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //request success
        if (response.ok) {
            response.json().then(function(data) {
                //pass to display function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);

};

var displayIssues = function(issues) {
    //loop over response

    if (issues.length===0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }

    for (var i = 0; i< issues.length; i++) {
        //create a link element to take usres to the issue
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between-align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container

        issueEl.appendChild(titleEl);

        //create type element
        var typeEl = document.createElement("span");

        //check if issue is actually issue or is pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        
        } else {
            typeEl.textContent = "(Issue)";
        };

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }

};

getRepoIssues("facebook/react");