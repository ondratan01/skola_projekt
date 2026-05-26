document
.getElementById("loginBtn")
.addEventListener(
"click",

async()=>{

const username=
document
.getElementById(
"username"
).value;

const password=
document
.getElementById(
"password"
).value;



try{

const res=
await fetch(
"login.php",
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

if(data=="OK")
{
location.href=
"vytvorit.html";
}

else
{
alert(data);
}

}

catch(error)
{
console.log(error);
}

}
)