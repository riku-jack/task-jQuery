let firstClick = true;
let compUnit = 0;
let setTimer;

window.onload = function(){

    let beforeArray = [];
    let afterArray = [];

    for(let i=0; i<13; i++){
      //52枚のカードを並べる
        let sub = ["1","2","3","4","5","6","7","8","9","10","j","q","k"];
        beforeArray.push("s"+sub[i]);
        beforeArray.push("h"+sub[i]);
        beforeArray.push("c"+sub[i]);
        beforeArray.push("d"+sub[i]);
    }
    for(let i=0; i<52; i++){
      //カードをランダムに配置する
        let r =Math.floor(Math.random()*beforeArray.length);
        afterArray.push(beforeArray[r]);
        beforeArray.splice(r,1);
    }

    //カードをdivに加える
    let field = document.getElementById("field");
    for(let i=0; i<52; i++){
        let div = document.createElement("div");
        div.className = "card back"
        div.cardFace = afterArray[i];

        //クリックするとturn関数にうつる
        div.onclick = turn;
        //divに52個加える
        field.appendChild(div);
    }

    function turn(e){
        //3枚以上ひっくり返さないように
        if (setTimer) return;

        let choiceCard = e.target;

        //カードをひっくり返したら画像が出る
        if(choiceCard.className=="card back"){
            choiceCard.className = "card"
            choiceCard.innerHTML = '<img src = "images/' + choiceCard.cardFace + '.gif" style="width: 60px; height: 90px;">'
            console.log(choiceCard.cardFace);
        }else{
            return;
        }

        //1枚目を選ぶ
        if(firstClick===true){
            
            //１枚目をチョイスカードと名づける
            firstCard = choiceCard;
            console.log(choiceCard.className);
              
            //これで２枚目を選ぶelseに飛ぶ
            firstClick = false;
        }else{
            //もし下１桁が同じ(カードがそろったら
            if(firstCard.cardFace.substr(-1) === choiceCard.cardFace.substr(-1)){
                //揃えた数を1増やす
                compUnit++;
                //１秒でcompの装飾にする
                setTimer = setTimeout(function(){
                    //１枚目２枚目のカードのクラスネームを変える
                    choiceCard.className = "card comp";
                    firstCard.className = "card comp";
                    if(compUnit===26){alert("おめでとうございます！")}
                    setTimer = null;
                  },1000);
                firstClick = true;
            }
            //カードがそろわかなかったら
            else{
                //card backに戻す
                setTimer = setTimeout(function(){
                    choiceCard.className = "card back";
                    firstCard.className = "card back";
                    choiceCard.innerHTML = "";
                    firstCard.innerHTML = "";
                    setTimer = null;
                },1000);
                firstClick = true;
            }
        }

    }

}
 
