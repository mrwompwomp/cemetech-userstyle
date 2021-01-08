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

function unescapeEntities(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html.textContent;
    html.textContent = txt.value;
}

//Fix unicode in post titles (stolen from iPhoenix)
if (location.href.includes("cemetech.net/forum/viewtopic.php")) {
    unescapeEntities(document.querySelector(".mainheadmiddle.roundedtop .maintitle"));
    unescapeEntities(document.querySelector("head > title"));
    unescapeEntities(document.getElementsByClassName("post-subject indextramed")[0]);
}

//Fix unicode in post titles while listing topics in a subforum and while searching
if (/cemetech.net\/forum\/(viewforum|search).php/.test(location.href)) 
    Array.from(document.querySelectorAll(".topictitle > a")).forEach(titleLink => unescapeEntities(titleLink));

//Shorter dates
if (location.href.includes("cemetech.net/forum/search.php")) {
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

//Remove 'Say' button in SAX
var sax = document.getElementById("saxtalk");
sax.nextElementSibling.remove();

//Make online names clickable
const sidebar = document.querySelectorAll("p.sidebar__section-body")[0];
if (sidebar) {
    if (sidebar.parentElement.childElementCount == 2) {
        const sideContent = sidebar.innerHTML;
        const parts = sidebar.textContent.split("Members:");
        const links = parts[1].trim().slice(0, -1).split(", ").map(name => {
            loc = sideContent.search(name);
            specialTitle = sideContent.substring(loc - 2, loc - 10);
            specialTitle = specialTitle == "mincolor" ? "admincolor" : specialTitle == "modcolor" ? "modcolor" : "";
            return "<a class='" + specialTitle + "'href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + encodeURIComponent(name).replace(/'/g, '%27') + "'>" + escapeHtml(name) + "</a>";
        });

        sidebar.innerHTML = parts[0] + "<br>Members: " + links.join(", ") + ".";
    } else {
        const parts = document.getElementsByClassName("commasep-list")[0];
        for (var i = 1; i < parts.childElementCount + 1; i++) {
            var node = parts.childNodes[i].firstElementChild;
            var name = node.textContent;
            specialTitle = node.classList[0] ? node.classList[0] : "";
            node.innerHTML = "<a class='" + specialTitle + "' href='https://www.cemetech.net/forum/profile.php?mode=viewprofile&u=" + encodeURIComponent(name).replace(/'/g, '%27') + "'>" + escapeHtml(name) + "</a>";
        }
    }
}

//Flatten pips
Array.from(document.querySelectorAll(".pips, .profile_brief .gen:nth-child(6)")).forEach(pip => {
    var pipImg = pip.firstElementChild.src;
    pip.style = pipImg.includes("expert.png") ? "background: none;" : "width: " + 0.75 * pipImg.slice(0, -4).split("pips/").pop() + "em";
});

function globalCode(callback) {
    const script = document.createElement("script");
    script.innerHTML = `(${callback.toString()})()`;
    document.body.appendChild(script);
}

if (location.href.includes("cemetech.net/forum/posting.php")) {
    const TLMBug = document.querySelector("#page_content_parent > div.mainbody > div > table > tbody > tr > td > span");
    if (TLMBug.textContent == "Sorry, but only  can reply to posts in this forum.") {
        TLMBug.innerHTML = "Sorry, the post you attempted to quote has been deleted. <span style='font-size: 6px'>This error message was sponsored by TheLastMillennial</span>";
    } else {
        globalCode(() => {
            //Fix YouTube Button Bug
            window["y_help"] = "Youtube video: [youtube]Youtube URL[/youtube] (alt+y)";

            bbtags.push('', '', '[strike]', '[/strike]', '[mono]', '[/mono]', '[center]', '[/center]', '[rainbow]', '[/rainbow]', '[sup]', '[/sup]', '[sub]', '[/sub]', '[md5]', '[/md5]', '[reverse]', '[/reverse]', '[serif]', '[/serif]', '[sans]', '[/sans]');
            var container = document.createElement('span');

            //Add Strike Button        
            window["st_help"] = "Strikethrough text: [strike]text[/strike] (alt+t)";
            container.innerHTML = "<input type='button' name='addbbcode22' accesskey='t' value='Strike' style='text-decoration: line-through; margin-right: 4px;' onclick='bbstyle(22)' onmouseover=\"helpline(\'st\')\">";

            //Add Mono Button
            window["m_help"] = "Monospaced text (inline code): [mono]text[/mono] (alt+m)";
            container.innerHTML += "<input type='button' name='addbbcode24' accesskey='m' value='Mono' style='font-family: monospace; margin-right: 4px;' onclick='bbstyle(24)' onmouseover=\"helpline(\'m\')\">";

            //Add Horizontal Rule Button
            window["h_help"] = "Horizontal rule: content[hr]content (alt+h)";
            container.innerHTML += "<input type='button' accesskey='h' value='[hr]' style='margin-right: 4px;' onclick='bbsymbol(this.value)' onmouseover=\"helpline(\'h\')\">";

            //Add Center Button
            window["j_help"] = "Centered text (inline code): [center]text[/center] (alt+j)";
            container.innerHTML += "<input type='button' name='addbbcode26' accesskey='j' value='Center' style='text-align: center; margin: 4px 4px 0 0;' onclick='bbstyle(26)' onmouseover=\"helpline(\'j\')\">";

            //Add Rainbow Button
            window["r_help"] = "Rainbow text (inline code): [rainbow]text[/rainbow] (alt+r)";
            container.innerHTML += "<input type='button' name='addbbcode28' class='rainbow-button' accesskey='r' value='✨RAINBOW✨' onclick='bbstyle(28)' onmouseover=\"helpline(\'r\')\">";

            //Add Sup Button
            window["sup_help"] = "Superscript text (inline code): [sup]text[/sup] (alt+k)";
            container.innerHTML += "<input type='button' name='addbbcode30' accesskey='k' value='Sup' style='margin: 4px 4px 8px 0;padding-bottom: 9px; vertical-align: super; font-size: smaller;' onclick='bbstyle(30)' onmouseover=\"helpline(\'sup\')\">";

            //Add Sub Button
            window["sub_help"] = "Subscript text (inline code): [sub]text[/sub] (alt+g)";
            container.innerHTML += "<input type='button' name='addbbcode32' accesskey='g' value='Sub' style='margin: 4px 4px 0 0; padding-top: 9px; vertical-align: sub; font-size: smaller;' onclick='bbstyle(32)' onmouseover=\"helpline(\'sub\')\">";

            //Add MD5 Button
            window["v_help"] = "MD5 hashing (inline code): [md5]text[/md5] (alt+v)";
            container.innerHTML += "<input type='button' name='addbbcode34' accesskey='v' value='MD5' style='margin: 4px 4px 0 0;' onclick='bbstyle(34)' onmouseover=\"helpline(\'v\')\">";

            //Add Reverse Button
            window["z_help"] = "Reverse text (inline code): [reverse]text[/reverse] (alt+z)";
            container.innerHTML += "<input type='button' name='addbbcode36' accesskey='z' value='Reverse' style='margin: 4px 4px 0 0;' onclick='bbstyle(36)' onmouseover=\"helpline(\'z\')\">";

            //Add Serif Button
            window["x_help"] = "Serif text (inline code): [serif]text[/serif] (alt+x)";
            container.innerHTML += "<input type='button' name='addbbcode38' accesskey='z' value='Serif' style='font-family: serif; margin: 4px 4px 0 0;' onclick='bbstyle(38)' onmouseover=\"helpline(\'x\')\">";

            //Add Sans Button
            window["n_help"] = "Sans-serif text (inline code): [sans]text[/sans] (alt+n)";
            container.innerHTML += "<input type='button' name='addbbcode40' accesskey='n' value='Sans' style='font-family: sans-serif; margin: 4px 4px 0 0;' onclick='bbstyle(40)' onmouseover=\"helpline(\'n\')\">";

            document.querySelector(".code-buttons:first-child").appendChild(container);

            //Add header style dropdown
            window["he_help"] = "Header style: [h1]text[/h1]";
            var headerContainer = document.createElement('span');
            headerContainer.innerHTML = "Header style: <select name='addbbcode42' onchange=\"bbfontstyle('[h' + this.selectedIndex + ']', '[/h' + this.selectedIndex + ']');this.selectedIndex=0;\" onmouseover=\"helpline(\'he\')\"><option value='Default' selected>Default</option><option value='h1'>h1</option><option value='h2'>h2</option><option value='h3'>h3</option><option value='h4'>h4</option><option value='h5'>h5</option><option value='h6'>h6</option></select>";
            //Insert it before 'Close Tags'
            DOMInsertLoc = document.querySelector(".code-buttons:nth-of-type(2)");
            DOMInsertLoc.insertBefore(headerContainer, DOMInsertLoc.lastChild.previousSibling);
        });

        //Add color picker for color tag in post editor
        var i = document.createElement("input");
        i.type = "color";
        i.setAttribute("onchange", "bbfontstyle('[color=' + this.value + ']', '[/color]');");
        i.setAttribute("onmouseover", "helpline('s')");
        document.getElementsByName("addbbcode19")[0].parentElement.appendChild(i);

        //new emoji table
        var emojiTbl = document.createElement("table");

        var emojisArr = [[":)", "icon_smile.gif", "Smile"], [":(", "icon_sad.gif", "Sad"], [":D", "icon_biggrin.gif", "Very Happy"], [":o", "icon_eek.gif", "Surprised"], [":?", "icon_confused.gif", "Confused"], ["8)", "icon_cool.gif", "Cool"], [":lol:", "icon_lol.gif", "Laughing"], [":x", "icon_mad.gif", "Mad"], [":P", "icon_razz.gif", "Razz"], [":evil:", "icon_twisted.gif", "Evil or Very Mad"], [":roll:", "icon_rolleyes.gif", "Rolling Eyes"], [":wink:", "icon_wink.gif", "Wink"], [":wacko:", "wacko.gif", "Wacko"], [":|", "icon_neutral.gif", "Neutral"], [":sleep:", "sleep.gif", "Sleep"], [":blink:", "blink.gif", "Blink"], [":cry:", "crying.gif", "Crying"], [":dry:", "dry.gif", "Dry"], [":unsure:", "unsure.gif", "Unsure"], ["@_@", "icon_shock.gif", "Shock"], [":73:", "73.gif", "TI-73"], [":83p:", "83p.gif", "TI-83+"], [":86:", "86.gif", "TI-86"], [":83pse:", "83pse.gif", "TI-83+ SE"], [":84pse:", "84pse.gif", "TI-84+ SE"], [":84p:", "84p.gif", "TI-84+"], [":89:", "89.gif", "TI-89"], [":89ti:", "89ti.gif", "TI-89 Titanium"], [":!:", "icon_exclaim.gif", "Exclamation"], [":?:", "icon_question.gif", "Question"], [":arrow:", "icon_arrow.gif", "Arrow"], [":altevil:", "icon_evil.gif", "Evil 2"], [":mrgreen:", "icon_mrgreen.gif", "Mr Green"], [":redface:", "icon_redface.gif", "Red Face"], [":altsurprised:", "icon_surprised.gif", "Surprised 2"], [":shock:", "shock.gif", "Shock 2"], [":idea:", "icon_idea.gif", "Idea"], [":thumbsup:", "goodidea.gif", "Thumbs Up"], [":thumbsdown:", "badidea.gif", "Thumbs Down"], [":dcs7:", "dcs7_chevron.png", "Doors CS 7"], ["j/k", "jksmilie.gif", "Just Kidding"], [":calc:", "calc.gif", "Graphing Calculator"], [":84pce:", "84pce.gif", "TI-84+ CE"], ["owo", "owo.png", "Smiling Cat"]];

        var emojiCon = "<tbody style='display: table-header-group;'><tr align='center'><td colspan='4'><b>Emoticons</b></td>";
        emojisArr.forEach(function (index, i) {
            if (!(i % 4)) {
                emojiCon += "</tr>";
                if (i === 20) emojiCon += "</tbody><tbody id='moreEmoji' class='hiddenEmoji'>";
                emojiCon += "<tr align='center'>";
            }
            emojiCon += "<td width='25%'><a href=\"javascript:emoticon('" + index[0] + "')\"><img src='images/smiles/" + index[1] + "' alt='" + index[2] + "' title='" + index[2] + "'></a></td>";
        });
        emojiCon += "</tbody><tr align='center'><td colspan='4'><a class='cursor-pointer' onclick='document.getElementById(\"moreEmoji\").classList.toggle(\"hiddenEmoji\"); this.textContent = this.textContent.replace(/(more|less)/g,$1=>$1===\"more\"?\"less\":\"more\");'>View more emoticons</a></td></tr>";
        emojiTbl.style = "margin: auto; width: 160px";
        emojiTbl.innerHTML = emojiCon;
        //Replace old emoji table
        const loc = document.querySelector("#page_content_parent > form > div.mainbody > div > table > tbody");
        loc.querySelector("tr:nth-child(3) > td.row1").firstElementChild.replaceWith(emojiTbl);
        loc.querySelector("tr:nth-child(3) > td.row2 > div:nth-child(5)").style.marginBottom = "10px";
        document.querySelector("#page_content_parent > div:nth-child(7) > div > iframe").width = "99%";
        //Add placeholder texts
        document.getElementsByName("subject")[0].placeholder = "Subject";
        document.getElementsByName("message")[0].placeholder = "Message Body";

        //Remove some useless junk
        loc.querySelector("tr:nth-child(2) > td.row1").textContent = "";
        loc.querySelector("tr:nth-child(4) > td.row1").innerHTML = "";
    }
}


//Restyle UTI pages
if (location.href.includes("cemetech.net/projects/uti")) {
    var style = document.createElement("style");
    style.innerHTML = "tr>th{border-bottom: 1px solid #254e6f !important;}section.sidebar__section,div.mainlowermiddle,div.mainheadmiddle,div#hbot,.mainbody{background:#254e6f !important;}.sidebar__section,#hbot{border: 2px solid #19364d}a{color: #222}a:hover{color:#34498B}.maintitle:hover,.sidebar__section-body a:hover,.sidebar__section-header a:hover{color: white}.navsearchinput{background:#34498B !important;}img[src*='lang_english'],.navsearchsubmit{filter:hue-rotate(194deg);}.sax-message a{background:#1c264a}";
    document.body.append(style);
}
