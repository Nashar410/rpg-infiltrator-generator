let pnjs = [];


let keyPnj = null;

function addKeyPNJ() {
    keyPnj = {
        name: document.getElementById('keyName').value,
        avatar: document.getElementById('keyAvatar').value,
        maxIncredulity: parseInt(document.getElementById('maxIncredulity').value),
        currentIncredulity: parseInt(document.getElementById('currentIncredulity').value)
    };
    displayKeyPNJ();
}

function displayKeyPNJ() {
    const container = document.getElementById('pnjsContainer');

    const element = document.createElement('div');
    element.className = 'key-pnj';
    const borderColor = keyPnj.currentIncredulity === keyPnj.maxIncredulity ? 'red' : '#ccc';

    element.innerHTML = `
        <div class="pnj-avatar">
            <img src="${keyPnj.avatar}" alt="Avatar de ${keyPnj.name}" class="avatar">
        </div>
        <div class="pnj-info">
            <h3>${keyPnj.name}</h3>
            <p>Incrédulité: ${keyPnj.currentIncredulity}/${keyPnj.maxIncredulity}</p>
        </div>
    `;
    element.style.border = `2px solid ${borderColor}`;
    console.log('element', element)

    container.prepend(element);
}

function displayPNJs() {
    const container = document.getElementById('pnjsContainer');
    const oldPnjs = container.querySelectorAll('.pnj');
    oldPnjs.forEach(pnj => pnj.remove());
    pnjs.forEach((pnj, index) => {
        const element = document.createElement('div');
        element.className = 'pnj';
        const avatarClass = getAvatarClass(pnj);
        element.innerHTML = `
            <div class="pnj-avatar">
                <img src="${pnj.avatar}" alt="Avatar de ${pnj.name}" class="${avatarClass}">
            </div>
            <div class="pnj-info">
                <h3>${pnj.name}</h3>
                <div class="pnj-status">
                    <p>Confiance: ${pnj.currentTrust}/${pnj.maxTrust}</p>
                    <p>Suspicion: ${pnj.currentSuspicion}/${pnj.maxSuspicion}</p>
                </div>
                <div class="pnj-inputs">
                    <input type="number" value="${pnj.currentTrust}" onchange="updatePNJ(${index}, 'currentTrust', this.value)" />
                    <span> / ${pnj.maxTrust}</span>
                    <input type="number" value="${pnj.currentSuspicion}" onchange="updatePNJ(${index}, 'currentSuspicion', this.value)" />
                    <span> / ${pnj.maxSuspicion}</span>
                </div>
            </div>
        `;
        container.appendChild(element);
    });
}


function addPNJ() {
    const pnj = {
        name: document.getElementById('name').value,
        avatar: document.getElementById('avatar').value,
        maxTrust: parseInt(document.getElementById('maxTrust').value),
        currentTrust: parseInt(document.getElementById('currentTrust').value),
        maxSuspicion: parseInt(document.getElementById('maxSuspicion').value),
        currentSuspicion: parseInt(document.getElementById('currentSuspicion').value)
    };
    pnjs.push(pnj);
    displayPNJs();
}




function getAvatarClass(pnj) {
    console.log(pnj)
    if (pnj.currentTrust === pnj.maxTrust) {
        console.log('pnj.currentTrust === pnj.maxTrust', pnj.currentTrust === pnj.maxTrust)
        return 'avatar trust-max';
    } else if (pnj.currentSuspicion === pnj.maxSuspicion) {
        console.log('pnj.currentSuspicion === pnj.maxSuspicion', pnj.currentSuspicion === pnj.maxSuspicion)
        return 'avatar suspicion-max';
    } else if (pnj.currentTrust > pnj.maxTrust / 2) {
        console.log('pnj.currentTrust > pnj.maxTrust', pnj.currentTrust > pnj.maxTrust /2)
        return 'avatar trust-high';
    } else if (pnj.currentSuspicion > pnj.maxSuspicion / 2) {
        console.log('pnj.currentSuspicion > pnj.maxSuspicion', pnj.currentSuspicion > pnj.maxSuspicion/2)
        return 'avatar suspicion-high';
    }
    return 'avatar';
}


function updatePNJ(index, key, value) {
    pnjs[index][key] = parseInt(value);
    displayPNJs();
}

function generateHTML() {
    const css = `.me-pnj-container { display: flex; flex-wrap: wrap; align-items: flex-start; }` +
                `.me-key-pnj { width: 100%}` +
                `.me-pnj { width: calc(33.33% - 22px); }` + // Adjusting width for three PNJs per line
                `.me-key-pnj, .me-pnj { margin: 10px; padding: 10px; border-radius: 5px; border: 2px solid #ccc; display: flex; align-items: center; }` +
                `.me-pnj-avatar img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }` +
                `.me-pnj-info { margin-left: 10px; }` +
                `.me-pnj-info h3 { margin-top: 0; margin-bottom: 5px; }` +
                `.me-pnj-status, .me-pnj-inputs { font-size: 0.8rem; }` +
                `.trust-max { border-color: green; }` +
                `.suspicion-max { border-color: red; }`;

    let pnjHtml = '';
    if (keyPnj) {
        pnjHtml += `<div class="me-key-pnj"><div class="me-pnj-avatar"><img src="${keyPnj.avatar}" alt="Avatar de ${keyPnj.name}" class="avatar"></div>` +
                   `<div class="me-pnj-info"><h3>${keyPnj.name}</h3><p>Incrédulité: ${keyPnj.currentIncredulity}/${keyPnj.maxIncredulity}</p></div></div>`;
    }

    pnjHtml += pnjs.map(pnj => {
        const borderColor = pnj.currentTrust === pnj.maxTrust ? 'green' : (pnj.currentSuspicion === pnj.maxSuspicion ? 'red' : '#ccc');
        return `<div class="me-pnj" style="border-color: ${borderColor};"><div class="me-pnj-avatar"><img src="${pnj.avatar}" alt="Avatar de ${pnj.name}" class="avatar"></div>` +
               `<div class="me-pnj-info"><h3>${pnj.name}</h3><div class="me-pnj-status"><p>Confiance: ${pnj.currentTrust}/${pnj.maxTrust}</p>` +
               `<p>Suspicion: ${pnj.currentSuspicion}/${pnj.maxSuspicion}</p></div></div></div>`;
    }).join('');

    const styleTag = `<style>${css}</style>`;
    const outputHtml = `${styleTag}<div class="me-pnj-container">${pnjHtml}</div>`;

    document.getElementById('exportHtml').value = outputHtml.replace(/\s\s+/g, ' '); // Minimize space and format in one line
}


function getBorderColor(pnj) {
    if (pnj.currentTrust === pnj.maxTrust) {
        return 'green'; // Couleur pour la confiance maximale
    } else if (pnj.currentSuspicion === pnj.maxSuspicion) {
        return 'red'; // Couleur pour la suspicion maximale
    } else {
        return '#ccc'; // Couleur neutre
    }
}


// Fonction pour importer les PNJ depuis le code HTML collé
function importHTML() {
    const importField = document.getElementById('importHtml').value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(importField, 'text/html');

    // Clear existing PNJs
    pnjs = [];
    keyPnj = null;

    // First check for the key PNJ
    const keyPnjElement = doc.querySelector('.me-key-pnj');
    if (keyPnjElement) {
        keyPnj = parsePnj(keyPnjElement, true);
    }

    // Now handle other PNJs
    const pnjElements = doc.querySelectorAll('.me-pnj');
    pnjElements.forEach(element => {
        if (element !== keyPnjElement) { // Make sure not to re-import the key PNJ
            pnjs.push(parsePnj(element, false));
        }
    });

    // Refresh display
    displayKeyPNJ(); // Update display for key PNJ
    displayPNJs(); // Update display for other PNJs
}

function parsePnj(element, isKey) {
    const avatar = element.querySelector('img').src;
    const name = element.querySelector('h3').innerText;
    const stats = element.querySelectorAll('p');

    const statInfo = stats[0].innerText.match(/(\d+)\/(\d+)/);
    const currentStat = parseInt(statInfo[1], 10);
    const maxStat = parseInt(statInfo[2], 10);

    const pnj = {
        name: name,
        avatar: avatar,
        maxTrust: isKey ? null : maxStat, // For normal PNJs
        currentTrust: isKey ? null : currentStat, // For normal PNJs
        maxSuspicion: isKey ? null : (stats.length > 1 ? parseInt(stats[1].innerText.match(/(\d+)\/(\d+)/)[2], 10) : null),
        currentSuspicion: isKey ? null : (stats.length > 1 ? parseInt(stats[1].innerText.match(/(\d+)\/(\d+)/)[1], 10) : null),
        maxIncredulity: isKey ? maxStat : null, // Only for key PNJ
        currentIncredulity: isKey ? currentStat : null // Only for key PNJ
    };
    return pnj;
}



function toggleForms() {
    var formsContainer = document.getElementById('formsContainer');
    if (formsContainer.style.display === 'none') {
        formsContainer.style.display = 'block'; // Affiche les formulaires
        document.getElementById('toggleFormsButton').textContent = 'Cacher Création des PNJ'; // Change le texte du bouton
    } else {
        formsContainer.style.display = 'none'; // Cache les formulaires
        document.getElementById('toggleFormsButton').textContent = 'Afficher Création des PNJ'; // Réinitialise le texte du bouton
    }
}


document.addEventListener('DOMContentLoaded', function() {
    displayPNJs();
});
