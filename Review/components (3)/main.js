const tableData = [
    { productName: 'a', category: 'a1' },
    { productName: 'b', category: 'a1' },
    { productName: 'c', category: 'a2' },
    { productName: 'd', category: 'a3' },
    { productName: 'e', category: 'a3' },
    { productName: 'f', category: 'a3' },
    { productName: 'g', category: 'a3' },
    { productName: 'h', category: 'a3' },
];
// Added Event
let deleteRow = new Event("deleteRow");


class BaseClass {
    constructor(id) {
        this.element = document.getElementById(id);

    }
    render(renderFun) {
        const childElement = renderFun();

        this.element.innerHTML = '';
        this.element.append(childElement);
    }
    listenEvent(tr,deleteButton) {
        console.log(tr);
    }

}