const forma = document.getElementById('forma');
const nomInput = document.getElementById('nom');
const narxInput = document.getElementById('narx');
const tarifInput = document.getElementById("ta'rif");
const saqlashTugmasi = document.getElementById('saqlashTugmasi');
const mahsulotlarDiv = document.getElementById('mahsulotlar');

function mahsulotlarniOlish() {
    return JSON.parse(localStorage.getItem('mahsulotlar')) || [];
}

function mahsulotlarniSaqlash(mahsulotlar) {
    localStorage.setItem('mahsulotlar', JSON.stringify(mahsulotlar));
}

function mahsulotniQoshish(mahsulot) {
    const mahsulotlar = mahsulotlarniOlish();
    mahsulotlar.push(mahsulot);
    mahsulotlarniSaqlash(mahsulotlar);
}

function mahsulotniChopEt(mahsulot) {
    const mahsulotElement = document.createElement('div');
    mahsulotElement.className = 'mahsulot';
    mahsulotElement.innerHTML = `
        <h3>${mahsulot.nom}</h3>
        <p><strong>Narx:</strong> ${mahsulot.narx} so'm</p>
        <p>${mahsulot.tarif}</p>
        <button class="ochirish" data-id="${mahsulot.id}">O'chirish</button>
    `;
    mahsulotlarDiv.appendChild(mahsulotElement);

    mahsulotElement.querySelector('.ochirish').addEventListener('click', function () {
        const mahsulotlar = mahsulotlarniOlish().filter(m => m.id !== mahsulot.id);
        mahsulotlarniSaqlash(mahsulotlar);
        mahsulotElement.remove();
    });
}

function mahsulotlarniYuklash() {
    const mahsulotlar = mahsulotlarniOlish();
    mahsulotlar.forEach(mahsulotniChopEt);
}

saqlashTugmasi.addEventListener('click', function () {
    const mahsulot = {
        id: Date.now(),
        nom: nomInput.value,
        narx: narxInput.value,
        tarif: tarifInput.value
    };

    mahsulotniQoshish(mahsulot);
    mahsulotniChopEt(mahsulot);
    forma.reset();
});

document.addEventListener('DOMContentLoaded', mahsulotlarniYuklash);


const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const btn = document.getElementById("btn");
const container = document.getElementById("container");

function validate() {}

function createCard(phone) {
  return `      <div class="card">
        <h3>${phone.name}</h3>
        <h3>${phone.price}</h3>
        <p>${phone.description}</p>
      </div>`;
}
form &&
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }
    btn.setAttribute("disabled", true);
    name.setAttribute("readonly", true);
    description.setAttribute("readonly", true);
    price.setAttribute("readonly", true);
    const product = {
      name: name.value,
      description: description.value,
      status: "active",
      category_id: 2,
      price: price.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        let card = createCard(data);
        container.innerHTML += card;
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        btn.removeAttribute("disabled");
        name.removeAttribute("readonly");
        description.removeAttribute("readonly");
        price.removeAttribute("readonly");
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all")
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error("Xatolik yuz berdi!");
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((phone) => {
          let card = createCard(phone);
          container.innerHTML += card;
        });
      }
    })
    .catch((error) => {
      console.log("Xatolik:", error);
    });
});






const ranglar = ['red', 'yellow', 'green', 'pink'];
const ranglarKonteyner = document.getElementById('ranglar');
const matnElementi = document.getElementById('matn');
const rangOzgarishi = document.getElementById('rang-ozgarishi');

ranglar.forEach(rang => {
    const rangBlok = document.createElement('div');
    rangBlok.classList.add('rang-blok');
    rangBlok.style.backgroundColor = rang;
    rangBlok.onclick = function () {
        matnElementi.style.color = rang;
        rangOzgarishi.textContent = `Hozirgi rang: ${rang}`;
    };
    ranglarKonteyner.appendChild(rangBlok);
});


let vaqtOraliq;
let soniyalar = 0;
const soniyalarElementi = document.getElementById('soniyalar');
const boshlashTugma = document.getElementById('boshlash');
const toxtatishTugma = document.getElementById('toxtatish');
const qaytaTaymerTugma = document.getElementById('qayta-taymer');

boshlashTugma.onclick = function () {
    vaqtOraliq = setInterval(function () {
        soniyalar++;
        soniyalarElementi.textContent = soniyalar;
    }, 1000);
    boshlashTugma.disabled = true;
    toxtatishTugma.disabled = false;
};

toxtatishTugma.onclick = function () {
    clearInterval(vaqtOraliq);
    boshlashTugma.disabled = false;
    toxtatishTugma.disabled = true;
};

qaytaTaymerTugma.onclick = function () {
    clearInterval(vaqtOraliq);
    soniyalar = 0;
    soniyalarElementi.textContent = soniyalar;
    boshlashTugma.disabled = false;
    toxtatishTugma.disabled = true;
};

const qaytaFiltrTugma = document.getElementById('qayta-filtr');
qaytaFiltrTugma.onclick = function () {
    qidiruvInput.value = '';
    rasmlar.forEach(rasm => {
        rasm.style.display = 'block';
    });
};

const qidiruvInput = document.getElementById('kategoriya-qidiruv');
const filtrlaTugma = document.getElementById('filtrla');
const qaytaTugma = document.getElementById('qayta');
const rasmlar = document.querySelectorAll('.rasm-konteyner');
filtrlaTugma.onclick = function () {
    const qidiruvMatni = qidiruvInput.value.trim().toLowerCase();

    rasmlar.forEach(rasm => {
        const kategoriya = rasm.dataset.kategoriya.toLowerCase();

        if (kategoriya.includes(qidiruvMatni)) {
            rasm.style.display = 'block';
        } else {
            rasm.style.display = 'none';
        }
    });
};


qaytaTugma.onclick = function () {
    qidiruvInput.value = '';
    rasmlar.forEach(rasm => {
        rasm.style.display = 'block';
    });
};