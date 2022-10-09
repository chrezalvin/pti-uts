$(function(){
    let getVal = new URLSearchParams(window.location.search);
    if(getVal.get("name") === null){
        alert("nama player gagal di load, mengembalikan anda ke halaman login");
        window.location.href = "index.html";
        return;
    }
    const players = getVal.get("name").split(',');

    console.log(players)
})