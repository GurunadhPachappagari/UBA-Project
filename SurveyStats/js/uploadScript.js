const upload_form = document.getElementById("form2");

upload_form.addEventListener("submit", submitForm);


const asyncPostCall = async() => {
    try {
        const response = await fetch('https://uba.iitpkd.ac.in:8080/otp', {
            method: 'POST',
            body: {}
        });
        const m_data = await response.json();
        return m_data;
    } catch (error) {
        console.log(error);
    }
}

const button = document.getElementById('button');

button.addEventListener('click', async _ => {
    var otp_val = await asyncPostCall();
    console.log("Sent OTP");
});





function submitForm(e) {
    e.preventDefault();
    // const name = document.getElementById("name");
    const otp_entered = document.getElementById("otp");
    const files = document.getElementById("files");
    const formData = new FormData();
    // formData.append("name", name.value);
    formData.append("password", otp_entered.value);
    for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    fetch("https://uba.iitpkd.ac.in:8080/upload_files", {
            // fetch("http://localhost:5000/upload_files", {
            method: 'POST',
            body: formData
                // headers: {
                //   "Content-Type": "multipart/form-data"
                // }
        })
        .then((res) => {
            if (res.status == 200) {
                alert("successfully uploaded files");
                document.getElementById("form1").reset();
                document.getElementById("form2").reset();
            } else {
                alert("check otp / file configurations")
                document.getElementById("form1").reset();
                document.getElementById("form2").reset();
            }
        })
        .catch((err) => {
            alert("check the otp / file configurations")
            console.log("Error occured", err);
            document.getElementById("form1").reset();
            document.getElementById("form2").reset();
        });

}