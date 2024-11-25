class Grimoire {
  constructor() {
    this.spells = [];
  }

  pathToSpellList() {
    return '../data/spells.json';
  }
  
  renderSpellList(target) {
    console.log("Rendering spell list...");
    function renderSpellEntry(spell) {
        let spellEntryWarpper = document.createElement("a");
        spellEntryWarpper.href = `/html/spells/${spell.link}.html`;
        let spellEntry = document.createElement("div");
        spellEntry.className = "spell-entry";
        let spellName = document.createElement("div");
        spellName.className = "spell-name";
        let spellDesc = document.createElement("div");
        spellDesc.className = "spell-desc";
        spellName.innerHTML = spell.name;
        spellDesc.innerHTML = spell.description;
        spellEntry.appendChild(spellName);
        spellEntry.appendChild(spellDesc);
        spellEntryWarpper.appendChild(spellEntry);
        return spellEntryWarpper;
    }
    let path = this.pathToSpellList();
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        data.spells.forEach((spell) => {
            target.appendChild(renderSpellEntry(spell));
        })
      })
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let grimoire = new Grimoire();
  grimoire.renderSpellList(document.querySelector("#spell-list"));
});