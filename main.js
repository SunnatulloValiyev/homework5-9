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



let soniyalar = 0;
let vaqtOraliq; 
const soniyalarElementi = document.getElementById('soniyalar');
const boshlashTugma = document.getElementById('boshlash');
const toxtatishTugma = document.getElementById('toxtatish');
const qaytaTugma = document.getElementById('qayta');

boshlashTugma.onclick = function () {
    vaqtOraliq = setInterval(() => {
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

qaytaTugma.onclick = function () {
    clearInterval(vaqtOraliq);
    soniyalar = 0;
    soniyalarElementi.textContent = soniyalar;
    boshlashTugma.disabled = false;
    toxtatishTugma.disabled = true;
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