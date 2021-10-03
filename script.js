//NOTE : github logo can be clicked from anywhere to return to users page
// & there is something funny I have done to profile photo on profile page :P

const contents = document.querySelector(".userList");

//this function fetches the users and returns the promise
let getUsers = async function () {

    let dataUsers = await fetch("https://api.github.com/users");
    let users = await dataUsers.json();
    return users;
}
function renderUsers() {

    getUsers().then(users => {


        contents.innerHTML = "";
        contents.innerHTML = "<div class='info'>Users List : </div>";

        users.forEach(user => {
            //Appending the contents in doms as users
            contents.innerHTML +=
                `
                <div class="row userContainer">
                <div class="col-md-3 img">
                        <img src="${user.avatar_url}" style="" alt="avatar">
                </div>
                <div class="col-md-7 ">
                    <div class="row">
                        <ul class="col-md leftInfo">
                                <li>Username:&nbsp;${user.login}</li>
                                <li>Admin:&nbsp;${user.site_admin}</li>
                                <li>Usertype:&nbsp;${user.type}</li>
                        </ul>
                    </div>   
                </div>
                <div class="col-md-2">
                    <button onclick="visitProfile(this)" class="btn btn-secondary">Visit Account</a>
                </div>
            </div>
    
    
                
                `
        });
    }).catch(error => {
        //Handling the error through catch
        console.log(error);

    });


}

//calling the function on loading the page for the first time (Only works on users page though , HEHE :D)
renderUsers();


//Searchbox to fetch and scroll to view text
const searchBox = document.querySelector('.searchBox input');
searchBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        let scrollToObj = document.evaluate(`//li[contains(normalize-space(),'${searchBox.value}')]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        scrollToObj.scrollIntoView();
        searchBox.value = "";
    }
});

//Visit profile works and renders page just like github profile
async function visitProfile(object) {
    let banner = object.parentNode.parentNode;
    let uName = banner.querySelector(".leftInfo li:first-child").innerText;
    uName = uName.substring(10);
    let userData = await fetch(`https://api.github.com/users/${uName}`, { method: "get" });
    userData = await userData.json();
    contents.innerHTML =
        `<div class="row userInfoComponent">
<div class="col-md-4">
    <div class="profileImg my-3">
        <img src="${userData.avatar_url}" alt="profile">
    </div>
    <div class="mainInfo">
        <h1>${userData.name}</h1>
        <span>${userData.login}</span>
        <ul>

            <li>Created:-${userData.created_at}</li>
            <li>Last Updated:-${userData.updated_at}</li>
        </ul>
    </div>
</div>
<div class="col-8">

    <div class="row">
        <div class="col-md-6">
            <button class="btn btn-outline-success btn-block my-4" onclick="viewAllRepos()">Click to see all Repositories</button>
            <div class="personalInfo">
                <h2>Personal Information :</h2>
                <span>Real Github Profile Link : <a href="${userData.html_url}" target="_blank"
                        rel="noopener noreferrer">Visit Real Profile</a></span>
                <span>Visit to see blog : <a href="${userData.blog}" target="_blank"
                        rel="noopener noreferrer">Blogs</a></span>
                <span>Location:-${userData.location}</span>
                <span>Followers:-${userData.followers}</span>
                <span>Following:-${userData.following}</span>

            </div>
        </div>
        <div class="col-md-6">
            <button class="btn btn-outline-danger btn-block my-4" onclick="renderUsers()">Click to go back
                to user list</button>
            <div class="personalInfo">
                <span class="pt-5">Public Repositories - ${userData.public_repos}</span>
                <span>Company - ${userData.company}</span>
                <span>Email - ${userData.email}</span>
                <span>Bio - ${userData.bio}</span>
                <span>Hireable - ${userData.nahireableme}</span>

            </div>
        </div>

    </div>
</div>
</div>`;

}

//This function would show list of repositories owned by specific used when clicked in show repos button on profile page
async function viewAllRepos() {
    const userName = document.querySelector('.mainInfo span').innerText;
    console.log(userName);
    const appendContainer = document.querySelector(".userList");
    let repoData = await fetch(`https://api.github.com/users/mojombo/repos`);
    repoData = await repoData.json();
    console.log(JSON.stringify(repoData))

    // appendContainer.setAttribute("class", "container-fluid");
    // appendContainer.innerHTML = "";
    // appendContainer.innerHTML = "<div class='row repoContainer'></div>";

    // repoData.forEach(repo => {

    //     appendContainer.querySelector(".repoContainer").innerHTML += `
    //             <a href="https://github.com/${repo.owner.login}/${repo.name}" class="col-sm-3 head">
    //                 <div class="content">
    //                     <div class="title">${repo.name}</div>
    //                     <strong>Click the tab to access the repository</strong>
    //                     <ul class="lis">
    //                         <li>Repo Name : "${repo.owner.login}/${repo.name}"</li>
    //                         <li>IsPrivate : ${repo.private} </li>
    //                         <li>Description : ${repo.description}</li>
    //                         <li>Language : ${repo.language}</li>
    //                         <li>STARS : ${repo.stargazers_count}</li>
    //                         <li>Watchers : ${repo.watchers_count}</li>
    //                         <li>FORKS : ${repo.forks_count}</li>
    //                         <li>Visibility : ${repo.visibility}</li>
    //                         <li>Issues Open :${repo.open_issues}</li>
    //                         <li>Branch : ${repo.default_branch}</li>
    //                         <li>Last Update : ${repo.updated_at}</li>
    //                         <li>Created At : ${repo.created_at}</li>
    //                     </ul>
    //                 </div>
    //             </a>
        
        
    //     `;

    // })

}


