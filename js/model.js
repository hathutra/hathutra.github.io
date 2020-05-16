
const model = {
  companys: null,
  companyId: null,
  jobs: null,
  currentJobs: null,
}

model.saveCompany = function (companys) {
  model.companys = companys
}
model.saveJob = function (jobs) {
  model.jobs = jobs
}
model.saveId = function (companyId) {
  model.companyId = companyId
  
  
}
model.saveCurrentJobs = function (currentJobs) {
  model.currentJobs = currentJobs
}
 

