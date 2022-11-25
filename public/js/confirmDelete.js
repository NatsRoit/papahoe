function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


waitForElm('#adm-delete').then((elm) => {

    let deleteButton = document.querySelectorAll("#adm-delete form");

    deleteButton.forEach(element => {
        element.addEventListener("submit", (e) => {
            e.preventDefault();

            Swal.fire({
                title: 'Estas seguro que queres eliminar el producto?',
                text: "Esta accion no se puede deshacer!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
              }).then((result) => {
                
                if (result.isConfirmed) {
                  element.submit();
                }
              })           
                
        });
    });

    // console.log(deleteButton);

});

