// shorthand for doc ready
$(function(){

    const inputPlayer = $("#playerName");
    const addPlayerBtn = $("#addPlayerBtn")
    const playGameBtn = $("#playGameBtn")
    const noPlayerDisplay = $("noPlayer");

    const players = [];

    // updates everything, used on all event when it's done
    function bringUpdate(){
        const playerListRender = players.map((player, index) => `<tr><th>#${index + 1}</th><td>${player}</td></tr>`)
        $("#playerList").html(`${playerListRender.join('\n')}`);

        if(players.length > 3){
            inputPlayer.attr("disabled", true);
            inputPlayer.attr("placeholder", "maximum player reached!");
            addPlayerBtn.attr("disabled", true);
        }

        switch(players.length){
            case 0: noPlayerDisplay.html("1st player"); break;
            case 1: noPlayerDisplay.html("2nd Player"); break;
            case 2: noPlayerDisplay.html("3rd Player"); break;
            case 3: noPlayerDisplay.html("4th Player"); break;
            default: noPlayerDisplay.html("Maxed!"); break;
        }
    }

    inputPlayer.on("keydown", (e) => {
        if(e.key === "Enter")
            addPlayerBtn.trigger("click");
        bringUpdate();
    })

    addPlayerBtn.on("click", () => {
        if(inputPlayer.val() === "") return;
        if(players.find((name) => name === inputPlayer.val()))
        {
            alert("terdapat nama peserta yang sama, mohon diganti dengan nama lain");
            return;
        }
        
        players.push(inputPlayer.val());
        inputPlayer.val("");
        inputPlayer.trigger("focus");

        bringUpdate();
    })


    playGameBtn.on("click", () => {
        if(players.length === 0){
            alert("pemain tidak ada, harap tulis minimal satu nama pemain!");
            return;
        }

        window.location.href = `game.html?name=${players.join(',')}`;
    })
})