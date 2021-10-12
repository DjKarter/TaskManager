let addButton = document.getElementById("add-task-button");
let text = document.getElementById("input-task");
let list = document.getElementById("task-list");

let temp = [{text: "Read my mail", checked: false}, {text: "Eat a deer", checked: false}, {text: "Jump over the house", checked: false}];

let taskList = JSON.parse(localStorage.getItem("tasks")) || temp;

makeLi = (text, check = false) => {
    let node = document.createElement('li');
    let nInput = document.createElement('input');
    nInput.className = 'checker';
    nInput.type = "checkbox";


    let nSpan = document.createElement('span');
    nSpan.className = "task";
    nSpan.append(document.createTextNode(text));

    let nButton = document.createElement('button');
    nButton.append(document.createTextNode('X'));
    nButton.addEventListener('click', function () {
        nButton.parentElement.remove();
        console.log(taskList.indexOf(taskList.find(elem => elem.text === text)));
        taskList.splice(taskList.indexOf(taskList.find(elem => elem.text === text)), 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    });
    nButton.className = "delete-btn";
    if (check) {
        nSpan.classList.toggle('checked');
        nInput.checked = true;
    }

    nInput.addEventListener('change', () => {
        nSpan.classList.toggle('checked');

        for (let i = 0; i < taskList.length; ++i) {
            if (text === taskList[i].text)
                taskList[i].checked =  nSpan.classList.contains('checked');
        }
        localStorage.setItem('tasks', JSON.stringify(taskList));
    });

    node.append(nInput, nSpan, nButton);
    list.append(node);
}


for(let i = 0; i < taskList.length; ++i) {
    makeLi(taskList[i].text, taskList[i].checked);
}

console.log((taskList));



addButton.addEventListener("click", function() {
    if (text.value !== "") {
        makeLi(text.value);
        taskList.push({text: text.value, checked: false});
        text.value = "";
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));

});




