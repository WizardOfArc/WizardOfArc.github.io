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
            let link = document.createElement("a");
            link.className = "music-link";
            link.innerHTML = `${rowData.label} &lArr;`;
            link.href = rowData.url;
            link.target = "_blank";
            if(rowData.thumbnail){
                let thumbnail = document.createElement("img");
                thumbnail.src = rowData.thumbnail;
                thumbnail.className = "music-link-thumbnail";
                link.appendChild(thumbnail);
            }
            linkRow.appendChild(link);
            return linkRow;
        }
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

    renderBlogPosts(target) {
        console.log("rendering blog posts");
        function renderBlogPost(postData) {
            let post = document.createElement("div");
            post.className = "blog-post";
            let date = document.createElement("div");
            date.innerHTML = postData.woa_time;
            date.className = "post-date";
            let title = document.createElement("div");
            title.innerHTML = postData.title;
            title.className = "post-title";
            let headerPart = document.createElement("div");
            headerPart.className = "post-header";
            headerPart.appendChild(title);
            headerPart.appendChild(date);
            let postContent = document.createElement("div");
            postContent.className = "post-content";
            postData.content.forEach((paragraph) => {
                let p = document.createElement("p");
                p.innerHTML = paragraph;
                postContent.appendChild(p);
            })
            post.appendChild(headerPart);
            post.appendChild(postContent);
            return post;
        }
        let path = this.dataFilePath('blog_posts.json');
        fetch(path)
          .then((response) => response.json())
          .then((data) => {
            data.posts.forEach((post) => {
                target.appendChild(renderBlogPost(post));
            })
          });
    }

    renderFriends(target) {
        console.log("rendering friends");
        function renderFriendRow(rowData) {
            console.log("rendering friend row", rowData);
            let friendRow = document.createElement("div");
            friendRow.className = "friend-row";
            let friendName = document.createElement("div");
            friendName.className = "friend-name";
            friendName.innerHTML = rowData.name;
            let friendImg = document.createElement("img");
            friendImg.src = rowData.img;
            friendImg.className = "friend-img";
            let friendLink = document.createElement("a");
            friendLink.className = "friend-link";
            friendLink.href = rowData.url;
            let friendDesc = document.createElement("div");
            friendDesc.className = "friend-desc";
            friendDesc.innerHTML = rowData.description;
            let friendHeader = document.createElement("div");
            friendHeader.className = "friend-header";
            friendHeader.appendChild(friendImg);
            friendHeader.appendChild(friendName);
            friendRow.appendChild(friendHeader);
            friendRow.appendChild(friendDesc);
            friendLink.appendChild(friendRow)
            return friendLink;
        }

        let path = this.dataFilePath('friends_of_the_wizard.json');
        fetch(path)
          .then((response) => response.json())
          .then((data) => {
            data.friends.forEach((friend) => {
                target.appendChild(renderFriendRow(friend));
            })
          })
    }

    renderBandTable(target) {
        function renderBandRow(rowData) {
            let bandRow = document.createElement("div");
            bandRow.className = "band-row";
            if(rowData.img){
                let img = document.createElement("img");
                img.src = rowData.img;
                img.className = "band-img";
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
    let blogPosts = document.querySelector('#blog-posts');
    if(blogPosts) {
        woa_functions.renderBlogPosts(blogPosts);
    }
    let friends = document.querySelector('#friends-of-woa');
    if(friends) {
        woa_functions.renderFriends(friends);
    }
    woa_functions.renderComponent('.footer-container', 'footer');
    woa_functions.renderComponent('#about-woa', 'about-woa');
    woa_functions.renderComponent('#morphing', 'morphing');

})
