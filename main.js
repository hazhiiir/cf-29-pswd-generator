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
  let el = document.querySelector("#length-value-label");
  el.innerHTML = length;
}

function handleExcludeCharacters(event) {
  const { target } = event;
  excludeCharacters = target.value;
}

function generatePassword() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charset = "";

  let { includeLowerCase, includeUpperCase, includeNumbers, includeSymbols } =
    selectedCharsets;

  if (includeLowerCase) {
    charset += lowercase;
  }

  if (includeUpperCase) {
    charset += uppercase;
  }

  if (includeNumbers) {
    charset += numbers;
  }

  if (includeSymbols) {
    charset += symbols;
  }

  if (excludeCharacters) {
    charset = charset
      .split("")
      .filter(function (current) {
        return !excludeCharacters.includes(current);
      })
      .join("");
  }

  if (!charset) {
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * (charset.length - 1))];
  }

  console.log(password);
  return password;
}

function getPasswordStrength(password) {
  if (password.length < 8) {
    return {
      text: "Weak",
      color: "text-red-500",
      bg: "bg-red-500",
      width: "33%",
    };
  }
  if (password.length < 12) {
    return {
      text: "Medium",
      color: "text-yellow-500",
      bg: "bg-yellow-500",
      width: "66%",
    };
  }

  return {
    text: "Strong",
    color: "text-green-500",
    bg: "bg-green-500",
    width: "100%",
  };
}

function render(password) {
  const strength = getPasswordStrength(password);
  let renderedComponent = `
    <label class="block text-sm font-medium text-gray-700">Generated Password</label>
    <div class="relative">
      <input
        type="text"
        readOnly
        value='${password}'
        class="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Your password will appear here"
      />
    </div>
    
    <!-- {/* Password Strength */} -->
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">Strength:</span>
      <span class="text-sm font-medium ${strength.color}">${strength.text}</span>
      <div class="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          class="h-2 rounded-full transition-all duration-300 ${strength.bg}"
          style="width:${strength.width};"
        ></div>
      </div>
    </div>`;
  let el = document.querySelector("#dynamic-ui");
  el.innerHTML = renderedComponent;
}

function onGeneratePasswordClick() {
  let password = generatePassword();
  render(password);
}
