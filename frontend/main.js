const functionApi ='';

const getVisitCount = () => {
    let count = 30;
    fetch(functionApi).then(Response => {
        return Response.json()
    }).then
}