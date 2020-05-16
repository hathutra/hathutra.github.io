const controller = {
  loadedCompany: false,
  loadedJob: false
}

const user = firebase.auth().currentUser;
const db = firebase.firestore();
const storage = firebase.storage();

controller.register = async function (registerInfo) {

  let email = registerInfo.email
  let password = registerInfo.password
  let displayName = registerInfo.fullname
  view.setText('register-error', '')
  view.setText('register-success', '')
  view.disable('btn-register')
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      email: email
    })
    addUser(firebase.auth().currentUser)

    await firebase.auth().currentUser.sendEmailVerification()
    view.setText('register-success', 'An email verification has been sended to your email address!')
  } catch (err) {
    view.setText('register-error', err.message)
  }
  view.enable('btn-register')
}
controller.logIn = async function (logInInfo) {

  try {
    view.disable('btn-login')
    let email = logInInfo.email
    let password = logInInfo.password
    let result = await firebase.auth().signInWithEmailAndPassword(email, password)
    if (!result.user.emailVerified) {
      throw new Error('You must verify email!')
    }
   if(view.pastScreen){
     view.showComponents(view.pastScreen)
   }else{
     view.showComponents('home')
    }

  } catch (err) {
    view.setText('log-in-error', err.message)
    view.enable('btn-login')
  }
}
// function to add user to the database
let addUser = async function (user) {
  if (user != null) {
    db.collection("users").doc(user.email).set({
      email: user.email,
      displayName: user.displayName,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}
// function to fill the existing profile page (default user profile)
controller.fillProfilePage = async function () {
  let currentUser = firebase.auth().currentUser
  db.collection('users').doc(currentUser.email).get().then(function (doc) {
    let userProfile = doc.data();

    let userEmail = document.getElementById('user-email')
    userEmail.innerText = userProfile.email;

    let userName = document.getElementById('user-name')
    userName.innerText = userProfile.displayName;

    let userGender = document.getElementById('user-gender')
    userGender.classList = userProfile.gender == 'female' ? 'fas fa-venus' : 'fas fa-mars';

    let userSkills = document.getElementById('user-skills')
    userSkills.innerText = userProfile.skills ? userProfile.skills : 'None';

    let userAvatar = document.getElementById('user-avatar-img')
    userAvatar.style.background = `url('${userProfile.avatarUrl}') center center no-repeat`
    userAvatar.style.backgroundSize = 'cover'

    let userCvUrl = document.getElementById('user-cv-url')
    userCvUrl.href = userProfile.cvUrl
    if (userProfile.cvUrl !== null) {
      userCvUrl.removeAttribute("disabled")
      userCvUrl.innerText = "Download"
    }

  }).catch(
    function (error) {
      console.log('cannot get profile document', error)
    }
  )
}

// fill the modal form when opened
controller.fillProfileForm = async function (profileForm) {
  let currentUser = firebase.auth().currentUser

  db.collection('users').doc(currentUser.email).get().then(function (doc) {
    if (doc.exists) {
      let userProfile = doc.data();
      profileForm.firstName.value = userProfile.displayName
      profileForm.genderRadio.value = userProfile.gender == 'female' ? 'female' : 'male'
      profileForm.userSkills.value = userProfile.skills ? userProfile.skills : ''
    } else {
      console.log("No such document!");
      profileFormfirstName.value = ''
      profileForm.genderRadio.value = ''
      profileForm.userSkills.value = ''
    }
  }).catch(
    function (error) {
      console.log('cannot get profile document', error)
    }
  )
}

// update the profile after filling the modal with new info
controller.updateProfile = async function (profileForm) {
  let currentUser = firebase.auth().currentUser

  let displayName = profileForm.firstName.value;
  let gender = profileForm.genderRadio.value;
  let skills = profileForm.userSkills.value;

  // thong tin khong co trong form, tu luu lai
  let email = currentUser.email;
  db.collection("users").doc(currentUser.email).set({
    displayName: displayName,
    gender: gender,
    skills: skills,
    // tu tay luu, neu khong se mat thong tin
    email: email,

  }, { merge: true })
    .then(function (docRef) {
      console.log("Document written")
      controller.fillProfilePage()
      alert("Profile updated.")
    })
    .catch(function (error) {
      console.error("Error adding document: ", error)
    });
}

// get the file links
let getFileUrl = function (fileRef) {
  return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}`
}

let getAvatarUrl = function (fileRef) {
  return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
}

// upload to firebase and update link CV to profile page
controller.uploadCv = async function (file) {

  let fileName = file.name
  let filePath = `user-cv/${fileName}`
  let fileRef = firebase.storage().ref().child(filePath)
  await fileRef.put(file)
  let fileLink = getFileUrl(fileRef)
  updateCv(fileLink)
  console.log('File link: ' + fileLink)
  return fileLink
}

let updateCv = async function (link) {
  var fileRef = storage.refFromURL(link);

  // Get the download URL
  fileRef.getDownloadURL().then(function (url) {
    console.log('URL:' + url)
    let cvUrl = document.getElementById("user-cv-url")
    cvUrl.href = url
    cvUrl.removeAttribute("disabled")
    cvUrl.innerText = "Download"

    let currentUser = firebase.auth().currentUser
    db.collection("users").doc(currentUser.email).set({
      cvUrl: url
    }, { merge: true })
      .then(function (docRef) {
        console.log("Document written")
        alert("CV updated.")
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      });

  }).catch(function (error) {
    console.log(error)
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}

controller.uploadAvatar = async function (file) {
  let fileName = file.name
  let filePath = `user-avatar/${fileName}`
  let fileRef = firebase.storage().ref().child(filePath)
  await fileRef.put(file)
  let fileLink = getAvatarUrl(fileRef)
  updateAvatar(fileLink)
  console.log('Avatar Link: ' + fileLink)
  return fileLink
}

let updateAvatar = async function (link) {
  let currentUser = firebase.auth().currentUser
  let userAvatar = document.getElementById('user-avatar-img')
  userAvatar.style.background = `url('${link}') center center no-repeat`
  userAvatar.style.backgroundSize = 'cover'

  db.collection("users").doc(currentUser.email).set({
    avatarUrl: link
  }, { merge: true })
    .then(function () {
      console.log("Document written")
      alert("Avatar updated.")
    })
    .catch(function (error) {
      console.error("Error adding document: ", error)
    });
}

// delete job
async function deleteJob(id, email) {
  // let company = await firebase.firestore().collection('company').doc(id).delete()
  let currentUser = firebase.auth().currentUser;
  await firebase
    .firestore()
    .collection('job')
    .doc(id)
    .update({
      userSaved: firebase.firestore.FieldValue.arrayRemove(email)
    })
  console.log("Delete saved job ok")
  model.jobs = model.jobs.filter(function (v, i, arr) { return v.id != id; })
  controller.displaySavedJobs();
}

// handle saved jobs
controller.displaySavedJobs = async function () {

  let currentUser = firebase.auth().currentUser;

  // doc.data() is never undefined for query doc snapshots
  let jobs = model.jobs
  document.getElementById("all-job-saved").innerHTML = ""
  for (let job of jobs) {
    for (let email of job.userSaved) {
      if (email == currentUser.email) {
        // display to profile
        let jobTitle = job.title;
        let jobMoney = job.money;
        let jobDesc = job.description;
        let jobAdress = job.address;
        let jobSkill = job.skill;

        let jobCard = `
              <div style="padding-bottom: 10px" class="col-sm-5">
                  <div>
                      <span class="fw500 fs25" id ="job-title">${jobTitle}
                      </span>
                  </div>
                  <div>
                      <span style="color: #a50b0b" id ="job-money"><i class="fas fa-search-dollar"></i>${jobMoney}</span>
                  </div>

                  <div>
                      <span id ="job-desc">${jobDesc.substr(0, 200)}...</span>
                  </div>

                  <div>
                      <span style="color: #013B80;" class="fs20"><i class="fas fa-map-marker-alt" id="job-address"></i>${jobAdress}</span>
                  </div>

                  <div class="footer-card">
                      <div>
                          <span class="fs18 skill id="job-skill"">${jobSkill}</span>
                      </div>
                      
                      <button onclick="deleteJob('${job.id}','${email}')" style="padding: 0 10px 0 10px; border-radius: 5px" class="fs18 save" id="job-delete">Delete Job</button>

                  </div>
                </div>
            `
        let userSavedJobs = document.getElementById("all-job-saved")
        view.appendHtml(userSavedJobs, jobCard)
      }
    }
  }
}



controller.resetPass = async function (email) {
  view.setText('log-in-error', '')
  view.setText('log-in-success', '')
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    view.setText('log-in-success', 'An email password reset has been sended to your email address!')
  } catch (error) {
    view.setText('log-in-error', error.message)
  }

}
controller.postcompany = async function (company) {

  let name = company.name.toLowerCase()
  let allCompany = await firebase
    .firestore()
    .collection('company')
    .get()
  let docs = allCompany.docs
  for (let doc of docs) {
    let data = transformDoc(doc)
    //console.log(data)
    let dataName = data.name.toLowerCase()
    if (dataName == name) {
      alert('company existed!')
      return
    }
  }

  view.disable('btn-postcompany')

  await firebase
    .firestore()
    .collection('company')
    .add(company)

  alert('post company success!')
  document.getElementById('form-postcompanny').name.value = ''
  document.getElementById('form-postcompanny').address.value = ''
  document.getElementById('form-postcompanny').employee.value = ''
  document.getElementById('form-postcompanny').title.value = ''
  document.getElementById('form-postcompanny').description.value = ''
  view.enable('btn-postcompany')

}
controller.postjob = async function (job) {
  console.log('controller');
  let title = job.title.toLowerCase()
  let alljob = await firebase
    .firestore()
    .collection('job')
    //.where('name', '==', name)
    .get()
  let docs = alljob.docs
  for (let doc of docs) {
    let data = transformDoc(doc)
    //console.log(data)
    let datatitle = data.title.toLowerCase()
    if (datatitle == title) {
      alert('job existed!')
      return
    }
  }
  view.disable('btn-postjob')

  await firebase
    .firestore()
    .collection('job')
    .add(job)

  alert('post job success!')
  document.getElementById('form-postjob').nameCompany.value = ''
  document.getElementById('form-postjob').title.value = ''
  document.getElementById('form-postjob').money.value = ''
  document.getElementById('form-postjob').address.value = ''
  document.getElementById('form-postjob').skill.value = ''
  document.getElementById('form-postjob').description.value = ''
  document.getElementById('form-postjob').SandE.value = ''
  document.getElementById('form-postjob').why.value = ''
  view.enable('btn-postjob')

}
controller.loadCompany = async function () {
  if (controller.loadedCompany) {
    return
  }
  let result = await firebase
    .firestore()
    .collection('company')
    .get()
  let companys = transformDocs(result.docs)
  model.saveCompany(companys)

  controller.loadedCompany = true
}
controller.loadJob = async function () {
  if (controller.loadedJob) {
    return
  }
  let result = await firebase
    .firestore()
    .collection('job')
    .get()

  let jobs = transformDocs(result.docs)
  model.saveJob(jobs)

  controller.loadedJob = true
}

controller.saveJob = async function (id, email) {
  await firebase
    .firestore()
    .collection('job')
    .doc(id)
    .update({
      userSaved: firebase.firestore.FieldValue.arrayUnion(email)
    })
}
controller.collectionJobChange = function () {
  let isFirstRun = true

  firebase
    .firestore()
    .collection('job')
    //.where('users', 'array-contains', currentEmail)
    .onSnapshot(async function () {
      if (isFirstRun) {
        isFirstRun = false
        return
      }
      await controller.loadJob()
      if (view.currentScreen == 'companyDetail') {
        view.clearHtml('listJob')
        view.showJob()
      }
      else {
        view.clearHtml('all-job')
        view.showJobLong(model.currentJobs)
      }
    })
}
controller.inputSearch = async function (search) {
  let a = search.text.toLowerCase()
  let b = search.address.toLowerCase()
  await view.showComponents('alljob')
  view.clearHtml('all-job')
  let selecjob = []
  let jobs = model.jobs
  for (let job of jobs) {
    let address = job.address.toLowerCase().includes(b)
    let name = job.nameCompany.toLowerCase().includes(a)
    let skill=job.skill.toLowerCase().includes(a)
    if (name && address|| skill&&address) {
      selecjob.push(job)
    }
  }
  if (selecjob.length == 0) {
    alert('No job found!')
  }
  console.log(selecjob);

  view.showJobLong(selecjob)
  model.saveCurrentJobs(selecjob)
}
controller.checkbox = function () {
  let jobs = model.jobs
  let result = []
  let resultID = []
  let address = []
  let money = []
  let checkboxes = document.getElementsByName('checkbox')
  let checkboxes1 = document.getElementsByName('checkbox1')
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      address.push(checkbox.value)
    }
  }
  for (let checkbox1 of checkboxes1) {
    if (checkbox1.checked) {
      money.push(checkbox1.value)
    }
  }
  if (address.length == 0 && money.length == 0) {
    return
  }
  console.log(address, money);
  for (let i = 0; i < address.length; i++) {
    for (let job of jobs) {
      if (address[i] == job.address
        || address[i] == job.address
        || address[i] == job.address) {
        resultID.push(job.id);
      }
    }
  }
  for (let j = 0; j < money.length; j++) {
    for (let job of jobs) {
      if (money[j] == 'duoi1000' && job.money < 1000
        || money[j] == 'tu1000den2000' && job.money >= 1000 && job.money <= 2000
        || money[j] == 'tren2000' && job.money > 2000) {
        resultID.push(job.id);
      }
    }
  }
  if (address.length == 0 || money.length == 0) {
    for (let i = 0; i < resultID.length; i++) {
      for (let job of jobs) {
        if (resultID[i] == job.id) {
          result.push(job)
        }
      }
    }
    console.log(result);
    view.clearHtml('all-job')
    view.showJobLong(result)
    model.saveCurrentJobs(result)
    return
  }
  for (let job of jobs) {
    let aid = job.id
    let start = resultID.indexOf(aid)
    if (start == -1) {
      continue;
    }
    resultID.splice(start, 1)
  }
  for (let i = 0; i < resultID.length; i++) {
    for (let job of jobs) {
      if (resultID[i] == job.id) {
        result.push(job)
      }
    }
  }
  console.log(result);
  if (result.length == 0) {
    alert('no job found!')
  }
  view.clearHtml('all-job')
  view.showJobLong(result)
  model.saveCurrentJobs(result)
}
function transformDoc(doc) {
  let data = doc.data()
  data.id = doc.id
  return data
}
function transformDocs(docs) {
  return docs.map(transformDoc)
}