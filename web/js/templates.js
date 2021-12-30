window.Templates = {
    compile: (template) => {
        let compiledTemplate = template.blueprint;
        Object.keys(template.placeholders).forEach(key => {
            let replaceKey = new RegExp(`#${key}#`, 'g');
            compiledTemplate = compiledTemplate.replace(replaceKey, template.placeholders[key]);
        });
        const compiledDiv = document.createElement('div');
        compiledDiv.innerHTML = compiledTemplate;
        return compiledDiv.children[0];
    },
    ITEM_CARD: {
        blueprint: `
        <div class="card with-img cell" id="#img#">
            <div class="main">
                <img src="./web/imgs/#img#.png" alt="#txt#">
            </div>
            <div class="footer">
                <div class="helper">#txt#</div>
                <div>Rs. #price#</div>
            </div>
        </div>
        `, placeholders: {
            img: '',
            txt: '',
            price: ''
        }
    }
}