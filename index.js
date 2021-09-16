const addCard = () => {
    const newTaskDetails = {
        id: '${Date.now()}',
        //above is a template literal
        //That date parameter enters the right time
        url:document.getElementById("imageURL").value,
        title:document.getElementById("taskTitle").value,
        type:document.getElementById("taskType").value,
        description:document.getElementById("taskDescription").value
        //.value is to extract the value of the input field
    };
    taskContents=document.getElementById("taskContentsrow");
    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));
    //add beforeend bcz we want the code to be added at the end(beforebegin,aferbegin,beforeend,afterend)
    //insertAdjacentHTML adds content
    //generateTaskCard(newTaskDetails) this returns the values obtained from the below parameter
}
//{id,url,title,type,description} is just object destructuring
    const generateTaskCard = ({id,url,title,type,description}) =>{
    return(` <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
                    <div class="cards">
                        <div class="card-header">
                            <div class="card-header d-flex justify-content-end">
                                    <button type="button" class="btn btn-outline-info">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                            </div>
                        </div>
                        <img src="${url}" class="card-img-top" alt="image"/>
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <span class="badge bg-primary">${type}</span>
                        </div>
                        <div class="class-footer">
                            <button class="btn btn-outline-primary float-end">Open task</button>
                        </div>
                    </div>
                </div>`) }
        
            