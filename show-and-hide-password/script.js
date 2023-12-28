let password = document.querySelector('#password');
let eyeIcon = document.querySelector('#eyeicon');
let draggableContainer = document.querySelector('#draggable-container');


let isDragging = false;
let isResizing=false;
let offsetX, offsetY;
function showPassword() {
    if (password.type === "password"){
        password.type = "text";
        eyeIcon.src = 'eye-open.png';
        eyeIcon.img.style.color="black"

        } else {
            password.type = "password";
            eyeIcon.src = 'eye-close.png';
            
            }
            };
            eyeIcon.addEventListener('click',showPassword);

// Function to handle the mouse down event
function onMouseDown(e) {
    isDragging = true;
    offsetX = e.clientX - draggableContainer.getBoundingClientRect().left;
    offsetY = e.clientY - draggableContainer.getBoundingClientRect().top;
}

// Function to handle the mouse move event
function onMouseMove(e) {
    if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        draggableContainer.style.left = x + 'px';
        draggableContainer.style.top = y + 'px';
    }
    if (isResizing) {
        let newWidth = e.clientX - offsetX;
        let newHeight = e.clientY - offsetY;
        draggableContainer.style.width = newWidth + 'px';
        draggableContainer.style.height = newHeight + 'px';
    }
}

// Function to handle the mouse up event
function onMouseUp() {
    isDragging = false;
    isResizing=false
}

eyeIcon.addEventListener('click', showPassword);
draggableContainer.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
