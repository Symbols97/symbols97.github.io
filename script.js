const storage_cells = {

  logic: {
    items: {
      gold: 1,
      silicon: 1,
      redstone: 1
    }
  },
  calculation: {
    items: {
      certus_quartz: 1,
      silicon: 1,
      redstone: 1
    }
  },
    engineering: {
    items: {
      diamond: 1,
      silicon: 1,
      redstone: 1
    }
  },
    quartz_glass: {
    items: {
      certus_quartz: 5,
      glass: 4
    }
  },
  onek: {
    storage_cells: {
      logic: 1
    },
    items: {
      redstone: 4,
      certus_quartz: 4,
    }
  },
  fourk: {
    storage_cells: {
      onek: 3,
      quartz_glass: 1,
      calculation: 1
    },
    items: {
      redstone: 4
    }
  },
    sixteenk: {
    storage_cells: {
      fourk: 3,
      quartz_glass: 1,
      calculation: 1
    },
    items: {
      glowstone: 4
    }
  },
      sixtyfourk: {
    storage_cells: {
      sixteenk: 3,
      quartz_glass: 1,
      calculation: 1
    },
    items: {
      glowstone: 4
    }
  },
      twofiftysixk: {
    storage_cells: {
      sixtyfourk: 3,
      quartz_glass: 1,
      calculation: 1
    },
    items: {
      sky_stone: 4
    }
  }
};

function isNoRadioButtonSelected() {
  var selected = document.querySelector('input[name="cell"]:checked');
  var inputField = document.getElementById("quantity");
  const inputValue = inputField.value.trim();
  if (selected === null) {
    // No radio button is selected
      document.getElementById("warning").textContent = "Please select a storage cell size.";
    return true;
  } 
  
  else if (inputValue === '' ) {
 document.getElementById("warning").textContent = "Please input an amount";
    return true;
  }
  else {
    doMath();
    return false;
  }
}

function resolveMaterial(materialName, multiplier = 1, result = {}) {
  const material = storage_cells[materialName];

  // Resolve base components
  if (material.items) {
    for (const [item, amount] of Object.entries(material.items)) {
      result[item] = (result[item] || 0) + amount * multiplier;
    }
  }

  // Resolve nested materials
  if (material.storage_cells) {
    for (const [nestedName, nestedMultiplier] of Object.entries(material.storage_cells)) {
      resolveMaterial(
        nestedName,
        nestedMultiplier * multiplier,
        result
      );
    }
  }

  return result;
}

function doMath(){
const selectedRadio = document.querySelector('input[name="cell"]:checked');
var inputField = document.getElementById("quantity");
const inputValue = inputField.value.trim();
var result;
switch (selectedRadio.value){
case "1k" : 
  result = resolveMaterial("onek", inputValue);
  print(result);
  
  break;
case "4k" : 
  result = resolveMaterial("fourk", inputValue);
 print(result);
  break;
  case "16k" : 
result = resolveMaterial("sixteenk", inputValue);
 print(result);
  break;
  case "64k" : 
result = resolveMaterial("sixtyfourk", inputValue);
 print(result);
  break;
  case "256k" : 
result = resolveMaterial("twofiftysixk", inputValue);
  print(result);
  break;

}
}

function titleCase(str) {
  return str
    .replace(/_/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function print(result) {
  const container = document.getElementById("materialList");

  // Clear previous output
  container.innerHTML = "";

  const ul = document.createElement("ul");

  for (const [item, amount] of Object.entries(result)) {
  const li = document.createElement("li");
  li.textContent = `${titleCase(item)}: ${amount}`;
  ul.appendChild(li);
}


  container.appendChild(ul);
}

