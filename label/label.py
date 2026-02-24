import re
import streamlit as st
import json

st.header('入力')
name = st.text_input("名前　 ※全角25/7文字まで（半角は4/7文字扱い）")
input = st.text_area("メッセージ 　※1行あたり全角25文字まで（半角は4/7文字扱い）")
half_pattern = re.compile(r'[ -~ｦ-ﾟ]')
matches_name = len(name) - len(half_pattern.findall(name)) * 3 / 7
if matches_name > 25 / 7:
    st.warming('名前が長いです！フォントを小さくする？')
hamidashi = False
num = 0
i = 0
texts = ["","","","",""]
for j in range(len(input)):
    if i >= 5:
        hamidashi = True
        break
    elif i == 4:
        if num < 20:
            if input[j] == "\n":
                texts[i] += "  \n"
                i += 1
                num = 0
            else:
                texts[i] += input[j]
                half_pattern = re.compile(r'[ -~ｦ-ﾟ]')
                matches = 1 - len(half_pattern.findall(input[j])) * 3 / 7
                num += matches
        else:
            num = 0
            i += 1
    elif num < 25:
        if input[j] == "\n":
            texts[i] += "  \n"
            i += 1
            num = 0
        else:
            texts[i] += input[j]
            half_pattern = re.compile(r'[ -~ｦ-ﾟ]')
            matches = 1 - len(half_pattern.findall(input[j])) * 3 / 7
            num += matches
    else:
        num = 0
        i += 1
        texts[i] += input[j]
st.header("プレビュー")
if hamidashi:
    st.error("長いです！文章を短くしてください。")
else:
    st.success("作成完了！\n送信する場合は、一番下のテキストをコピー！")
html = '<table style="width: 27em; font-family: sans-serif;"><tr><td colspan="2">'+texts[0]+'</td></tr><tr><td colspan="2">'+texts[1]+'</td></tr><tr><td colspan="2">'+texts[2]+'</td></tr><tr><td colspan="2">'+texts[3]+'</td></tr><tr><td>'+texts[4]+'</td><td style="width: 5em; border-left:2px #000000 solid; text-align:right;">'+name+'</td></tr></table>'
st.markdown(html, unsafe_allow_html=True)
st.markdown('<img src="https://moriwakiren-fucc.github.io/tools/label/thanklabel.jpeg" style="width:100%;">', unsafe_allow_html=True)
st.divider()
st.header("1行ずつコピー")
for i in range(5):
    st.code(texts[i])
st.divider()
st.header("コピー（送信用）")

# コピーするテキスト
text = "\n".join(texts) + "\n｜" + name + "\nhttps://ujwp3bjnyphoklyj4gntpc.streamlit.app"

st.code(text, language="")

js_text = json.dumps(text)

html = f'<button onclick="navigator.clipboard.writeText(`{js_text}`)">クリップボードにコピー</button>'
st.markdown(html ,unsafe_allow_html=True)
