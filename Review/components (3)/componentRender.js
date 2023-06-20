const components = [
    { class: Table, uiComponentId: 'tableContainer' },
    { class: SideBar, uiComponentId: 'sideBar' }
].map(component => new component.class(component.uiComponentId));
components.forEach(component => {
    component.render();
    component.listenEvent();
})