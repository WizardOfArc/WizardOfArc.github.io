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
            let instrumentList = document.createElement("div");
            instrumentList.className = "instrument-list";
            instrumentList.innerHTML = rowData.instruments.join(", ");
            bandRow.appendChild(nameCell);
            bandRow.appendChild(instrumentList);
            return bandRow;
        };
        let bandTable = document.createElement("div");
        let label = document.createTextNode("Members");
        bandTable.appendChild(label);

        fetch('./data/band_members.json')
          .then((response) => response.json())
          .then((data) => {
                data.members.forEach( (member) => {
                    bandTable.appendChild(renderBandRow(member));
                });
                target.appendChild(bandTable);
          })
    },
};

document.addEventListener("DOMContentLoaded", () => {
    woa_functions.dummyTest('I loaded the Doc');
    let bandMemberContainer = document.querySelector('#band-members');
    woa_functions.renderBandTable(bandMemberContainer);
})
