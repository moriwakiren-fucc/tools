import streamlit as st
st.title('メッセージを入力！')
input = st.text_area("")
text = ""
hamidashi = False
num = 0
i = 0
texts = [""]
for j in range(len(input)):
    if i >= 4:
        hamidashi = True
        break
    elif num < 34:
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
output = "  \n".join(texts)
st.write(output)
st.write(i)
if hamidashi:
    st.error("これ以上は入りません。文章を短くしてください。")
html = "<img src=\"https://moriwakiren-fucc.github.io/tools/label/thanklabel.jpeg\" style=\"width: 100vw;\">"
st.markdown(html, unsafe_allow_html=True)
