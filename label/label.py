import re
import streamlit as st
st.header('入力')
name = st.text_input("名前　 ※全角25/7文字まで（半角は4/7文字扱い）")
input = st.text_area("メッセージ 　※1行あたり全角25文字まで（半角は4/7文字扱い）")
half_pattern = re.compile(r'[ -~ｦ-ﾟ]')
matches_name = len(name) - len(half_pattern.findall(name)) * 3 / 7
if matches_name > 25 / 7:
    st.error('名前が長いです！')
text = ""
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
html = '<table style="width: 100%; font-family: sans-serif;"><tr><td colspan="2">'+texts[0]+'</td></tr><tr><td colspan="2">'+texts[1]+'</td></tr><tr><td colspan="2">'+texts[2]+'</td></tr><tr><td colspan="2">'+texts[3]+'</td></tr><tr><td>'+texts[4]+'</td><td style="width: 30%; border-left:2px #000000 solid;">'+name+'</td></tr></table>'
st.markdown(html, unsafe_allow_html=True)
st.markdown('<img src="https://moriwakiren-fucc.github.io/tools/label/thanklabel.jpeg" style="width:100%;">', unsafe_allow_html=True)
st.divider()
st.header("コピー")
st.code("\n".join(texts) + '\n\n' + name)
