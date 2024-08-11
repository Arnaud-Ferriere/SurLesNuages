window.addEventListener('DOMContentLoaded',(event) =>{
    getVisitCount();
})

const functionApi ='http://localhost:7071/api/GetResumeCounter';

const getVisitCount = () => {
    let count = 30;
    fetch(functionApi).then(Response => {
        return Response.json()
    }).then(response =>{
        console.log("FunctionApi has been called");
        count = response.count;
        document.getElementById("counter").innerText = count;
    }).catch(function(error){
        console.log(error);
    });
    return count;
}