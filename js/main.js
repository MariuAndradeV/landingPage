let ready = () => {
    console.log('DOM está listo')

}

let loaded = () => {
    console.log('mariu ');
    let myform = document.getElementById('form');
    myform.addEventListener('submit' , (eventSubmit) => {
        eventSubmit.preventDefault(); // no permite que se envie 
        
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
          emailElement.focus();

          emailElement.animate(
              [
                  { transform: "translateX(0)" },
                  { transform: "translateX(50px)" },
                  { transform: "translateX(-50px)" },
                  { transform: "translateX(0)" }
              ],
              {
                  duration: 400,
                  easing: "linear",
              }
          )

        };
    }
    
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)
