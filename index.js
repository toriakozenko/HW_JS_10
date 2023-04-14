// Task "Arrow to Functions"



// Task "createPerson"
function createPerson(name, surname) {
  return {
    name,
    surname,
    getFullName() {
      if (this.fatherName) return `${this.name} ${this.surname} ${this.fatherName}`;
      return `${this.name} ${this.surname}`
    }
  }
}


// Task "createPersonClosure"
function createPersonClosure(name, surname) {
  let age = 0;
  let fatherName = "";
  function getName() {
    return name;
  }
  function getSurname() {
    return surname;
  }
  function getFatherName() {
    return fatherName;
  }
  function getAge() {
    return age;
  }
  function getFullName() {
    return `${surname} ${name} ${fatherName}`;
  }


  function setName(newName) {
    if (typeof newName === 'string' && newName[0] === newName[0].toUpperCase()) {
      name = newName;
    }
    return name;
  }
  function setSurname(newSurname) {
    if (typeof newSurname === 'string' && newSurname[0] === newSurname[0].toUpperCase()) {
    surname = newSurname;
  }
    return surname;
  }
  function setFatherName(newFatherName) {
    if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName[0].toUpperCase()) {
      fatherName = newFatherName;
    }
    return fatherName;
  }
  function setAge(newAge) {
    const parseAge = parseInt(newAge);
    if(parseAge <= 0 && parseAge >= 100) {
      return age;
    } else {
      age = parseAge;
    }
    return age;
  }
  function setFullName(newFullName) {
    const names = newFullName.split(' ');
    if (names.length === 3) {
      const [newSurname, newName, newFatherName] = names;
      setName(newName);
      setSurname(newSurname);
      setFatherName(newFatherName);
    }
    return getFullName();
  }
  return {
    getName,
    setName,
    getSurname,
    setSurname,
    getFatherName,
    setFatherName,
    getAge,
    setAge,
    getFullName,
    setFullName,
  };
}


//Task "createPersonClosureDestruct"
function createPerson({name = "Вася", surname = "Пупкін"}) {
  return {
    name,
    surname,
    getFullName() {
      if (this.fatherName) return `${this.name} ${this.surname} ${this.fatherName}`;
      return `${this.name} ${this.surname}`
    }
  }
}


// Task "isSorted"
function isSorted(...arguments) {
  for (let i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] !== "number" || arguments[i] <= arguments[i - 1]) {
      return false;
    }
  }
  return true;
}


// Task "Test is Sorted"
function isSorted() {
  const arr = [];
  while (true) {
    // const question = prompt("Enter some text:");
    if (question === null || question === "") {
      break;
    }
    arr.push(+question);
  }
  for (let i = 1; i < arr.length; i++) {
    if (isNaN(arr[i]) || arr[i] <= arr[i - 1]) {
      return false;
    }
  }
  return true;
}



//Task "personForm"
const personObj = createPersonClosure("Ганна", "Іванова");
personObj.setAge(15);
personObj.setFullName("Петрова Ганна Миколаївна");

function personForm(parent, person){
  const domElement = document.getElementById(parent);

  const nameInput = document.createElement("input");
  const surnameInput = document.createElement("input");
  const fatherNameInput = document.createElement("input");
  const ageInput = document.createElement("input");
  ageInput.type = "number";
  const fullNameInput = document.createElement("input");
  
  nameInput.value = person.getName();
  surnameInput.value = person.getSurname();
  fatherNameInput.value = person.getFatherName();
  ageInput.value = person.getAge();
  fullNameInput.value = person.getFullName();
  
  domElement.appendChild(surnameInput);
  domElement.appendChild(nameInput);
  domElement.appendChild(fatherNameInput);
  domElement.appendChild(ageInput);
  domElement.appendChild(fullNameInput);

  nameInput.oninput = (event) => {
    person.setName(event.target.value);
    nameInput.value = person.getName();
  };

  surnameInput.oninput = (event) => {
    person.setSurname(event.target.value);
    surnameInput.value = person.getSurname();
  }

  fatherNameInput.oninput = (event) => {
    person.setFatherName(event.target.value);
    fatherNameInput.value = person.getFatherName();
  }
  
  ageInput.oninput = (event) => {
    person.setAge(event.target.value);
    ageInput.value = person.getAge();
  }
  
  fullNameInput.oninput = (event) => {
    person.setFullName(event.target.value);
    fullNameInput.value = person.getFullName();
  }
}
personForm("personForm", personObj);



//Task "getSetForm"

function getSetForm(parent, person) {
  const domElement = document.getElementById(parent);
  const reestr = {};
  

  for (const key in person) {
    const name = key.substring(3);
    
    if (key.slice(0, 3) === "get" && !reestr.key) {
      const input = document.createElement("input");
      input.type = typeof person[key]() === "string" ? "text" : "number";
      input.placeholder = name;
      input.value = person[key]();
      reestr[name] = input;

      if (person.hasOwnProperty(`set${name}`)) {
        input.oninput = (event) => {
        person[`set${name}`](event.target.value);
        };
      } else {
        input.disabled = true;
      }
      if (name === "Name" || name === "Surname" || name === "FatherName") {
        if (person.hasOwnProperty(`set${name}`)) {
          reestr[name].oninput = () => {
            const fullName = `${reestr.Name.value} ${reestr.Surname.value} ${reestr.FatherName.value}`;
            console.log(fullName)
            person[`setFullName`](fullName);
          };
        }
      }
      
      domElement.appendChild(input);
    }
  }
  console.log(reestr);
  return reestr;
}
getSetForm("personForm", personObj);





