document.getElementById("registerBtn")
.addEventListener("click",async()=>{

const username=
document.getElementById("username").value;

const password=
document.getElementById("password").value;


const res=
await fetch(
"register.php",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
username,
password
})

}
);

const data=
await res.text();

alert(data);

});