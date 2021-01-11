const brazilStates = [
  {
    state: 'Acre',
    initials: 'ac',
  },
  {
    state: 'Alagoas',
    initials: 'al',
  },
  {
    state: 'Amazonas',
    initials: 'am',
  },
  {
    state: 'Bahia',
    initials: 'ba',
  },
  {
    state: 'Ceará',
    initials: 'ce',
  },
  {
    state: 'Distrito Federal',
    initials: 'df',
  },
  {
    state: 'Espírito Santo',
    initials: 'es',
  },
  {
    state: 'Goiás',
    initials: 'go',
  },
  {
    state: 'Maranhão',
    initials: 'ma',
  },
  {
    state: 'Mato Grosso',
    initials: 'mt',
  },
  {
    state: 'Mato Grosso do sul',
    initials: 'ms',
  },
  {
    state: 'Minas Gerais',
    initials: 'mg',
  },
  {
    state: 'Pará',
    initials: 'pa',
  },
  {
    state: 'Paraíba',
    initials: 'pb',
  },
  {
    state: 'Paraná',
    initials: 'pr',
  },
  {
    state: 'Pernambuco',
    initials: 'pe',
  },
  {
    state: 'Piauí',
    initials: 'pi',
  },
  {
    state: 'Rio de Janeiro',
    initials: 'rj',
  },  
  {
    state: 'Rio Grande do Norte',
    initials: 'rn',
  },
  {
    state: 'Rio Grande do Sul',
    initials: 'rs',
  },
  {
    state: 'Rondônia',
    initials: 'ro',
  },
  {
    state: 'Roraima',
    initials: 'rr',
  },
  {
    state: 'Santa Catarina',
    initials: 'sc',
  },
  {
    state: 'São Paulo',
    initials: 'sp',
  },
  {
    state: 'Sergipe',
    initials: 'se',
  },
  {
    state: 'Tocantins',
    initials: 'to',
  }    
];

function createStatesInSelecteTypeList() {
  const states = document.querySelector('#states');
  for (let index = 0; index <= brazilStates.length; index += 1) {
    const option = document.createElement('option');
    option.innerText = brazilStates[index].state;
    option.value = brazilStates[index].initials;
    states.appendChild(option);
  }
}

function createResume(event) {
  const resume = document.querySelector('.resume');
  resume.classList.add('border-top');
  resume.innerHTML = '';
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const inputCpf = document.querySelector('#cpf');
  const inputAdress = document.querySelector('#adress');
  const inputCity = document.querySelector('#city');
  const inputStates = document.querySelector('#states');
  const inputHomeType = document.getElementsByName('home-type');
  const inputResumeText = document.querySelector('#resume-text');
  const inputRole = document.querySelector('#role');
  const inputRoleDescription = document.querySelector('#role-description');
  const inputStartDate = document.querySelector('#start-date');

  const title = document.createElement('h2');
  title.innerText = 'Currículo';
  title.classList.add('text-center');
  title.classList.add('text-dark');
  title.classList.add('mt-3');
  const name = document.createElement('p');
  name.classList.add('border-bottom');
  name.innerText = 'Name: ' + inputName.value;
  const email = document.createElement('p');
  email.classList.add('border-bottom');
  email.innerText = 'Email: ' + inputEmail.value;
  const cpf = document.createElement('p');
  cpf.classList.add('border-bottom');
  cpf.innerText = 'CPF: ' + inputCpf.value;
  const adress = document.createElement('p');
  adress.classList.add('border-bottom');
  adress.innerText = 'Endereço: ' + inputAdress.value;
  const city = document.createElement('p');
  city.classList.add('border-bottom');
  city.innerText = 'Cidade: ' + inputCity.value;
  const state = document.createElement('p');
  state.classList.add('border-bottom');
  state.innerText = 'Estado: ' + inputStates.value;
  const homeType = document.createElement('p');
  homeType.classList.add('border-bottom');
  if (inputHomeType[0].checked) homeType.innerText = 'Moradia: casa';
  else homeType.innerText = 'Moradia: apartamento'
  const resumeText = document.createElement('p');
  resumeText.classList.add('border-bottom');
  resumeText.innerText = 'Resumo do currículo: ' + inputResumeText.value;
  const role = document.createElement('p');
  role.classList.add('border-bottom');
  role.innerText = 'Cargo: ' + inputRole.value;
  const roleDescription = document.createElement('p');
  roleDescription.classList.add('border-bottom');
  roleDescription.innerText = 'Descrição do cargo: ' + inputRoleDescription.value;
  const startDate = document.createElement('p');
  startDate.classList.add('border-bottom');
  startDate.innerText = 'data de início: ' + inputStartDate.value;

  resume.appendChild(title)
  resume.appendChild(name);
  resume.appendChild(email);
  resume.appendChild(cpf);
  resume.appendChild(adress);
  resume.appendChild(city);
  resume.appendChild(state);
  resume.appendChild(homeType);
  resume.appendChild(resumeText);
  resume.appendChild(role);
  resume.appendChild(roleDescription);
  resume.appendChild(startDate);
}

window.onload = function() {
  var picker = new Pikaday({ field: $('#start-date')[0] });
  
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          createResume();
        } 
        form.classList.add('was-validated');
      }, false);
    });
  })();

  createStatesInSelecteTypeList();
}
