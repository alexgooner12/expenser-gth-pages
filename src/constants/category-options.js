const options = [
    { displayValue: 'Please select a category', value: '' }, 
    { displayValue: 'Groceries', value: 'groceries' }, 
    { displayValue: 'Rent', value: 'rent' },
    { displayValue: 'Bills', value: 'bills' },
    { displayValue: 'Clothes', value: 'clothes' },
    { displayValue: 'Transportation', value: 'transportation' },
    { displayValue: 'Gift', value: 'gift' }
];

const addToLocalStorage = () => {
    if (!localStorage.key('options')) {
        localStorage.setItem('options', JSON.stringify(options));
    }
}

addToLocalStorage();

export default options;