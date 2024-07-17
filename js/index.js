class Woa {
    constructor() {
        console.log("Woa instantiated");
    };

    dataFilePath(fileName) {
        if(window.location.pathname === '/'){
            console.log('at root...');
            return `./data/${fileName}`;
        }
        return `../data/${fileName}`;
    }

    renderComponent(container, file) {
        console.log(`rendering ${file} in ${container}`);
        let targetElem = document.querySelector(container);
        if (!targetElem){
            console.log(`${container} is not on this page`);
            return;
        }
        let path = '';
        if(window.location.pathname === '/' || window.location.pathname === '/index.html'){
            console.log('at root...');
            path = `./html/components/${file}.html`;
        } else {
            path = `./components/${file}.html`;
        }
        fetch(path)
        .then((response) => response.text())
        .then((data) => {
           targetElem.innerHTML = data;
        })
    }

    renderMusicLinks(target) {
        console.log("rendering music links");
        function renderLinkRow(rowData) {
            let linkRow = document.createElement("div");
            linkRow.className = "link-row";
            if(rowData.thumbnail){
                let thumbnail = document.createElement("img");
                thumbnail.src = rowData.thumbnail;
                linkRow.appendChild(thumbnail);
            }
            let link = document.createElement("a");
            link.className = "music-link";
            link.innerHTML = rowData.label;
            link.href = rowData.url;
            link.target = "_blank";
            linkRow.appendChild(link);
            return linkRow;
        }
        let musicLinkTable = document.createElement("div");
        musicLinkTable.className = "music-link-table";
        let label = document.createElement("span");
        label.className = "music-link-label";
        let linkHeading = document.createElement("h1");
        linkHeading.innerHTML = "Music Links";
        target.appendChild(linkHeading);

        let path = this.dataFilePath('music_links.json');
        fetch(path)
          .then((response) => response.json())
          .then((data) => {
            data.music_links.forEach((mLink) => {
                target.appendChild(renderLinkRow(mLink));
            })
          }
        )
    }

    renderBandTable(target) {
        function renderBandRow(rowData) {
            let bandRow = document.createElement("div");
            bandRow.className = "band-row";
            if(rowData.img){
                let img = document.createElement("img");
                img.href = rowData.img;
                bandRow.appendChild(img);
            }
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

        let path = this.dataFilePath('band_members.json'); 
        fetch(path)
          .then((response) => response.json())
          .then((data) => {
                data.members.forEach( (member) => {
                    bandTable.appendChild(renderBandRow(member));
                });
                target.appendChild(bandTable);
          })
    }
};          

document.addEventListener("DOMContentLoaded", () => {
    let woa_functions = new Woa();
    let bandMemberContainer = document.querySelector('#band-members');
    if(bandMemberContainer) {
        woa_functions.renderBandTable(bandMemberContainer);
    }
    let musicLinks = document.querySelector('#music-links');
    if(musicLinks) {
        woa_functions.renderMusicLinks(musicLinks);
    }
    woa_functions.renderComponent('.footer-container', 'footer');
    woa_functions.renderComponent('#about-woa', 'about-woa');
    woa_functions.renderComponent('#morphing', 'morphing');

})
