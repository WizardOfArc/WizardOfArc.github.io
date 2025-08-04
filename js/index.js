class Woa {
  constructor() {
    console.log("Woa instantiated - yes");
  }

  dataFilePath(fileName) {
    if (window.location.pathname === "/") {
      console.log("at root...");
      return `./data/${fileName}`;
    }
    return `../data/${fileName}`;
  }

  renderComponent(container, file) {
    console.log(`rendering ${file} in ${container}`);
    let targetElem = document.querySelector(container);
    if (!targetElem) {
      console.log(`${container} is not on this page`);
      return;
    }
    let path = "";
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      console.log("at root...");
      path = `./html/components/${file}.html`;
    } else {
      path = `./components/${file}.html`;
    }
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        targetElem.innerHTML = data;
      });
  }

  renderMusicLinks(target) {
    console.log("rendering music links");
    function renderLinkRow(rowData) {
      let linkRow = document.createElement("div");
      linkRow.className = "link-row";
      let link = document.createElement("a");
      link.className = "music-link";
      link.innerHTML = `${rowData.label}: `;
      link.href = rowData.url;
      link.target = "_blank";
      if (rowData.thumbnail) {
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

    let path = this.dataFilePath("music_links.json");
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        data.music_links.forEach((mLink) => {
          target.appendChild(renderLinkRow(mLink));
        });
      });
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
      });
      post.appendChild(headerPart);
      post.appendChild(postContent);
      return post;
    }
    let path = this.dataFilePath("blog_posts.json");
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        data.posts.forEach((post) => {
          target.appendChild(renderBlogPost(post));
        });
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
      friendLink.target = "_blank";
      let friendDesc = document.createElement("div");
      friendDesc.className = "friend-desc";
      friendDesc.innerHTML = rowData.description;
      let friendHeader = document.createElement("div");
      friendHeader.className = "friend-header";
      friendHeader.appendChild(friendImg);
      friendHeader.appendChild(friendName);
      friendRow.appendChild(friendHeader);
      friendRow.appendChild(friendDesc);
      friendLink.appendChild(friendRow);
      return friendLink;
    }

    let path = this.dataFilePath("friends_of_the_wizard.json");
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        data.friends.forEach((friend) => {
          target.appendChild(renderFriendRow(friend));
        });
      });
  }

  startCountdown() {
    console.log("Starting countdown");
    var intervalId = setInterval(updateCountdown, 1000);
    let targetDate = new Date("2025-12-03T00:00:00Z");
    let moLaDeireanach = new Date("2025-11-21T00:00:00Z");
    if (targetDate < new Date()) {
      daysContainer.innerHTML = "The countdown has ended!";
      clearInterval(intervalId);
      return;
    }
    function updateCountdown() {
      let now = new Date();
      let timeDiff = targetDate - now;
      let idirLaDeireanach = moLaDeireanach - now;
      if (timeDiff <= 0) {
        daysContainer.innerHTML = "The countdown has ended!";
        clearInterval(intervalId);
        return;
      }
      let millisInADay = 1000 * 60 * 60 * 24;
      let days = Math.floor(timeDiff / millisInADay);
      let laGoDeireadh = Math.floor(idirLaDeireanach / millisInADay);
      let obairCountDown = document.querySelector(".obair-countdown-number");
      let countdownNumber = document.querySelector(".countdown-number");
      /*
            let note = `Tá ${days} lá fágtha go dtí go bhfillfidh Azí ar Bhaile Átha Cliath`;
            */
      countdownNumber && (countdownNumber.innerHTML = days);
      obairCountDown & (obairCountDown.innerHTML = laGoDeireadh);
    }
  }

  startClock() {
    console.log("Starting clock");
    var intervalId = setInterval(updateClock, 1000);
    function updateClock() {
      let now = new Date();
      let day = now.getDate();
      let hours = now.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let seconds = now.getSeconds();
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let yearElement = document.querySelector("#digital-clock-year");
      let monthElement = document.querySelector("#digital-clock-month");
      let dayElement = document.querySelector("#digital-clock-day");
      let hoursElement = document.querySelector("#digital-clock-hours");
      let minutesElement = document.querySelector("#digital-clock-minutes");
      let secondsElement = document.querySelector("#digital-clock-seconds");
      yearElement && (yearElement.innerHTML = year);
      monthElement && (monthElement.innerHTML = month);
      dayElement && (dayElement.innerHTML = day);
      hoursElement && (hoursElement.innerHTML = hours);
      minutesElement && (minutesElement.innerHTML = minutes);
      secondsElement && (secondsElement.innerHTML = seconds);
    }
  }

  renderBandTable(target) {
    function renderBandRow(rowData) {
      let bandRow = document.createElement("div");
      bandRow.className = "band-row";
      if (rowData.img) {
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
    }
    let bandTable = document.createElement("div");
    bandTable.className = "band-table";
    let label = document.createElement("span");
    label.className = "members-label";
    label.innerHTML = "Members";
    target.appendChild(label);

    let path = this.dataFilePath("band_members.json");
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        data.members.forEach((member) => {
          bandTable.appendChild(renderBandRow(member));
        });
        target.appendChild(bandTable);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let woa_functions = new Woa();
  let bandMemberContainer = document.querySelector("#band-members");
  if (bandMemberContainer) {
    woa_functions.renderBandTable(bandMemberContainer);
  }
  let musicLinks = document.querySelector("#music-links");
  if (musicLinks) {
    woa_functions.renderMusicLinks(musicLinks);
  }
  let blogPosts = document.querySelector("#blog-posts");
  if (blogPosts) {
    woa_functions.renderBlogPosts(blogPosts);
  }
  let friends = document.querySelector("#friends-of-woa");
  if (friends) {
    woa_functions.renderFriends(friends);
  }
  woa_functions.renderComponent(".footer-container", "footer");
  woa_functions.renderComponent("#about-woa", "about-woa");
  woa_functions.renderComponent("#morphing", "morphing");
  woa_functions.renderComponent("#countdown", "countdown");
  woa_functions.renderComponent("#clock", "clock");
  woa_functions.startCountdown();
  woa_functions.startClock();
});

/**
 * mapping:
 *
 * space = &#x1680;
 *
 * b = &#x1681;
 * l = &#x1682;
 * f = &#x1683;
 * s = &#x1684;
 * n = &#x1685;
 *
 * h = &#x1686;
 * d = &#x1687;
 * t = &#x1688;
 * c (caol) = &#x1689;
 * q (c lathan) = &#x168a;
 *
 * m = &#x168b;
 * g (caol) = &#x168c;
 * g (lathan) = &#x168d;
 * x (st, tr, sw) = &#x168e;
 * r = &#x168f;
 *
 * a = &#x1690;
 * o = &#x1691;
 * u = &#x1692;
 * e = &#x1693;
 * i = &#x1694;
 *
 * p = &#169a;
 * >- = &#x169b;
 * -< = &#x169c;

 */
