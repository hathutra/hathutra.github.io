window.onload = init
function init() {

  view.showLastLocation('loading')

  firebase.auth().onAuthStateChanged(function (user) {
    if (view.currentScreen == 'register' || view.currentScreen == 'login') {
    
      return
    }
    if (user && user.emailVerified) {
      console.log("đã đăng nhập")
      view.showLastLocation('home')
    }
    else {
      console.log("0k");
      view.showLastLocation('home')
    }
  })

}

