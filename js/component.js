const component = {};
component.profile = `
<div class="container">
    <div class="about-company">
        <div class="pt30">
            <span class="fw500 fs25">MY PROFILE</span>
        </div>

        <div class="pt30">
            <button class="btn-edit" style="color: #8D8D8D;" data-toggle="modal" data-target="#exampleModal" id="btn-editProfile">
                <i class="far fa-edit" style="font-size:20px; width:40px"></i>Edit
            </button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="col-md-9">
                            <div class="edit-profile">

                                <form id="editProfileForm" method="post">
                                    <div class="form-group">
                                        <label class="col-xs-3 form-control-label" for="firstName">First
                                            name</label>
                                        <div class="col-xs-9">
                                            <input type="text" class="form-control" id="firstName" name="firstName"
                                                placeholder="Enter your first name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 form-control-label">Gender</label>
                                        <div class="col-xs-9 gender">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="radio-inline">
                                                        <input type="radio" name="genderRadio" value="male">
                                                        <i class="fa fa-mars"
                                                            style="font-size:25px; width:40px; text-align: center;"></i><span>Male</span>
                                                    </label>
                                                </div>
                                                <div class="col-md-7">
                                                    <label class="radio-inline">
                                                        <input type="radio" name="genderRadio" value="female">
                                                        <i class="fa fa-venus"
                                                            style="font-size:25px; width:40px; text-align: center"></i><span>Female</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-xs-3 form-control-label" for="userSkills">Skills</label>
                                        <div class="col-xs-9">
                                            <input type="text" class="form-control" name="userSkills"
                                                placeholder="Available skills">
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="submitProfileForm" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End modal -->

        <!-- User Avatar -->

        <div class="avatar" id = "user-avatar-img">
        </div>

        <div class = "user-avatar-upload"> 

            <label class="col-xs-3 form-control-label" for="avatar">Choose 
            avatar 
            </label> 

            <div class="col-xs-9 abc"> 
                <!-- avatar button --> 
                <form id = "avatar-form-upload"> 
                    <input name="fileChooserAvatar" type="file" class="file file-loading " 
                    data-allowed-file-extensions='["png", "jpg"]'> 
                    <button class="btn-submit-profile">Submit Avatar</button> 
                </form> 
            </div> 
        </div>
        

        <!-- User info -->
        <div class="talc">
            <h3 id="user-name"></h3>
            <p><i id="user-gender" class="" style="font-size:30px; width:40px"></i></p>
            <p style="font-size:20px">My Email: <span style="font-weight:bold;font-size:20px" id="user-email"></span></p>
            <p style="font-size:20px">My Skills: <span style="font-weight:bold;font-size:20px" id="user-skills"></span></p>
            <p style="font-size:20px">My CV: <a href="" id ="user-cv-url" download target="_blank" style="font-weight:bold;font-size:20px" disabled>None</a></p>
            <!-- <span style="font-weight:bold;font-size:20px" id="user-cv-url"></span>  -->
        </div>

    </div>
    <div class="jobs">
        <div>
            <span class="fw500 fs24"><i class="far fa-address-card" style="font-size:30px; width:40px"></i>Upload Your CV</span>
        </div>

        <div>
            <form class="d" id = "cv-form-upload">
            <div>
                <input type="file" class="ip-cv" style="font-size:15px" name="fileChooser">
            </div>
            <div style="padding-top:20px">
                <button type="submit" class="btn-submit-profile" id="cv-submit" >Submit</button>
            </div>
            </form>
        </div>
    </div>

    <!-- saved jobs -->
    <div class="jobs" style="padding-top:30px">
        <div>
            <span class="fw500 fs24"><i class="far fa-heart" style="font-size:30px; width:40px"></i>Saved
                jobs</span>
        </div>
        <div class="job row" id = "all-job-saved" >
        </div>
    </div>

</div>
`
component.navTransf = `
<nav id="nav" class="navbar navbar-expand-sm fixed-top">
      <a id="logo" href="index.html" ><img src="imgs/img/logo.png" alt=""></a>
      <ul id="1" class="navbar-nav justify-content-end">
        <li id="home" class="nav-item">
          <span  class="nav-link clw" id="link-home">HOME</span>
        </li>
        <li id="alljob" class="nav-item">
          <span  class="nav-link clw"  id="link-job">ALL JOB</span>
        </li>
        <li class="nav-item">
          <a href="formpage.html"><span class="nav-link clw"  id="link-company" >CONTACT US</span></a>
        </li>
        <div id="dropdown">
    <div class="dropdown" style="width: 50px; height: 30px;margin: 0px 30px 0px 50px; text-align: center">
        <div type="button" data-toggle="dropdown">
            <i style="font-size: 22px" class="fas fa-user-circle"></i><span  id="next-login">login</span>
        </div>
      </div>  
    </div>
      </ul>
    </nav>
`

component.navNoTransf = `  <nav id="nav-b" class="navbar navbar-expand-sm fixed-top">
<a id="logo" href="index.html" ><img src="imgs/img/logotrang.png" alt=""></a>
<ul id="1" class="navbar-nav justify-content-end">
    <li class="nav-item">
        <a class="nav-link" id="link-home"  >HOME</a>
    </li>
    <li class="nav-item">
        <a class="nav-link "  id="link-job">ALL JOB</a>
    </li>
    <li class="nav-item">
         <a href="formpage.html"><span class="nav-link clw"  id="link-company" >CONTACT US</span></a>
    </li>
    <div id="dropdown">
    <div class="dropdown" style="width: 50px; height: 30px;margin: 0px 30px 0px 50px; text-align: center">
        <div type="button" data-toggle="dropdown">
            <i style="font-size: 22px" class="fas fa-user-circle"></i><span  id="next-login">login</span>
        </div>
      </div>  
    </div>
</ul>

</nav>`
component.dropdown = ` 
<div class="dropdown" style="width: 50px; height: 30px;margin: 0px 30px 0px 50px; text-align: center">
<div type="button" data-toggle="dropdown">
    <i style="font-size: 22px" class="fas fa-user-circle"></i><span id="text-login">login</span>
</div>
<div class="dropdown-menu dropdown-menu-right">
<a class="dropdown-item"  style="font-size: 20px" id="btn-profile">My Profile</a>
<a class="dropdown-item"  style="font-size: 20px" id="btn-out" >Log out</a>
</div>
</div> `

component.login = `
<div class="container">
    <form id="form-login">
        <div class="login-box">
            <div class="si-hd">
                <h3>SIGN IN</h3>
                <p>Sign in with Google</p>
            </div>
            <div class="btn-gg">
                <button><i class="fab fa-google" style="font-size:25px; width:50px;text-align:center"></i>Sign in with
                    Google</button>
                <p style="padding-top: 20px;">or</p>
            </div>
            <div class="lg-ip">
                <div class="inner-addon left-addon">
                    <i class="fas fa-envelope glyphicon glyphicon-user"
                        style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
                    <input class="form-control" type="email" name="email" placeholder="Email" />
                    <div id="email-error" class="message-error"></div>
                </div>
                <div class="inner-addon left-addon">
                    <i class="fas fa-lock glyphicon glyphicon-user"
                        style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
                    <input type="password" class="form-control" name="password" placeholder="Password" />
                    <div id="password-error" class="message-error"></div>
                </div>
                <div class="" style="height: 40px; text-align:right">
                    <div id="forgot" tpye="button" style=" font-size:18px">Forgot password?</div>
                </div>
            </div>
            <div id="log-in-error" class="message-error"></div>
            <div id="log-in-success" class="message-success"></div>
            <div class="btn-lg">
                <button type="submit" id="btn-login" class="blue">Login</button>
            </div>
            <div class="pt20">
                <a id="register-link"  style="color:#000000; font-size:18px">Register</a>
            </div>
        </div>
    </form>
    </div>`

component.register = `
<form id="form-register">
<div class="login-box">
    <div class="si-hd">
        <h3>SIGN UP</h3>
        <p>Sign Up with Google</p>
    </div>
    <div class="btn-gg">
        <button><i class="fab fa-google" style="font-size:25px; width:50px;text-align:center"></i>Sign in with Google</button>
        <p style="padding-top: 20px;">or</p>
    </div>
    <div class="lg-ip">
        <div class="inner-addon left-addon">
            <i class="fas fa-user glyphicon glyphicon-user"
                style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
            <input class="form-control" type="text" name="fullname" placeholder="Fullname" />
            <div id="fullname-error" class="message-error"></div>
        </div>
        <div class="inner-addon left-addon">
            <i class="fas fa-envelope glyphicon glyphicon-user"
                style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
            <input class="form-control" type="email" name="email" placeholder="Email" />
            <div id="email-error" class="message-error"></div>
        </div>
        <div class="inner-addon left-addon">
            <i class="fas fa-lock glyphicon glyphicon-user"
                style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
            <input class="form-control" type="password" name="password" placeholder="Password" />
            <div id="password-error" class="message-error"></div>
        </div>
        <div class="inner-addon left-addon">
            <i class="fas fa-lock glyphicon glyphicon-user"
                style="margin-top:5px; font-size: 20px;color: dimgray;"></i>
            <input class="form-control" type="password" name="confirmPassword"
                placeholder="Re-Password" />
            <div id="confirm-password-error" class="message-error"></div>
        </div>
        <div class="" style="text-align:right">
            <a href="" style="color:#000000; font-size:18px">Forgot password?</a>
        </div>
    </div>
    <div id="register-error" class="message-error"></div>
    <div id="register-success" class="message-success"></div>
    <div class="btn-lg">
        <button type="submit" id="btn-register" class="blue">Sign Up</button>
    </div>
    <div class="pt20">
        <a id="login-link"  style="color:#000000; font-size:18px">Login</a>
    </div>
</div>
</form>
`

component.header = `<div class="bg" >
 <div class="content1">
   <div class="title">
     <h3> TECHFINDER</h1>
       <h5> THE LEADING WEBSITE FOR IT JOBFINDINGS</h4>
   </div>
 
   <form  id="form-search" class=" d-flex justify-content-center form-search">
     <span class=""
       style=" border-radius: 5px 0px 0px 5px;  background-color: white; height: 50px; width: 30px;color: #8D8D8D;font-size: 18px"><i
         style="padding-top:60%; font-size:20px; color:#C4C4C4" class="fa fa-search"></i></span>
     <input class="ip" name="search" type="search" style="font-size: 18px;" placeholder="Company,skill..." aria-label="Search" required>
     <div id="text-error" class="message-error"></div>
     <div class="form-group ">
 
    
       <select id="option-address" name="address" class="form-control form-control1 form-search ">
     
         
       </select>
     </div>
 
     <button class=" btnBg  form-search btn-hover" type="submit" style="font-size:20px"> <i class="fas fa-search " style="font-size:20px"></i> Search</button>
 
   </form>
 
   <div class="pt60 tk">
   
   </div>
   
   <div  class="d-flex justify-content-center " style="font-size:20px; color:#ffffff"> Job by skill</div>
   <div id="job-skill" class="d-flex justify-content-center mt-5 ">
     
   </div>
 </div>
 </div>
 </div>`
component.home =
    ` 
<div class="  text-job container ">
<h2> Nhà Tuyển Dụng </h2>
</div>
<div class="container">
<div id="listComponys" class="row mb-5 justify-content-center ">

</div>
</div>`

component.companydetail = ` 
<div class="container" id="clear">
<div class="about-company">
<div class="pt30">
    <span class="fw500 fs25">ABOUT COMPANY</span>
</div>
<div id="companyDetail"class="detail row">
   
</div>
</div>
<div class="jobs">
<div>
    <span class="fw500 fs25">JOBS</span>
</div>
<div>
    <div id="listJob" class="job row">
        
      
</div>
</div>
</div>
</div> `

component.alljob = `
<div class="  text-job container ">
        <h2> JOBS </h2>
    </div>
    <div class="filter container">
        <div style="display: flex; justify-content: center; padding-top: 46px" class="row">
            <div style="padding: 0px" class="filter-main col-sm-3">
                <div style="max-width: 100%; padding: 15px 35px 10px 50px ; border-bottom: 2px solid #013B80">
                    <span style="font-size: 25px">Filter</span>
                </div>

                <div style="padding: 15px 35px 10px 50px">
                    <div id="option-checkbox" style="border-bottom: 1px solid #cccccc; padding: 10px ">
                        <div style="padding-bottom: 10px">
                            <span style="font-size: 20px">City</span>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id="all" type="checkbox" class="form-check-input">All
                            </label>
                        </div>
                        
                    </div>
                    <div style=" padding: 10px ">
                        <div style="padding-bottom: 10px">
                            <span style="font-size: 20px">Salary</span>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id="all1" type="checkbox" class="form-check-input">All
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" name="checkbox1" class="form-check-input" value="duoi1000"><1000$
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" name="checkbox1" class="form-check-input" value="tu1000den2000">1000$-2000$
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" name="checkbox1" class="form-check-input" value="tren2000">>2000$
                            </label>
                        </div>
                    </div>

                </div>

                <div style="display: flex; justify-content: center; padding: 60px">
                    <button onclick="controller.checkbox()" class="filter-btn">Search</button>
                </div>
            </div>
            <div id="all-job" style="padding: 0px" class="filter-result col-sm-8">

            </div>
        </div>
    </div>
`
component.loading = `
<section>
  Loading...
</section>
`
