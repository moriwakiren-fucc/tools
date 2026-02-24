import streamlit as st
st.title('メッセージを入力！')
input = st.text_area("e")
text = ""
num
i = 0
texts = []
for j in range(len(input)):
    if num > 34:
        texts[i] = text + input[j]
        num += 1
    else:
        i += 1
st.write(texts)
