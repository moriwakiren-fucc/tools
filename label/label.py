import streamlit as st
st.title('メッセージを入力！')
input = st.text_area("")
text = ""
num = 0
i = 0
texts = [""]
while num <= 4:
    for j in range(len(input)):
        if num < 34:
            if input[j] == "\n":
                texts[i] += "  \n"
            else:
                texts[i] += input[j]
            num += 1
        else:
            num = 0
            texts.append("")
            i += 1
output = "  \n".join(texts)
st.write(output)
