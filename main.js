const fiyatInput = document.getElementById('fiyat');
const harcamaInput = document.getElementById('harcama');
const eklemeBtn = document.getElementById('eklemeBtn');
const liste = document.querySelector(".liste")
const payCheckbox = document.getElementById("odeme")
const toplamSpan = document.getElementById("toplam")
eklemeBtn.addEventListener('click', addExpense);


//LİSTE KISMINDAKİ OLAY İZLEYİCİLER
liste.addEventListener("click",handleClick)

let expenses = []
// TOPLAM BİLGİSİNİ GÜNCELLER
function updateToplam(){
    var toplam = expenses.reduce((toplam,fiyat)=> toplam + fiyat,0);
    toplamSpan.innerText = toplam;
}
console.log(expenses)
function addExpense(event) {
  event.preventDefault();

  //eğer inputlar boş ise fonksiyonu bitir
  if (!fiyatInput.value || !harcamaInput.value) {
    alert('Lütfen boş alanları doldurunuz');
    return;
  }

  //div oluştur ve item classı ekle
  const itemBox = document.createElement('div');
  itemBox.classList.add('item');

  //EĞER ÖDENDİ tiklendiyse ödendi classı ekle
  if (payCheckbox.checked) {
    itemBox.classList.add('odendi');
  }

  //itemboxın html yapısı
  itemBox.innerHTML = `
       <h1>
           ${harcamaInput.value}
       </h1>
       <h2>
           ${fiyatInput.value}
       </h2>
       <div class="buttons"> 
           <img id="edit" src="/images/pay.png" alt="">
           <img id="delete" src="/images/delete.png" alt="">
       </div>
  `;
  //itemboxı listeye ekleme
  liste.appendChild(itemBox);

  //fiyatlar divine fiyat değerini gönderme
  if(!payCheckbox.checked){
    expenses.push(Number(fiyatInput.value));
  }

  updateToplam()
  //input değerleri sıfırlama
  fiyatInput.value = '';
  harcamaInput.value = '';
}


// TIKLAMA İŞLEMİNE GÖRE ALINACAK AKSİYON

function handleClick(e){
    const element = e.target

    if(e.target.id == "delete"){
      const harcama = element.parentElement.parentElement;
      // elemanı silme
      harcama.remove();
      // elemanın içindeki fiyat
      const cikarilacak = harcama.querySelector('h2').innerText;
     // fiyatın eksili halini gönderdik
      expenses.push(-Number(cikarilacak));
      updateToplam()
    }
}