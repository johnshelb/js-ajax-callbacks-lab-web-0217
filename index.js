function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}
$(document).ready(function () {
  handlebarsSetup()
});


function searchRepositories(){
  $("#details").empty()
  const searchTerms = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data=>{
    const template = Handlebars.compile($('#results-template').html())
    $('#results').html(template(data))
  }).fail(error=>{displayError()})
}

function displayError(){
  $("#errors").html("error")
}

function showCommits(data) {
  let x = "https://api.github.com/repos/" +data.dataset.owner + "/" + data.dataset.repository + "/commits"
  $.get(x, data=>{
    var z = data.map(datum=>[datum.sha, datum.author.login, datum.commit.author.name, datum.author.avatar_url])
        // debugger;
    z.forEach(info=>{
      for(let i = 0; i<4; i++){
        if(i<3){
      $("#details").append(`${info[i]}<br>`)
    }
    else{
      $("#details").append(`<img src=${info[i]}<br>`)

    }
    }
  }
 )
 })
}
