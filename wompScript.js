function escapeHtml(text) {
    function replaceTag(tag) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        } [tag] || tag;
    }
    return text.replace(/[&<>]/g, replaceTag);
}


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
const sidebar = document.querySelectorAll("p.sidebar__section-body")[0];

const parts = sidebar.textContent.split("Members:");
const before = parts[0];
const names = parts[1].trim().slice(0, -1).split(", ");
const links = names.map(name => {
    return "<a href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + encodeURIComponent(name).replace(/'/g, '%27') + "'>" + escapeHtml(name) + "</a>";
});

sidebar.innerHTML = before + "<br>Members: " + links.join(", ") + ".";
