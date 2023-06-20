class SideBar extends BaseClass {
    render() {
        
        super.render(this.componentRenderer);
    }
    // Rendered event after deleting row
 
    componentRenderer = () => {
        console.log('c');
        const ul = document.createElement('ul');
        this.getCategoryData().forEach(category => {
            const li = document.createElement('li');
            li.innerText = `${category.name}` + ` ` + `${category.count}`;
            ul.append(li);
        });
        return ul;
    }
    listenEvent() {
        console.log('l');
        document.addEventListener('deleteRow', this.componentRenderer.bind(this))
    }
    getCategoryData() {
        let categories = [];
        let nameValue = [], j = 0;
        let countValue = [];
        tableData.forEach(function (data) {
            if (!(nameValue.includes(data["category"]))) {
                nameValue[j] = data.category;
                countValue[j] = 1;
                j++;
            }
            else {
                countValue[nameValue.indexOf(data["category"])] += 1;
            }
        });
        for (let i = 0; i < nameValue.length; i++) {
            let obj = { name: nameValue[i], count: countValue[i] }
            categories.push(obj);
        }
        return categories;
    }

}



