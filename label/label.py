えimport re
import streamlit as st
st.title('ラベルを作ろう')
input = st.text_area("メッセージを入力！※1行あたり全角34文字まで")
name = st.text_input("名前※全角3文字まで")
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
output = "  \n".join(texts) + "｜" + name
html = '<table style="width: 100%; font-family: sans-serif;"><tr><td colspan="2">'+texts[0]+'</td></tr><tr><td colspan="2">'+texts[1]+'</td></tr><tr><td colspan="2">'+texts[2]+'</td></tr><tr><td colspan="2">'+texts[3]+'</td></tr><tr><td>'+texts[4]+'</td><td style="width: 30%; border-left:2px #000000 solid;">'+name+'</td></tr></table>'
st.markdown(html, unsafe_allow_html=True)
if hamidashi:
    st.error("これ以上は入りません。文章を短くしてください。")
