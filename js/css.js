
window.onscroll = changeColor;

//Get the button
var mybutton = document.getElementById("myBtn");

function changeColor() {

  if (view.currentScreen == 'home' || view.currentScreen == 'alljob') {
    let a = document.getElementById('nav')
    let b = document.getElementById('logo')
    let c = document.getElementById('1')

    let logo1 = `<img src="imgs/img/logo.png" alt="">`
    let logo2 = `<img src="imgs/img/logotrang.png" alt="">`
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      a.style.backgroundColor = "#001e41";
      b.innerHTML = logo2;
      c.style.color = "#ffffff";

    } else {
      a.style.backgroundColor = "#ffffff";
      b.innerHTML = logo1;
      c.style.color = "#000000"
    }
  }

  // When the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }

}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}






