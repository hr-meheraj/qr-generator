const button = document.querySelector('.btn');
// global Url access from anywhere.....
let newUrl;
// Generate Button Function for Qr Code 
button.addEventListener('click', () => {
  const value = document.querySelector('textarea').value;
  if (value) {
    const img = document.querySelector('img');
    let size;
    if (window.innerWidth <= '400px') {
      size = '150x150';
    } else {
      size = '350x350';
    }
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${value}`;
    img.src = url;
    const a = document.querySelector('a');
    a.setAttribute('href', `blob[${url}]`);
    a.style.display = 'block';
    newUrl = url;
  } else {
    alert('Please enter anything');
  }
});
// Download Function process Blog 
async function downloadImage(imageSrc, name) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// Download Button Event +==> 
const a = document.querySelector('a');
a.addEventListener('click', () => {
  let userInput = prompt('Please type your filename to save:');
  if (!userInput) {
    userInput = 'qr-by-hr-meheraj';
  }
  downloadImage(newUrl, userInput);
});
