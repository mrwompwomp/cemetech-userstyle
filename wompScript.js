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

//Replace 'Say' button in SAX with animated arrow
var arrow = document.createElement("button");
arrow.type = "submit";
arrow.classList.add("arrow");
arrow.setAttribute("href", "#");
arrow.innerHTML = "<div class='arrow-top'></div><div class='arrow-bottom'></div>";
var sax = document.getElementsByName("saxin")[0];
sax.firstElementChild.nextElementSibling.remove();
sax.appendChild(arrow);

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

function globalCode(callback) {
    const script = document.createElement("script");
    script.innerHTML = `(${callback.toString()})()`;
    document.body.appendChild(script);
}

if (location.href.includes("https://www.cemetech.net/forum/posting.php")) {
    globalCode(() => {
        //Fix YouTube Button Bug
        window["y_help"] = "Youtube video: [youtube]Youtube URL[/youtube] (alt+y)";

        //Add Strike Button
        window["st_help"] = "Strikethrough text: [strike]text[/strike] (alt+t)";
        bbtags.push('[strike]', '[/strike]', '[mono]', '[/mono]', '[center]', '[/center]');
        var container = document.createElement('span');
        container.style.marginRight = "4px";
        container.classList = "genmed code-button-wrap";
        container.innerHTML = "<input type='button' name='addbbcode22' class='button' accesskey='t' value='Strike' style='text-decoration: line-through; margin-right: 4px;' onclick='bbstyle(20)' onmouseover=\"helpline(\'st\')\">";

        //Add Mono Button
        window["m_help"] = "Monospaced text (inline code): [mono]text[/mono] (alt+m)";
        container.innerHTML += "<input type='button' name='addbbcode22' class='button' accesskey='m' value='Mono' style='font-family: monospace; margin-right: 4px;' onclick='bbstyle(22)' onmouseover=\"helpline(\'m\')\">";

        //Add Horizontal Rule Button
        window["h_help"] = "Horizontal rule (inline code): content[hr]content (alt+h)";
        container.innerHTML += "<input type='button' class='button' accesskey='h' value='[hr]' style='margin-right: 4px;' onclick='bbsymbol(this.value)' onmouseover=\"helpline(\'h\')\">";

        //Add Center Button
        window["j_help"] = "Centered text (inline code): [center]text[/center] (alt+j)";
        container.innerHTML += "<input type='button' name='addbbcode22' class='button' accesskey='j' value='Center' style='text-align: center; margin-top: 4px;' onclick='bbstyle(24)' onmouseover=\"helpline(\'j\')\">";
        document.querySelector(".code-buttons:first-child").appendChild(container);
    });

    //Add color picker for color tag in post editor
    var i = document.createElement("input");
    i.type = "color";
    i.setAttribute("onchange", "bbfontstyle('[color=' + this.value + ']', '[/color]');");
    i.setAttribute("onmouseover", "helpline('s')");
    document.getElementsByName("addbbcode19")[0].parentElement.appendChild(i);
}

//Restyle UTI pages
if (window.location.href.startsWith("https://www.cemetech.net/projects/uti")){
    var style = document.createElement("style");
    style.innerHTML = "tr>th{border-bottom: 1px solid #254e6f !important;}section.sidebar__section,div.mainlowermiddle,div.mainheadmiddle,div#hbot,.mainbody{background:#254e6f !important;}.sidebar__section,#hbot{border: 2px solid #19364d}a{color: #222}a:hover{color:#34498B}.maintitle:hover,.sidebar__section-body a:hover,.sidebar__section-header a:hover{color: white}.navsearchinput{background:#34498B !important;}img[src*='lang_english'],.navsearchsubmit{filter:hue-rotate(194deg);}.sax-message a{background:#1c264a}";
    document.body.append(style);
}
