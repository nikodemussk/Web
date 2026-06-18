document.getElementById("im").innerHTML = "Nikodemus Kohar";
changeText();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeText() {

    while (true) {
        // let i = 1;
        

        setTimeout(() => {
            document.getElementById("im").innerHTML = "Software Engineer";
            document.getElementById("hello").innerHTML = "Hello I'm a";
            // console.log("Computer Science Student");
        }
            , 1500);
        await sleep(1500);

        setTimeout(() => {
            document.getElementById("hello").innerHTML = "Hello I'm";
            document.getElementById("im").innerHTML = "Nikodemus Kohar";
            // console.log("Nikodemus Stanley");
        }
            , 3000);
        await sleep(1500);

        setTimeout(() => {
            document.getElementById("im").innerHTML = "Software Engineer";
            document.getElementById("hello").innerHTML = "Hello I'm a";
            console.log("Software Engineer");
        }
            , 4500);
        await sleep(1500);
    }
}
