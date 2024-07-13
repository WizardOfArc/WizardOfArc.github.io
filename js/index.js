let woa_functions = {
    dummyTest: (words) => console.log(`Dummy testing ${words}`),
    loadJson: (filename) => {
        fetch(filename)
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
};

document.addEventListener("DOMContentLoaded", () => {
    woa_functions.dummyTest('I loaded the Doc');
    woa_functions.loadJson('./data/band_members.json');
})