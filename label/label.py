import streamlit as st
st.title('ラベルを作ろう')
input = st.text_area("メッセージを入力！")
name = st.text_input("名前")
text = ""
hamidashi = False
num = 0
i = 0
texts = [""]
for j in range(len(input)):
    if i >= 4:
        hamidashi = True
        break
    elif i == 3:
        if num < 20:
            if input[j] == "\n":
                texts[i] += "  \n"
                i += 1
                num = 0
                texts.append("")
            else:
                texts[i] += input[j]
            num += 1
        else:
            num = 0
            texts.append("")
            i += 1
    elif num < 25:
        if input[j] == "\n":
            texts[i] += "  \n"
            i += 1
            num = 0
            texts.append("")
        else:
            texts[i] += input[j]
        num += 1
    else:
        num = 0
        texts.append("")
        i += 1
output = "  \n".join(texts) + "\｜"　+ name
st.write(output)
if hamidashi:
    st.error("これ以上は入りません。文章を短くしてください。")
html = "<div><img src=\"https://moriwakiren-fucc.github.io/tools/label/thanklabel.jpeg\" style=\"width: 100vw;\">"
st.markdown(html, unsafe_allow_html=True)
