const body = document.querySelector('body');
const span = document.getElementById('span2');
const btn = document.getElementById('main-content__btn');
const lists = document.querySelectorAll('li');
const menus = ['Hex', 'RGB', 'RGBa', 'HSL', 'HSLa'];
const error = document.getElementById('error');
const menuBtn = document.querySelector('.header__menu__dot');
const nav = document.querySelector('ul');

let flag = false;

menuBtn.addEventListener('click', event =>{
    if(!flag){
        nav.style.display = 'flex';
        flag = true;
    }else{
        nav.style.display = 'none';
        flag = false;
    }
})

const removeStyles = () =>{
    lists.forEach(list => {
        list.classList.remove('header__li__active');
    })
}

lists.forEach(list =>{
    list.addEventListener('click', event =>{
        removeStyles();
        if(menus.includes(list.textContent)){
            list.classList.add('header__li__active');
            error.textContent = '';
            span2.textContent = '';
            body.style.backgroundColor = '#F1f5f8';
        }
    })
})

const getRandomHexColor = () =>{
    const colorCode = '0123456789abcdef';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += colorCode[parseInt(Math.random() * colorCode.length)];
    }  
    return color;
}

const getRandomRgbOrRgbaColor = currMenu =>{
    let color = [];
    for(let i = 0; i < 3; i++){
        color.push(parseInt(Math.random() * 256));
    }
    if(currMenu === 'RGBa'){
        color.push(Math.random().toFixed(2));
        return `rgba(${color.join(', ')})`;
    }  
    return `rgb(${color.join(', ')})`;
}

const getRandomHslOrHslaColor = currMenu =>{
    let color = [];
    for(let i = 0; i < 3; i++){
        switch(i){
            case 0:
                color.push(parseInt(Math.random() * 361));
                break;
            default:
                color.push(parseInt(Math.random() * 101) + '%');
        }
    }

    if(currMenu === 'HSLa'){
        color.push(Math.random().toFixed(2));
        return `hsla(${color.join(', ')})`;
    }

    return `hsl(${color.join(', ')})`;
}

btn.addEventListener('click', event =>{
    let currentMenu = null;
    lists.forEach(list =>{
        if(list.className.includes('header__li__active')){
            currentMenu = list.textContent;
        }
    })

    if(currentMenu === null){
        error.textContent = 'Please select color type';
        return;
    }

    let color = null;
    switch(currentMenu){
        case 'Hex':
            color = getRandomHexColor();
            break;
        case 'RGB':
        case 'RGBa':
            color = getRandomRgbOrRgbaColor(currentMenu);
            break;
        case 'HSL':
        case 'HSLa': 
            color = getRandomHslOrHslaColor(currentMenu);
    }
    span.textContent = color;
    body.style.backgroundColor = color;
})