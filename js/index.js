let woa_functions = {
    dummyTest: (words) => console.log(`Dummy testing ${words}`),
    loadJson: (filename) => {
        fetch(filename)
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    renderBandTable: (target) => {
        function renderBandRow(rowData) {
            let bandRow = document.createElement("div");
            bandRow.className = "band-row";
            let nameCell = document.createElement("div");
            nameCell.className = "name-cell";
            nameCell.innerHTML = rowData.name;
            let instrumentList = document.createElement("div");
            instrumentList.className = "instrument-list";
            instrumentList.innerHTML = rowData.instruments.join(", ");
            bandRow.appendChild(nameCell);
            bandRow.appendChild(instrumentList);
            return bandRow;
        };
        let bandTable = document.createElement("div");
        bandTable.className = "band-table"
        let label = document.createElement("span");
        label.className = "members-label";
        label.innerHTML = "Members";
        target.appendChild(label);

        fetch('./data/band_members.json')
          .then((response) => response.json())
          .then((data) => {
                data.members.forEach( (member) => {
                    bandTable.appendChild(renderBandRow(member));
                });
                target.appendChild(bandTable);
          })
    },
    renderComponent: (container, file) => {
        let path = '';
        if(window.location.pathname === '/'){
            console.log('at root...');
            path = `./html/${file}`;
        } else {
            path = `./${file}`;
        }
        fetch(path)
        .then((response) => response.text())
        .then((data) => {
           document.querySelector(container).innerHTML = data;
        })
    },
};

document.addEventListener("DOMContentLoaded", () => {
    woa_functions.dummyTest('I loaded the Doc');
    let bandMemberContainer = document.querySelector('#band-members');
    if(bandMemberContainer) {
        woa_functions.renderBandTable(bandMemberContainer);
    }
    console.log(`You are here: ${window.location.pathname}`);
    woa_functions.renderComponent('.footer-container', 'footer.html');
})
