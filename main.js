let selectedCharsets = {
  includeUpperCase: false,
  includeLowerCase: false,
  includeNumbers: false,
  includeSymbols: false,
};

function handleSelectedCharsetsChange(event) {
  const { target } = event;
  selectedCharsets[target.name] = target.checked;
}
