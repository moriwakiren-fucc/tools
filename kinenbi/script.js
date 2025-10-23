$('.xbutton button').on('click', function(){
	let selectMode = $(this).attr('data-mode');
	selectMode == 'light' ? $('html').attr('data-mode', 'light') : $('html').attr('data-mode', 'dark')
});

$('.xxbutton button').on('click', function(){
	let selectMode = $(this).attr('data-mode');
	selectMode == 'gray' ? $('html').attr('data-mode', 'gray') : $('html').attr('data-mode', 'small')
});

// セレクタ名（.pagetop）に一致する要素を取得
const pagetop_btn = document.querySelector(".pagetop");

// .pagetopをクリックしたら
pagetop_btn.addEventListener("click", scroll_top);

// ページ上部へスムーズに移動
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}

// スクロールされたら表示
window.addEventListener("scroll", scroll_event);
function scroll_event() {
  if (window.pageYOffset > 100) {
    pagetop_btn.style.opacity = "1";
  } else if (window.pageYOffset < 100) {
    pagetop_btn.style.opacity = "0";
  }
}
// 検索ボタンをクリックした時の関数
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
      // パンの数だけ検索をくりかえす
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
