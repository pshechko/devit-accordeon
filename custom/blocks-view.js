document.querySelectorAll('.wp-block-cgb-block-devit-test-accorderon:not(.rendered)').forEach(el=>{
    el.classList.add('rendered');
    let items = el.querySelectorAll('.accordeon-item');

    items.forEach(item => {
        let button = item.querySelector('.accordeon-item-toggler');
        button.addEventListener('click', (e) => {
            e.preventDefault();

            let isExpanded = item.classList.contains('expanded');
            
            if(isExpanded){
                item.classList.remove("expanded");
                slideUp(item.querySelector('.accordeon-item-content'), 500);
                return;
            }
            
            items.forEach(it => {

                if(!it.classList.contains('expanded'))
                    return;

                it.classList.remove("expanded");
                slideUp(it.querySelector('.accordeon-item-content'), 500)
            });

            item.classList.add("expanded");
            slideDown(item.querySelector('.accordeon-item-content'), 500)
        }, false);
    })
})