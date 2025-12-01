document.getElementById("hlasovat").onclick = function()
{
    //event.preventDefault();
    let odpoved = document.querySelector('input[name="vote"]:checked');
  //  console.log(odpoved);
  if (odpoved)
 {
    let vybrana = odpoved.value;
    console.log(vybrana);
 }
}