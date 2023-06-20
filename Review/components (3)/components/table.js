class Table extends BaseClass {

    render() {
        super.render(this.componentRenderer);

    }
    componentRenderer() {
        const table = document.createElement('table');
        let i = 0;
        tableData.forEach(data => {
            const tr = document.createElement('tr');
            tr.setAttribute("id", `tr${i}`);
            const cellData = [
                { text: data.productName },
                { text: data.category },
            ];
            cellData.forEach(data => {
                const childElement = document.createElement('td');
                childElement.textContent = data.text;
                tr.append(childElement);
            })
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("id", `delete${i}`);
            deleteButton.setAttribute("class", "delete");
            tr.append(deleteButton);
            table.append(tr);
            // Added Event Listener
            deleteButton.addEventListener("click", function () {
                let rowNum = deleteButton.getAttribute("id").at(-1);
                let tableRow = document.getElementById(`tr${rowNum}`);
                let index;

                tableData.forEach((data) => {
                    if (data.productName === tableRow.childNodes[0].innerHTML) {
                        index = tableData.indexOf(data);
                    }
                })
                tableData.splice(index, 1);
                tableRow.remove();
                document.dispatchEvent(deleteRow);
            });
            i++;

        });
        return table;
    }

}
