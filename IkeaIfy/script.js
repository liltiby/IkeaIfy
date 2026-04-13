var link = ['https://www.google.com/search?q=ikea&oq=ikea&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyFggBEC4YgwEYxwEYsQMYyQMY0QMYgAQyDggCEEUYJxg7GIAEGIoFMhMIAxAuGK8BGMcBGLEDGIAEGI4FMhAIBBAuGK8BGMcBGLEDGIAEMg0IBRAAGIMBGLEDGIAEMg0IBhAAGJIDGIAEGIoFMgYIBxBFGD3SAQc2MDdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8',
    'https://www.ikea.com/nl/nl/',
    'https://thecozycook.com/swedish-meatball-recipe/',
    'https://scp-wiki.wikidot.com/scp-3008',
    'https://www.youtube.com/watch?v=0h8vAGCiRX0',
    'https://nl.wikipedia.org/wiki/IKEA',
    'https://www.ikea.com/nl/nl/p/blahaj-pluchen-speelgoed-baby-haai-20540663/?utm_source=google&utm_medium=organic-shopping&utm_campaign=shopping_feed&utm_content=free_google_shopping_clicks_Children%27sIKEA',
    'https://www.recipetineats.com/swedish-meatballs/',
    'https://studyinsweden.se/moving-to-sweden/learn-swedish/',
    'https://www.google.com/aclk?sa=L&ai=DChsSEwiyhaehmceTAxVWpYMHHdN9J3sYACICCAEQARoCZWY&co=1&ase=2&gclid=CjwKCAjwvqjOBhAGEiwAngeQnaqS6f_3vrFiM7gCLvztpMA0nfAjLJwfjYSVGomz_uI2XQyM1EmUehoCb5EQAvD_BwE&cce=2&category=acrcp_v1_32&sig=AOD64_2jTCQq7uDu99OZF6_JIWMCMiLBlQ&q&nis=4&adurl&ved=2ahUKEwiZ0J6hmceTAxXc1AIHHdC_Nt0Q0Qx6BAgQEAE'
]
var title
function init(node) {
    if (window.location.href.includes('.wikipedia') == true && node.nodeName === "SPAN" && node.classList.contains("mw-page-title-main")) {
        title = node.textContent
        console.log(title)
        console.log("=====================")
        node.textContent = "ikea"
    }
    else
        node.childNodes.forEach(init)
}
var url = chrome.runtime.getURL("ikeaLogo/ikea.png");
function repl(node) {
    if (!window.location.href.includes(".ikea")) {
        try {
            if (node.nodeName === "IMG" && node.src !== url) {
                node.src = url;
            }
            const style = getComputedStyle(node);
            if (style.backgroundImage && style.backgroundImage !== "none") {
                node.style.backgroundImage = `url(${url})`;
            }
            if (node.nodeName === "A" && node.href !== 'https://www.ikea.com' && !node.href.includes('.wikipedia')) {
                node.href = 'https://www.ikea.com/nl/nl/';
            }
            if (title && (node.nodeType === Node.TEXT_NODE || ["P", "B", "SPAN"].includes(node.nodeName))) {
                let replacement = "ikea";
                let regex = new RegExp(regx(title), "gi")
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = node.nodeValue.replace(regex, replacement);
                } else {
                    node.textContent = node.textContent.replace(regex, replacement);
                }
            }
            node.childNodes.forEach(repl);
        } catch { }
    }
}
init(document.body)

setInterval(function () {
    try {
        repl(document.body);
    }
    catch { }
}, 10);

setInterval(function () {
    let r1 = Math.floor(Math.random() * 500)
    let r2 = Math.floor(Math.random() * 500)
    let r3 = Math.floor(Math.random() * (link.length - 1))
    if (r1 == r2) {
        window.location.href = link[r3]
        console.log("ads :D | " + r1)
    }
}, 1000);
function regx(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log("Ikea-Inator: V1.18")
