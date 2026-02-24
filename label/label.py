import streamlit as st
st.title('メッセージを入力！')
input = st.text_area("")
text = ""
num = 0
i = 0
texts = [""]
for j in range(len(input)):
    if num < 34:
        texts[i] += input[j]
        num += 1
    else:
        num = 0
        i += 1
st.write(texts)
