// 今日の日付を取得
const today = new Date();

// 月と日を2桁に整形する関数
const pad = (num) => String(num).padStart(2, '0');

// "MM/DD" 形式に変換
const formatted = `${pad(today.getMonth() + 1)}/${pad(today.getDate())}`;

// inputにセット
document.getElementById('inputText').value = formatted;


function clickButton() {
  // 変数に入力欄の文字を入れる
  var breadName = $(".inputText").val();
  // シートからデータを取得する
  $.ajax({
    // GASをデプロイして作ったURL
    url: "https://script.google.com/macros/s/AKfycbybNYiWM2WpJtiFj3ihjBuyN11_nnM53_UNoQlYpzps0NTKF0kACXdyH6zeKxMHA4j_0Q/exec",
    type: "GET",
    dataType: "json",
    success: function (sheet) {
      // 変数にシートのデータを入れる
      var memo = sheet.allData;
      // データの数だけ検索をくりかえす
      for (var i = 0; i < memo.length; i++) {
        // iの値によって、検索するパンの名前を変える
        if (breadName == memo[i][0]) {
          // 指定したHTMLの中身を書き換える
          $ (".outputText1").text(memo[i][0]);
          $ (".outputText2").text(memo[i][1]);
          $ (".outputText3").text(memo[i][2]);
          $ ("a#link").attr("href",(memo[i][3]));
          $ ('.outputText4').text('検索ありがとうございます。他の日付でも検索してみて下さい。');
          document.getElementById('outputText6').innerHTML =" 「"+(memo[i][1])+"」をGoogleで検索！"+'<img src="img/new_tab2_2.png">'+"　";
          document.getElementById('outputText6').style.color = '#0000cc';
          document.getElementById('outputText6').style.fontWeight = '600';
          break;
        }
        
        if (breadName === '') {
          $ (".outputText1").text("日付が入力されていません。");
          $ (".outputText2").text("日付が入力されていないため、表示できません。");
          $ (".outputText3").text("日付が入力されていないため、表示できません。");
          document.getElementById('outputText6').innerHTML ="日付が入力されていないため、表示できません。";
          document.getElementById('outputText6').style.color = '#000000';
          document.getElementById('outputText6').style.fontWeight = '400';
          $ (".outputText4").text("上の検索ボックスに、検索方法にしたがって日付を入力し、再度、検索ボタンを押して検索して下さい。");
        }
          // 指定したHTMLの中身を書き換える
      else{
          $ (".outputText1").text("入力情報が正しくありません。入力情報をご確認の上、修正してください。");
          $ (".outputText2").text("入力情報が正しくないため、表示できません。");
          $ (".outputText3").text("入力情報が正しくないため、表示できません。");
          $ ("#outputText6").text("入力情報が正しくないため、表示できません。");
          document.getElementById('outputText6').style.color = '#000000';
          document.getElementById('outputText6').style.fontWeight = '400';
          $ (".outputText4").text("半角数字、「/」以外の文字を使用していませんか。日付にはない数字を入力していませんか。");
          }
    }
    }
  });
};
