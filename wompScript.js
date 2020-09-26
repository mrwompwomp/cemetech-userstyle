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
if (sidebar.parentElement.childElementCount == 2) {
    const parts = sidebar.textContent.split("Members:");
    const links = parts[1].trim().slice(0, -1).split(", ").map(name => {
        return "<a href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + encodeURIComponent(name).replace(/'/g, '%27') + "'>" + escapeHtml(name) + "</a>";
    });

    sidebar.innerHTML = parts[0] + "<br>Members: " + links.join(", ") + ".";
} else {
    const parts = document.getElementsByClassName("commasep-list")[0];
    for (var i = 1; i < parts.childElementCount + 1; i++) {
        var node = parts.childNodes[i].firstElementChild;
        var name = node.textContent;
        node.innerHTML = "<a href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + encodeURIComponent(name).replace(/'/g, '%27') + "'>" + escapeHtml(name) + "</a>";
    }
}

//Flatten pips
var pips = document.querySelectorAll(".pips, .profile_brief .gen:nth-child(6)");
for (var i = 0; i < pips.length; i++) {
    var pip = pips[i].firstElementChild.src;
    pips[i].style = pip.includes("expert.png") ? "background: none;" : "width: " + 0.75 * pip.slice(0, -4).split("pips/").pop() + "em";
}
