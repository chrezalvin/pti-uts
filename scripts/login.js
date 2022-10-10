// shorthand for doc ready
$(function(){

    const inputPlayer = $("#playerName");
    const addPlayerBtn = $("#addPlayerBtn")
    const playGameBtn = $("#playGameBtn")
    const noPlayerDisplay = $("#noplayer");

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

        let string = "1st";
        switch(players.length + 1){
            case 1: string = "1st"; break;
            case 2: string = "2nd"; break;
            case 3: string = "3rd"; break;
            case 4: string = "4th"; break;
            default: string = "Maxed"; break;
        }
        noPlayerDisplay.html(`${string} Player`);
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