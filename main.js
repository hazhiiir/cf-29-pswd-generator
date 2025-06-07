let selectedCharsets = {
  includeUpperCase: false,
  includeLowerCase: false,
  includeNumbers: false,
  includeSymbols: false,
};

let length = 4;
let excludeCharacters = "";

function handleSelectedCharsetsChange(event) {
  const { target } = event;
  selectedCharsets[target.name] = target.checked;
}

function handleLengthChange(event) {
  const { target } = event;
  length = parseInt(target.value);
}

function handleExcludeCharacters(event) {
  const { target } = event;
  excludeCharacters = target.value;
}
