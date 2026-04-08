const unitInput = document.getElementById('unitInput');
const dropdownBtns = document.querySelectorAll('.dropdownBtn');
const convertBtn = document.getElementById('convertBtn');
const convertResult = document.getElementById('convertResult');
const dropdownItems = document.querySelectorAll('.dropdownItem');

let fromUnit = '';
let toUnit = '';

dropdownBtns.forEach((dropdownBtn) => {
    dropdownBtn.addEventListener('click', () => {
        const dropdown = dropdownBtn.closest('.container__dropdown');
        const dropdownList = dropdown.querySelector('.dropdownList');
        const arrow = dropdown.querySelector('.arrow');

        dropdownList.classList.toggle('show');
        arrow.classList.toggle('rotate');
    });
});

dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        const dropdown = item.closest('.container__dropdown');
        const dropdownList = dropdown.querySelector('.dropdownList');
        const arrow = dropdown.querySelector('.arrow');
        const label = dropdown.querySelector('.dropdownLabel');
        
        const items = dropdown.querySelectorAll('.dropdownItem');
        items.forEach(el => el.classList.remove('disabled'));

        item.classList.add('disabled');
        label.textContent = item.textContent;

        const unit = item.querySelector('.item-text').textContent.trim();
        label.textContent = unit;

        const type = dropdown.dataset.type;

        if (type === 'from') {
            fromUnit = unit;
        } else {
            toUnit = unit;
        }

        label.textContent = unit;

        dropdownList.classList.remove('show');
        arrow.classList.remove('rotate');
    });
});

convertBtn.addEventListener('click', () => {
    const value = parseFloat(unitInput.value);

    if (isNaN(value) || !fromUnit || !toUnit) {
        convertResult.textContent = 'Please fill all fields';
        convertResult.classList.add('warning');
        return;
    }

    let result;

    if (fromUnit === toUnit) {
        result = value;
    }
    else if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        result = value * (9 / 5) + 32;
    }
    else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        result = (value - 32) * (5 / 9);
    }
    else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        result = value + 273.15;
    }
    else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        result = value - 273.15;
    }
    else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        result = (value - 32) * (5 / 9) + 273.15;
    }
    else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        result = (value - 273.15) * (9 / 5) + 32;
    }
    else {
        result = value;
    }

    convertResult.classList.remove('warning');
    convertResult.classList.add('converted');
    convertResult.textContent = `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
});
