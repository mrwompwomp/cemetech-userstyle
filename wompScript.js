//Shorter dates
if (location.href == "https://www.cemetech.net/forum/search.php?search_id=weekposts") {
    var NodeList = document.getElementsByClassName("forumline")[0].firstElementChild.children;
    for (var i = 2; i < NodeList.length; i++) {
        var content = NodeList[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild;
        var options = {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        content.textContent = new Date(content.textContent).toLocaleDateString('en-US', options);
        content.parentNode.insertBefore(document.createElement("br"), content.nextElementSibling);
    }
}
//Make online names clickable
var sidebar = document.querySelectorAll("p.sidebar__section-body")[0];
var pre = sidebar.textContent.split("Members:");
var names = pre.pop().trim().slice(0, -1).split(", ");
for (var i = 0; i < names.length; i++)
    names[i] = "<a href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + names[i] + "'>" + names[i] + "</a>";
sidebar.innerHTML = pre + "<br>Members: " + names.join(", ") + ".";
